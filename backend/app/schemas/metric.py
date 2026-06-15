from pydantic import BaseModel


class DashboardMetrics(BaseModel):
    total_stations: int
    online_stations: int
    offline_stations: int