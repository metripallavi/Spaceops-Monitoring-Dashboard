import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // backend is behind nginx proxy
  private baseUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  // Health
  getHealth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`);
  }

  // Stations
  getStations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stations`);
  }

  getStationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/stations/${id}`);
  }

  // Metrics
  getMetrics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/metrics`);
  }
}
