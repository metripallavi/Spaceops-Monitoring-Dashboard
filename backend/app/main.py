from fastapi import FastAPI
from app.models.telemetry import Telemetry
from app.api.v1.api import api_router
from app.core.config import settings
from app.telemetry.simulator import update_telemetry_data
from app.db.base import Base
from app.db.database import engine

from app.db.database import SessionLocal
from app.telemetry.seed_data import seed_telemetry_data

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
)


@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        seed_telemetry_data(db)
        update_telemetry_data(db)
    finally:
        db.close()


app.include_router(
    api_router,
    prefix=settings.API_V1_PREFIX,
)


@app.get("/")
def root():
    return {
        "message": "SPACEOPS Monitoring Dashboard API",
    }