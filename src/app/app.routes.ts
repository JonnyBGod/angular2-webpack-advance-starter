import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';

import { HomeComponent } from 'components/home';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // make sure you match the component type string to the require in asyncRoutes
<<<<<<< HEAD
  { path: 'about', component: 'AboutComponent' }
];


export const asyncRoutes = {
  'AboutComponent': require('es6-promise-loader!components/about')
=======
  { path: 'about', component: 'About' },
  // async components with children routes must use WebpackAsyncRoute
  { path: 'detail', component: 'Detail', canActivate: [ WebpackAsyncRoute ] },
  { path: '**',    component: NoContent },
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

export const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  'About': require('es6-promise-loader!./about'),
  'Detail': require('es6-promise-loader!./+detail'),
>>>>>>> upstream/master
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
<<<<<<< HEAD
export const prefetchRouteCallbacks: Array<Es6PromiseLoader | Function> = [
  asyncRoutes['AboutComponent'] // es6-promise-loader returns a function
=======
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['About'],
  asyncRoutes['Detail'],
   // es6-promise-loader returns a function
>>>>>>> upstream/master
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
