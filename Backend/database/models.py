from sqlalchemy import Column, Integer, String, Float
from database.database import Base

class SimulationResult(Base):
    __tablename__ = "simulation_results"

    id = Column(Integer, primary_key=True, index=True)
    algorithm = Column(String)
    frames = Column(Integer)
    reference_string = Column(String)

    page_faults = Column(Integer)
    hits = Column(Integer)
    hit_ratio = Column(Float)