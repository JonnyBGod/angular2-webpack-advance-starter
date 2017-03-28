// angular
import { ViewEncapsulation, Component, OnInit } from '@angular/core';
// any operators needed throughout your application
import './operators';

// libs
import { ConfigService } from '@nglibs/config';

// app
import { AnalyticsService } from 'shared/analytics/index';
import { MultilingualService } from 'shared/i18n/index';
import { Config } from 'shared/core/index';
import { LogService, AppService } from 'shared/core/services/index';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(public analytics: AnalyticsService,
              public log: LogService,
              public config: ConfigService,
              public multilang: MultilingualService,
              private appService: AppService) {
    log.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);
  }

  public ngOnInit(): void {
    this.multilang.init(this.config.getSettings().i18n);
  }
}
