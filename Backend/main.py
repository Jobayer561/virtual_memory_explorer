from fastapi import FastAPI
from database.database import engine, Base
import database.models

from api.simulation import router as simulation_router
from api.statistics import router as statistics_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Virtual Memory Explorer")

app.include_router(simulation_router)
app.include_router(statistics_router)


@app.get("/")
def root():
    return {"message": "Virtual Memory Explorer API"}