// angular
import { provide, enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';

// config
import { CoreConfigService } from 'frameworks/core.framework';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
CoreConfigService.DEBUG.LEVEL_4 = true;

// app
import { WindowService, ConsoleService, CORE_PROVIDERS } from 'frameworks/core.framework';
import { ANALYTICS_PROVIDERS } from 'frameworks/analytics.framework';
import { MultilingualService } from 'frameworks/i18n.framework';
import { APP_PROVIDERS, AppConfigService } from 'frameworks/app.framework';
import { AppComponent } from 'components';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

const ENV_PROVIDERS: Array<any> = [];
if (ENV === 'production'
  || (typeof TARGET_DESKTOP_BUILD !== 'undefined' && TARGET_DESKTOP_BUILD === true)) {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

let BOOTSTRAP_PROVIDERS: any[] = [
  ENV_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: BASE_URL }),
  provide(WindowService, { useValue: window }),
  provide(ConsoleService, { useValue: console }),
  CORE_PROVIDERS,
  ANALYTICS_PROVIDERS,
  APP_PROVIDERS
];

if (typeof TARGET_DESKTOP !== 'undefined' && TARGET_DESKTOP === true) {
  CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  BOOTSTRAP_PROVIDERS.push(provide(LocationStrategy, { useClass: HashLocationStrategy }));
}

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {
  return bootstrap(AppComponent, BOOTSTRAP_PROVIDERS)
    .catch((err: any) => console.error(err));
}

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }

/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
