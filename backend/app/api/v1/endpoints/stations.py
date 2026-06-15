from typing import List

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.station import Station

from app.services.station_service import (
    get_all_stations,
    get_station_by_id,
)

router = APIRouter(
    prefix="/stations",
    tags=["Stations"],
)


@router.get(
    "",
    response_model=List[Station],
)
def get_stations(
    db: Session = Depends(get_db),
):
    return get_all_stations(db)


@router.get(
    "/{station_id}",
    response_model=Station,
)
def get_station(
    station_id: int,
    db: Session = Depends(get_db),
):
    station = get_station_by_id(
        db,
        station_id,
    )

    if station is None:
        raise HTTPException(
            status_code=404,
            detail="Station not found",
        )

    return station