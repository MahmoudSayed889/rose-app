import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '',
        loadComponent: () => import('./auth.component').then((c) => c.AuthComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./components/login/login.component').then((C) => C.LoginComponent),
            }
        ]
    }
];
