import { Routes } from '@angular/router';

export const ContentRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('../../features/home/pages/home-page/home-page.component').then((C) => C.HomePageComponent),
    },
    {
        path: 'product-card-test',
        loadComponent: () => import('../../features/home/pages/product-card-test-page/product-card-test-page.component').then((C) => C.ProductCardTestPageComponent),
    }
];
