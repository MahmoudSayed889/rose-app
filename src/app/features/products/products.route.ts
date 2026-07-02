import { Routes } from '@angular/router';

export const ProductsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/products/products.component').then((C) => C.ProductsComponent),
    },

];
