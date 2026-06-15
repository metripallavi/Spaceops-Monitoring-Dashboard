from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class Station(BaseModel):
    id: int
    station_name: str
    cpu_usage: float
    memory_usage: float
    signal_strength: float
    active_connections: int
    status: str
    last_telemetry_timestamp: datetime

    model_config = ConfigDict(
        from_attributes=True
    )