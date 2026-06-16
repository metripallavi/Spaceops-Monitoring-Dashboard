import { Routes } from '@angular/router';

import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { StationListPageComponent } from './features/stations/pages/station-list-page/station-list-page.component';
import { StationDetailsPageComponent } from './features/stations/pages/station-details-page/station-details-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },

  {
    path: 'stations',
    component: StationListPageComponent,
  },

  {
    path: 'stations/:id',
    component: StationDetailsPageComponent,
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
