import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const ContentRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('../../features/home/pages/home-page/home-page.component').then((C) => C.HomePageComponent),
    },
    {
        path: 'products',
        loadChildren: () => import('../../features/products/products.route').then((R) => R.ProductsRoutes),
    },
    {
        path: 'product-card-test',
        loadComponent: () => import('../../features/home/pages/product-card-test-page/product-card-test-page.component').then((C) => C.ProductCardTestPageComponent),
    },
    {
        path: 'product-details/:id',
        loadComponent: () => import('../../features/product-details/product-details.component').then((C) => C.ProductDetailsComponent),
    },
    {
        path: 'wishlist',
        loadComponent: () => import('../../features/wishlist/pages/wishlist/wishlist.component').then((C) => C.WishlistComponent),
    },
    {
        path: 'purchase',
        loadChildren: () => import('../../features/cart/cart.route').then((C) => C.CartRoutes),
        canActivate: [authGuard]
    },
];
