import { Routes } from '@angular/router';

export const ContentRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('../../features/home/pages/home-page/home-page.component').then((C) => C.HomePageComponent),
    }
];
