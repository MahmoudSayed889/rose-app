import { Routes } from '@angular/router';
import { ContentComponent } from './shared/layout/content/content.component';
import { ContentRoutes } from './shared/routes/content.route';
import { FullComponent } from './shared/layout/full/full.component';
import { FullRoutes } from './shared/routes/full.route';
import { InputTestComponent } from './features/input-test/input-test.component';

export const routes: Routes = [
    {
        path: 'input-test',
        component: InputTestComponent,
    },

    // authentication
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.route').then((R) => R.AuthRoutes)
    },

    // main App
    {
        path: '',
        component: ContentComponent,
        children: ContentRoutes
    },

    {
        path: '',
        component: FullComponent,
        children: FullRoutes
    },
];
