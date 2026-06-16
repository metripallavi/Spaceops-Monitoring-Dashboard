import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface StationTelemetry {
  id: number;
  station_name: string;
  cpu_usage: number;
  memory_usage: number;
  signal_strength: number;
  active_connections: number;
  status: string;
  last_telemetry_timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class TelemetryWebSocketService {
  private socket!: WebSocket;

  private telemetrySubject = new Subject<StationTelemetry[]>();

  public telemetry$: Observable<StationTelemetry[]> =
    this.telemetrySubject.asObservable();

  connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    this.socket = new WebSocket(
      'ws://localhost:8000/api/v1/ws/telemetry'
    );

    this.socket.onopen = () => {
      console.log('🚀 SpaceOps WebSocket connected');
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const data: StationTelemetry[] = JSON.parse(event.data);
        this.telemetrySubject.next(data);
      } catch (err) {
        console.error('❌ Parse error:', err);
      }
    };

    this.socket.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };

    this.socket.onclose = () => {
      console.warn('⚠️ WebSocket closed — reconnecting...');
      setTimeout(() => this.connect(), 3000);
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
