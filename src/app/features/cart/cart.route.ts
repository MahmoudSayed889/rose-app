import { Routes } from '@angular/router';

export const CartRoutes: Routes = [
    {
        path: '',
        redirectTo: 'cart',
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('./cart-layout/cart-layout.component').then((c) => c.CartLayoutComponent),
        children: [
            {
                path: 'cart',
                loadComponent: () =>
                    import('./pages/cart/cart.component').then((c) => c.CartComponent),
            },
            {
                path: 'checkout',
                loadComponent: () => import('./pages/checkout/checkout.component').then((c) => c.CheckoutComponent),
                children: [
                    {
                        path: '',
                        redirectTo: 'shipping-address',
                        pathMatch: 'full'
                    },
                    {
                        path: 'shipping-address',
                        loadComponent: () => import('./pages/checkout/shipping-address/shipping-address.component').then((c) => c.ShippingAddressComponent),
                    },
                    {
                        path: 'payment-method',
                        loadComponent: () => import('./pages/checkout/payment-method/payment-method.component').then((c) => c.PaymentMethodComponent),
                    }
                ],
            }
        ]
    }
];
