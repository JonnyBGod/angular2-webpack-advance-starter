// nativescript
import {
  NativeScriptModule,
  NativeScriptFormsModule,
  NativeScriptHttpModule,
  NativeScriptRouterModule,
  RouterExtensions as TNSRouterExtensions
} from 'nativescript-angular';
// import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router';
import { Http } from '@angular/http';

// angular
import { NgModule } from '@angular/core';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ConfigLoader, ConfigService } from 'ng2-config';

// app
import { WindowService, ConsoleService, RouterExtensions } from 'frameworks/core/index';
import { NSAppComponent } from './pages/app/app.component';
import { AboutComponent } from 'components/about/about.component';
import { HomeComponent } from 'components/home/home.component';
import { routes } from 'components/app.routes';

// feature modules
import { CoreModule, configFactory } from 'frameworks/core/core.module';
import { AppReducer } from 'frameworks/ngrx/index';
import { AnalyticsModule } from 'frameworks/analytics/analytics.module';
import { MultilingualModule, translateFactory } from 'frameworks/i18n/multilingual.module';
import { MultilingualEffects } from 'frameworks/i18n/index';
import { SampleModule } from 'frameworks/sample/sample.module';
import { NameListEffects } from 'frameworks/sample/index';

// {N} custom app specific
import { WindowNative } from './shared/core/index';
import { NS_ANALYTICS_PROVIDERS } from './shared/nativescript/index';

// intermediate component module
// helps encapsulate custom native modules in with the components
// note: couple ways this could be done, just one option presented here...
@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    MultilingualModule.forRoot([{
      provide: TranslateLoader,
      deps: [Http],
      useFactory: (translateFactory)
    }]),
    SampleModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent
  ],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    MultilingualModule,
    SampleModule
  ]
})
class ComponentsModule { }

// For AoT compilation to work:
export function cons() {
  return console;
}

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useFactory: (cons) },
      { provide: ConfigLoader, useFactory: (configFactory) }
    ]),
    AnalyticsModule,
    ComponentsModule,
    NativeScriptRouterModule.forRoot(<any>routes),
    StoreModule.provideStore(AppReducer),
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(NameListEffects)
  ],
  declarations: [
    NSAppComponent
  ],
  providers: [
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions }
  ],
  bootstrap: [NSAppComponent]
})

export class NativeModule { }
