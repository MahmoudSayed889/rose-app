import { Routes } from '@angular/router';
import { ContentComponent } from './shared/layout/content/content.component';
import { ContentRoutes } from './shared/routes/content.route';
import { FullComponent } from './shared/layout/full/full.component';
import { FullRoutes } from './shared/routes/full.route';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    // authentication
    {
        path: '',
        loadChildren: () => import('./features/auth/auth.route').then((R) => R.AuthRoutes)
    },

    // main App
    {
        path: '',
        component: ContentComponent,
        children: ContentRoutes,
        canActivate: [authGuard]
    },

    {
        path: '',
        component: FullComponent,
        children: FullRoutes
    },
];
