from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.metric import DashboardMetrics
from app.services.station_service import get_all_stations

router = APIRouter(prefix="/metrics", tags=["Metrics"])


@router.get("", response_model=DashboardMetrics)
def get_metrics(
    db: Session = Depends(get_db),
):
    stations = get_all_stations(db)

    online = len(
        [
            s
            for s in stations
            if s.status == "ONLINE"
        ]
    )

    offline = len(
        [
            s
            for s in stations
            if s.status == "OFFLINE"
        ]
    )

    return DashboardMetrics(
        total_stations=len(stations),
        online_stations=online,
        offline_stations=offline,
    )