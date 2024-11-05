import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'bienvenida',
        loadComponent: () =>
        import('./components/bienvenida/bienvenida.component').then(
            (m) => m.BienvenidaComponent
        ),
    },
    {
        path: 'home',
        loadComponent: () =>
        import('./components/home/home.component').then(
            (m) => m.HomeComponent
        ),
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
        import(
            './components/auth/forgot-password/forgot-password.component'
        ).then((m) => m.ForgotPasswordComponent),
    },
    {
        path: '',
        redirectTo: '/bienvenida',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/bienvenida',
        pathMatch: 'full',
    },
];
