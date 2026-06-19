from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas.simulation import SimulationRequest, SimulationResponse
from database.database import get_db
from database.crud import create_simulation

router = APIRouter(tags=["Simulation"])


@router.post("/simulate", response_model=SimulationResponse)
def simulate(
    req: SimulationRequest,
    db: Session = Depends(get_db)
):

    # Dummy result for now
    page_faults = 5
    hits = 3
    hit_ratio = 37.5

    # Save to database
    create_simulation(
        db=db,
        algorithm=req.algorithm,
        frames=req.frames,
        reference_string=",".join(map(str, req.reference_string)),
        page_faults=page_faults,
        hits=hits,
        hit_ratio=hit_ratio
    )

    return {
        "page_faults": page_faults,
        "hits": hits,
        "hit_ratio": hit_ratio
    }