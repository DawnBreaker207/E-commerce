import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'errors', loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule) },
  { path: '**', redirectTo: 'errors/404' },
];
