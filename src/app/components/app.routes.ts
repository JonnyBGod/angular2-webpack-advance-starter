// angular
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'about',
    loadChildren: () => System.import('./about/about.module').then((comp: any) => comp.default)
  }
];
