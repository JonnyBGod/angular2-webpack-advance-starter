// angular
import { RouterModule } from '@angular/router';

import { CoreModule } from 'frameworks/core/core.module';
import { AnalyticsModule } from 'frameworks/analytics/analytics.module';
import { MultilingualModule } from 'frameworks/i18n/multilingual.module';
import { SampleModule } from 'frameworks/sample/sample.module';

import { routes } from 'components/app.routes';

// config
import { Config, WindowService, ConsoleService } from 'frameworks/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
if (String(ENV) === 'dev') {
  // only output console logging in dev mode
  Config.DEBUG.LEVEL_4 = true;
}

// sample config (extra)
import { AppConfig } from 'frameworks/sample/services/app-config';
import { MultilingualService } from 'frameworks/i18n/services/multilingual.service';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;

let routerModule = RouterModule.forRoot(routes);

if (typeof TARGET_DESKTOP !== 'undefined' && TARGET_DESKTOP === true) {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  routerModule = RouterModule.forRoot(routes, {useHash: true});
}

export const ADVANCE_MODULES = [
  CoreModule.forRoot([
    { provide: WindowService, useValue: window },
    { provide: ConsoleService, useValue: console }
  ]),
  routerModule,
  AnalyticsModule,
  MultilingualModule,
  SampleModule
];
