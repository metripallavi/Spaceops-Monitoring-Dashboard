import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Station } from '../../../../models/station.model';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  stations: Station[] = [];

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations(): void {
    this.apiService
      .getStations()
      .subscribe({
        next: (data) => {
          console.log('Stations received:', data);
          this.stations = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}