import asyncio
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.telemetry.simulator import update_telemetry_data
from app.models.telemetry import Telemetry

router = APIRouter()


@router.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):
    await websocket.accept()

    db: Session = SessionLocal()

    try:
        while True:

            # update simulated telemetry
            update_telemetry_data(db)

            # fetch stations
            stations = db.query(Telemetry).all()

            payload = [
                {
                    "id": s.id,
                    "station_name": s.station_name,
                    "cpu_usage": s.cpu_usage,
                    "memory_usage": s.memory_usage,
                    "signal_strength": s.signal_strength,
                    "active_connections": s.active_connections,
                    "status": s.status,
                    "last_telemetry_timestamp": str(s.last_telemetry_timestamp),
                }
                for s in stations
            ]

            await websocket.send_text(json.dumps(payload))

            await asyncio.sleep(1)

    except WebSocketDisconnect:
        db.close()
