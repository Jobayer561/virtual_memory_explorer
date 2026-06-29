from sqlalchemy.orm import Session
from database.models import SimulationResult, AddressTranslation
from database.models import PageTableEntry

def create_simulation(
    db: Session,
    algorithm: str,
    frames: int,
    reference_string: str,
    page_faults: int,
    hits: int,
    hit_ratio: float,
    final_frames: str
):
    simulation = SimulationResult(
        algorithm=algorithm,
        frames=frames,
        reference_string=reference_string,
        page_faults=page_faults,
        hits=hits,
        hit_ratio=hit_ratio,
        final_frames=final_frames
    )

    db.add(simulation)
    db.commit()
    db.refresh(simulation)

    return simulation


def get_simulations(db: Session):
    return db.query(SimulationResult).all()


def get_simulation_by_id(db: Session, simulation_id: int):
    return (
        db.query(SimulationResult)
        .filter(SimulationResult.id == simulation_id)
        .first()
    )  
    
    
       
def create_translation(
    db: Session,
    logical_address: int,
    page_size: int,
    page_number: int,
    offset: int,
    frame_number: int,
    physical_address: int
):
    translation = AddressTranslation(
        logical_address=logical_address,
        page_size=page_size,
        page_number=page_number,
        offset=offset,
        frame_number=frame_number,
        physical_address=physical_address
    )

    db.add(translation)
    db.commit()
    db.refresh(translation)

    return translation


def get_translations(db: Session):
    return db.query(AddressTranslation).all()




def get_page_table(db):
    return db.query(PageTableEntry).all()

def get_page_entry(db, page_number):
    return (
        db.query(PageTableEntry)
        .filter(PageTableEntry.page_number == page_number)
        .first()
    )

def create_page_entry(
    db,
    page_number,
    frame_number
):
    entry = PageTableEntry(
        page_number=page_number,
        frame_number=frame_number
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return entry