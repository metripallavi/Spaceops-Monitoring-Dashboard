from datetime import datetime

from sqlalchemy.orm import Session

from app.models.telemetry import Telemetry


def seed_telemetry_data(db: Session):
    existing_records = db.query(Telemetry).count()

    if existing_records > 0:
        return

    stations = [
        Telemetry(
            station_name="Bangalore Ground Station",
            cpu_usage=42.5,
            memory_usage=68.3,
            signal_strength=91.2,
            active_connections=18,
            status="ONLINE",
            last_telemetry_timestamp=datetime.utcnow(),
        ),
        Telemetry(
            station_name="Hyderabad Ground Station",
            cpu_usage=35.1,
            memory_usage=55.8,
            signal_strength=88.7,
            active_connections=12,
            status="ONLINE",
            last_telemetry_timestamp=datetime.utcnow(),
        ),
        Telemetry(
            station_name="Chennai Ground Station",
            cpu_usage=72.2,
            memory_usage=81.9,
            signal_strength=74.5,
            active_connections=7,
            status="OFFLINE",
            last_telemetry_timestamp=datetime.utcnow(),
        ),
    ]

    db.add_all(stations)
    db.commit()