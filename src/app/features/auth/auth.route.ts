import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth.component').then((c) => c.AuthComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./components/login/login.component')
                    .then((C) => C.LoginComponent),
            },
            {
                path: 'forgot-pass',
                loadComponent: () => import('./components/forgot-password/forgot-password.component')
                    .then((C) => C.ForgotPasswordComponent)
            },
            {
                path: 'reset-password',
                redirectTo: 'forgot-pass',
                pathMatch: 'full'
            }
        ]
    }
];
