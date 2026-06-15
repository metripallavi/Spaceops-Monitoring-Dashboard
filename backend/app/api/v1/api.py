from fastapi import APIRouter

from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.metrics import router as metrics_router
from app.api.v1.endpoints.stations import router as stations_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(stations_router)
api_router.include_router(metrics_router)