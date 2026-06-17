import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ApiService } from '../../../../services/api.service';
import { TelemetryWebSocketService } from '../../../../services/telemetry.websocket.service';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  stations: any[] = [];

  metrics = {
    total_stations: 0,
    online_stations: 0,
    offline_stations: 0,
  };

  lastUpdated: string = '';

  private charts: Record<string, any> = {};
  private sub: any;

  constructor(
    private apiService: ApiService,
    private ws: TelemetryWebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🚀 Dashboard Init started');

    this.apiService.getStations().subscribe({
      next: (data: any[]) => {
        console.log('📡 API stations received:', data);
        this.update(data);
      },
      error: (err) => {
        console.error('❌ API error:', err);
      }
    });

    this.sub = this.ws.connect().subscribe({
      next: (data: any[]) => {
        console.log('📡 WS data:', data);
        this.update(data);
      }
    });
  }

  update(data: any[]): void {
    this.stations = data;

    this.lastUpdated = new Date().toLocaleTimeString();

    this.metrics.total_stations = data.length;
    this.metrics.online_stations = data.filter(s => s.status === 'ONLINE').length;
    this.metrics.offline_stations = data.filter(s => s.status === 'OFFLINE').length;

    this.renderCharts(data);
  }

  goToStation(id: number): void {
    this.router.navigate(['/stations', id]);
  }

  renderCharts(data: any[]): void {
    const labels = data.map(s => s.station_name);

    this.draw('cpuChart', labels, data.map(s => s.cpu_usage), 'CPU %');
    this.draw('memoryChart', labels, data.map(s => s.memory_usage), 'Memory %');
    this.draw('signalChart', labels, data.map(s => s.signal_strength), 'Signal %');
  }

  draw(id: string, labels: string[], values: number[], label: string): void {

    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) return;

    if (this.charts[id]) {
      this.charts[id].destroy();
    }

    let color = '#00e676';

    if (label.includes('CPU')) color = '#ff4d4d';
    if (label.includes('Memory')) color = '#4da6ff';
    if (label.includes('Signal')) color = '#00e676';

    this.charts[id] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data: values,
          backgroundColor: color,
          borderRadius: 0,
          borderSkipped: false,
          barThickness: 40,
          maxBarThickness: 80
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500
        },
        plugins: {
          legend: {
            labels: {
              color: '#e6edf3'
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#9aa4b2' },
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#9aa4b2' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.ws?.close();
    this.sub?.unsubscribe();
  }
}
