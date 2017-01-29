// angular
import { Http } from '@angular/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfigLoader, ConfigService } from 'ng2-config';
import { TranslateLoader } from 'ng2-translate';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

// feature modules
import { CoreModule, configFactory } from 'shared/core/core.module';
import { AppReducer } from 'shared/ngrx/index';
import { AnalyticsModule } from 'shared/analytics/analytics.module';
import { MultilingualModule, translateLoaderFactory } from 'shared/i18n/multilingual.module';
import { MultilingualEffects } from 'shared/i18n/index';
import { SampleModule } from 'shared/sample/sample.module';
import { NameListEffects } from 'shared/sample/index';

// config
import { Config } from 'shared/core/index';
import { WindowService, ConsoleService } from 'shared/core/services/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

import { routerModule } from 'routerModule';

if (typeof TARGET_DESKTOP !== 'undefined' && TARGET_DESKTOP === true) {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
}

declare var window;
declare var console;

// For AoT compilation to work:
export function win() {
  return window;
}
export function cons() {
  return console;
}

export const ADVANCE_MODULES = [
  Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
  CoreModule.forRoot([
    { provide: WindowService, useFactory: (win) },
    { provide: ConsoleService, useFactory: (cons) },
    { provide: ConfigLoader, useFactory: (configFactory) }
  ]),
  routerModule,
  AnalyticsModule,
  MultilingualModule.forRoot([{
    provide: TranslateLoader,
    deps: [Http],
    useFactory: (translateLoaderFactory)
  }]),
  SampleModule,
  StoreModule.provideStore(AppReducer),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),
  EffectsModule.run(MultilingualEffects),
  EffectsModule.run(NameListEffects)
];
