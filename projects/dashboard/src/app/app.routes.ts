import { Route } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview.component').then((m) => m.OverviewComponent),
    canActivate: [adminGuard]
  },
];
