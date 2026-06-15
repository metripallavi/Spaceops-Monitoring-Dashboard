import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Station } from '../models/station.model';
import { DashboardMetrics } from '../models/dashboard-metrics.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:8000/api/v1';

  constructor(
    private http: HttpClient,
  ) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(
      `${this.apiUrl}/stations`
    );
  }

  getStationById(
    id: number,
  ): Observable<Station> {
    return this.http.get<Station>(
      `${this.apiUrl}/stations/${id}`
    );
  }

  getMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(
      `${this.apiUrl}/metrics`
    );
  }
}