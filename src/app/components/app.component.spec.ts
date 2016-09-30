import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { t } from 'frameworks/test';
import { TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS } from 'frameworks/core/testing';
import { NameListService, NavbarComponent, ToolbarComponent } from 'frameworks/sample';
import { MultilingualModule } from 'frameworks/i18n/multilingual.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const config: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent}
];

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      MultilingualModule,
      StoreModule.provideStore({}),
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
