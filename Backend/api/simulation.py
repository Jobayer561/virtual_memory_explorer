from fastapi import APIRouter
from schemas.simulation import SimulationRequest
from schemas.simulation import SimulationResponse

router = APIRouter(tags=["Simulation"])
@router.post("/simulate", response_model=SimulationResponse)
def simulate(req: SimulationRequest):

    # TEMP FAKE LOGIC (we will replace later with FIFO/LRU)
    return {
        "page_faults": 5,
        "hits": 3,
        "hit_ratio": 37.5
    }