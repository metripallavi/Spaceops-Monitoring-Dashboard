import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelemetryWebSocketService {

  private socket!: WebSocket;
  private stream$ = new Subject<any>();

  connect(): Observable<any> {

    this.socket = new WebSocket(
      'ws://localhost:8000/api/v1/ws/telemetry'
    );

    this.socket.onmessage = (event) => {
      this.stream$.next(JSON.parse(event.data));
    };

    this.socket.onerror = (err) => {
      console.error('WebSocket error', err);
    };

    this.socket.onclose = () => {
      setTimeout(() => this.connect(), 2000);
    };

    return this.stream$.asObservable();
  }

  close() {
    this.socket?.close();
  }
}
