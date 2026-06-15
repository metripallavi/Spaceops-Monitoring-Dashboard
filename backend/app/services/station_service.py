from sqlalchemy.orm import Session

from app.models.telemetry import Telemetry


def get_all_stations(db: Session):
    return (
        db.query(Telemetry)
        .order_by(Telemetry.id)
        .all()
    )


def get_station_by_id(
    db: Session,
    station_id: int,
):
    return (
        db.query(Telemetry)
        .filter(Telemetry.id == station_id)
        .first()
    )