from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.simulation import (
    SimulationRequest,
    SimulationResponse
)

from schemas.translator import (
    TranslationRequest,
    TranslationResponse
)

from database.database import get_db

from database.crud import (
    create_simulation,
    create_translation,
    get_simulations,
    get_page_table,
    get_page_entry,
    create_page_entry
)

from algorithms.fifo import fifo
from algorithms.lru import lru
from algorithms.optimal import optimal
router = APIRouter(tags=["Simulation"])

latest_simulation = None

@router.post(
    "/simulate",
    response_model=SimulationResponse
)
def simulate(
    req: SimulationRequest,
    db: Session = Depends(get_db)
):
    global latest_simulation

    if req.algorithm.upper() == "FIFO":

        result = fifo(
            req.reference_string,
            req.frames
        )

    elif req.algorithm.upper() == "LRU":

        result = lru(
            req.reference_string,
            req.frames
        )

    elif req.algorithm.upper() == "OPTIMAL":

        result = optimal(
            req.reference_string,
            req.frames
        )

    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported algorithm"
        )

    create_simulation(
    db=db,
    algorithm=req.algorithm,
    frames=req.frames,
    reference_string=",".join(
        map(str, req.reference_string)
    ),
    page_faults=result["page_faults"],
    hits=result["hits"],
    hit_ratio=result["hit_ratio"],
    final_frames=",".join(
        map(str, result["final_frames"])
    )
)

    latest_simulation = {
        "algorithm": req.algorithm,
        "frames": req.frames,
        "reference_string": req.reference_string,
        "page_faults": result["page_faults"],
        "hits": result["hits"],
        "hit_ratio": result["hit_ratio"],
        "final_frames": result["final_frames"],
        "frame_history": result["frame_history"]
    }

    return result


@router.get("/latest-simulation")
def get_latest_simulation():

    if latest_simulation is None:
        raise HTTPException(
            status_code=404,
            detail="No simulation available."
        )

    return latest_simulation


@router.post(
    "/translate",
    response_model=TranslationResponse
)
def translate(
    req: TranslationRequest,
    db: Session = Depends(get_db)
):

    if req.page_size <= 0:
        raise HTTPException(
            status_code=400,
            detail="Page size must be greater than 0"
        )

    page_number = (
        req.logical_address // req.page_size
    )

    offset = (
        req.logical_address % req.page_size
    )

    entry = get_page_entry(
        db,
        page_number
    )

    if entry is None:
        raise HTTPException(
            status_code=404,
            detail="Page not found in page table"
        )

    frame_number = entry.frame_number

    physical_address = (
        frame_number * req.page_size
        + offset
    )

    create_translation(
        db=db,
        logical_address=req.logical_address,
        page_size=req.page_size,
        page_number=page_number,
        offset=offset,
        frame_number=frame_number,
        physical_address=physical_address
    )

    return {
        "page_number": page_number,
        "offset": offset,
        "frame_number": frame_number,
        "physical_address": physical_address
    }


@router.get("/history")
def history(
    db: Session = Depends(get_db)
):
    return get_simulations(db)


@router.get("/page-table")
def page_table(
    db: Session = Depends(get_db)
):
    entries = get_page_table(db)

    return [
        {
            "page_number": entry.page_number,
            "frame_number": entry.frame_number
        }
        for entry in entries
    ]


@router.post("/page-table")
def add_page_entry(
    page_number: int,
    frame_number: int,
    db: Session = Depends(get_db)
):
    existing = get_page_entry(db, page_number)

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Page already exists."
        )

    return create_page_entry(
        db,
        page_number,
        frame_number
    )