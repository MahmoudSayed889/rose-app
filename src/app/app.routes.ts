import { Routes } from '@angular/router';
import { ContentComponent } from './shared/layout/content/content.component';
import { ContentRoutes } from './shared/routes/content.route';
import { FullComponent } from './shared/layout/full/full.component';
import { FullRoutes } from './shared/routes/full.route';

export const routes: Routes = [

    // main App
    {
        path: '',
        component: ContentComponent,
        loadChildren: () => import('./shared/routes/content.route').then((R) => R.ContentRoutes)
    },

    {
        path: '',
        component: FullComponent,
        loadChildren: () => import('./shared/routes/full.route').then((R) => R.FullRoutes)
    },

    // authentication
    {
        path: '',
        loadChildren: () => import('./features/auth/auth.route').then((R) => R.AuthRoutes)
    },
];
