// angular
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ROUTES } from './app.routes';

export let routerModule = RouterModule.forRoot(ROUTES, {
  preloadingStrategy: PreloadAllModules
});
