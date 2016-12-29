// angular
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'about',
    loadChildren: './components/about/about.module#AboutModule'
  }
];
