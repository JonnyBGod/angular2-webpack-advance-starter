// angular
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { t } from 'shared/test';
import { NameListService, NameListEffects, reducer } from 'shared/sample';
import { CoreModule } from 'shared/core/core.module';
import { AnalyticsModule } from 'shared/analytics/analytics.module';
import { MultilingualModule } from 'shared/i18n/multilingual.module';
import { HomeComponent } from './home.component';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      CoreModule,
      RouterTestingModule,
      Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
      AnalyticsModule,
      MultilingualModule,
      StoreModule.provideStore({ sample: reducer }),
      EffectsModule.run(NameListEffects)
    ],
    declarations: [HomeComponent, TestComponent],
    providers: [
      NameListService,
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http, useFactory: (
          backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions
        ) => {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  });
};

t.describe('@Component: HomeComponent', () => {

  t.be(testModuleConfig);

  t.it('should work',
    async(() => {
      TestBed.compileComponents()
        .then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();

          let homeInstance = fixture.debugElement.children[0].componentInstance;
          let homeDOMEl = fixture.debugElement.children[0].nativeElement;

          t.e(homeDOMEl.querySelectorAll('li').length).toEqual(0);

          homeInstance.newName = 'Minko';
          homeInstance.addName();

          fixture.detectChanges();

          t.e(homeDOMEl.querySelectorAll('li').length).toEqual(1);
          t.e(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Minko');
        });
    }));
});

@Component({
  selector: 'test-cmp',
  template: '<sd-home></sd-home>'
})
class TestComponent {

}
