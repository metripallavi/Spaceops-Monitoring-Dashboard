import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../../services/api.service';
import { Station } from '../../../../models/station.model';

@Component({
  selector: 'app-station-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station-details-page.component.html',
  styleUrl: './station-details-page.component.scss'
})
export class StationDetailsPageComponent implements OnInit {

  station: Station | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadStation();
  }

  loadStation(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.error = 'Invalid station ID';
      this.loading = false;
      return;
    }

    const id = Number(idParam);

    this.apiService.getStationById(id).subscribe({
      next: (data) => {
        this.station = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load station details';
        this.loading = false;
      }
    });
  }
}
