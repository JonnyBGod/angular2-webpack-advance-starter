// angular
import { ViewEncapsulation, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// any operators needed throughout your application
import './operators';

// libs
import { ConfigService } from 'ng2-config';

// app
import { AnalyticsService } from 'frameworks/analytics/index';
import { MultilingualService } from 'frameworks/i18n/index';
import { Config } from 'frameworks/core/index';
import { LogService } from 'frameworks/core/services/index';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class AppComponent implements OnInit {
  constructor(public analytics: AnalyticsService,
              public log: LogService,
              public config: ConfigService,
              public multilang: MultilingualService) {
    log.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);
  }

  public ngOnInit(): void {
    this.multilang.init(this.config.getSettings().i18n);
  }
}
