from fastapi import FastAPI
from database.database import engine, Base
import database.models
from fastapi.middleware.cors import CORSMiddleware

from api.simulation import router as simulation_router
from api.statistics import router as statistics_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Virtual Memory Explorer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://virtual-memory-explorer.netlify.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(simulation_router)
app.include_router(statistics_router)


@app.get("/")
def root():
    return {"message": "Virtual Memory Explorer API"}