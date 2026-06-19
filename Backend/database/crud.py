from sqlalchemy.orm import Session
from database.models import SimulationResult


def create_simulation(
    db: Session,
    algorithm: str,
    frames: int,
    reference_string: str,
    page_faults: int,
    hits: int,
    hit_ratio: float
):
    simulation = SimulationResult(
        algorithm=algorithm,
        frames=frames,
        reference_string=reference_string,
        page_faults=page_faults,
        hits=hits,
        hit_ratio=hit_ratio
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