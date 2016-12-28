// angular
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  }
];
