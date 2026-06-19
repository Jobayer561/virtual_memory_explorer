from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.crud import get_simulations

router = APIRouter(tags=["Statistics"])


@router.get("/history")
def history(db: Session = Depends(get_db)):
    return get_simulations(db)