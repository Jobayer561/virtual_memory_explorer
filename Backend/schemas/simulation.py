from pydantic import BaseModel, Field
from typing import List

class SimulationRequest(BaseModel):
    algorithm: str = Field(example="fifo")
    frames: int = Field(example=3, gt=0)
    reference_string: List[int] = Field(example=[1, 2, 3, 1, 4, 5])


class SimulationResponse(BaseModel):
    page_faults: int
    hits: int
    hit_ratio: float