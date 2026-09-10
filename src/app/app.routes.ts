import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./vehicles/vehicles.page').then(
        (m) => m.VehiclesPage,
      ),
  },
  {
    path: 'vehicle/:id',
    loadComponent: () => import('./vehicle-detail/vehicle-detail.page').then( m => m.VehicleDetailPage)
  },
  {
    path: 'alerts',
    loadComponent: () => import('./alerts/alerts.page').then( m => m.AlertsPage)
  },
  {
    path: 'routes',
    loadComponent: () => import('./routes/routes.page').then( m => m.RoutesPage)
  },
  {
    path: 'more',
    loadComponent: () => import('./more/more.page').then( m => m.MorePage)
  },
];
