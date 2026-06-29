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

    final_frames = Column(String)


class AddressTranslation(Base):
    __tablename__ = "address_translations"

    id = Column(Integer, primary_key=True, index=True)

    logical_address = Column(Integer)
    page_size = Column(Integer)

    page_number = Column(Integer)
    offset = Column(Integer)

    frame_number = Column(Integer)
    physical_address = Column(Integer)


class PageTableEntry(Base):
    __tablename__ = "page_table"

    id = Column(Integer, primary_key=True, index=True)

    page_number = Column(Integer, unique=True, nullable=False)
    frame_number = Column(Integer, nullable=False)