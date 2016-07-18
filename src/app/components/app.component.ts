// angular
import { ChangeDetectionStrategy } from '@angular/core';

// app
import { NameListService } from 'frameworks/app';
import { AnalyticsService } from 'frameworks/analytics';
import { BaseComponent, PlatformDirective } from 'frameworks/core';
import { LangSwitcherComponent } from 'frameworks/i18n';
import { NavbarComponent } from './navbar.component';
import { ToolbarComponent } from './toolbar.component';

@BaseComponent({
  selector: 'app',
  viewProviders: [NameListService],
  templateUrl: 'app.template.html',
  styleUrls: ['app.style.scss'],
  directives: [
    LangSwitcherComponent,
    NavbarComponent,
    ToolbarComponent,
    PlatformDirective
  ],
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class AppComponent {
  constructor(public analytics: AnalyticsService) {
  }
}
