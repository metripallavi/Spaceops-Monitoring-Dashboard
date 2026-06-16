import random
from datetime import datetime

from sqlalchemy.orm import Session

from app.models.telemetry import Telemetry


def update_telemetry_data(db: Session):
    stations = db.query(Telemetry).all()

    for station in stations:

        # Simulate realistic telemetry fluctuations
        station.cpu_usage = round(random.uniform(15, 95), 2)

        station.memory_usage = round(random.uniform(20, 90), 2)

        station.signal_strength = round(random.uniform(60, 100), 2)

        station.active_connections = random.randint(5, 50)

        # -------------------------------
        # REALISTIC STATUS LOGIC (FIXED)
        # -------------------------------
        if station.signal_strength < 30:
            station.status = "OFFLINE"
        elif station.cpu_usage > 90 and station.memory_usage > 90:
            station.status = "OFFLINE"
        else:
            station.status = "ONLINE"

        station.last_telemetry_timestamp = datetime.utcnow()

    db.commit()
