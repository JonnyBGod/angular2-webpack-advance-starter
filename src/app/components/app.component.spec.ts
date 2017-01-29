// angular
import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

// app
import { t } from '../shared/test/index';
import { TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS } from '../shared/core/testing/index';
import { NameListService, NavbarComponent, ToolbarComponent } from '../shared/sample/index';
import { MultilingualModule } from '../shared/i18n/multilingual.module';
import { reducer } from '../shared/i18n/index';

// module
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const config: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent}
];

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
      MultilingualModule,
      StoreModule.provideStore({ i18n: reducer }),
      RouterTestingModule.withRoutes(config)
    ],
    declarations: [
      TestComponent, AppComponent,
      HomeComponent, AboutComponent,
      NavbarComponent, ToolbarComponent
    ],
    providers: [
      TEST_CORE_PROVIDERS(),
      TEST_HTTP_PROVIDERS(),
      NameListService
    ]
  });
};

t.describe('@Component: AppComponent', () => {

  t.be(testModuleConfig);

  t.it('should build without a problem',
    async(() => {
      TestBed.compileComponents()
        .then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();
          t.e(fixture.nativeElement).toBeTruthy();
        });
    }));
});

@Component({
  selector: 'test-cmp',
  template: '<app></app>'
})
class TestComponent {}
