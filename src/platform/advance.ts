// Angular 2
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
// config
import { CoreConfigService } from 'frameworks/core';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
CoreConfigService.DEBUG.LEVEL_4 = true;

// app
import { WindowService, ConsoleService, CORE_PROVIDERS } from 'frameworks/core';
import { ANALYTICS_PROVIDERS } from 'frameworks/analytics';
import { MultilingualService } from 'frameworks/i18n';
import { APP_PROVIDERS, AppConfigService } from 'frameworks/app';

// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

let PROVIDERS: any[] = [
  { provide: APP_BASE_HREF, useValue: BASE_URL },
  { provide: WindowService, useValue: window },
  { provide: ConsoleService, useValue: console },
  CORE_PROVIDERS,
  ANALYTICS_PROVIDERS,
  APP_PROVIDERS
];

if (typeof TARGET_DESKTOP !== 'undefined' && TARGET_DESKTOP === true) {
  CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  PROVIDERS.push({ provide: LocationStrategy, useClass: HashLocationStrategy });
}

export const ADVANCE_PROVIDERS = [
  ...PROVIDERS
];
