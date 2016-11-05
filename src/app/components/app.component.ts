// angular
import { ChangeDetectionStrategy } from '@angular/core';
// any operators needed throughout your application
import './operators';

// app
import { AnalyticsService } from 'frameworks/analytics';
import { BaseComponent, Config, LogService } from 'frameworks/core';

/**
 * This class represents the main application component.
 */
@BaseComponent({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class AppComponent {
  constructor(public analytics: AnalyticsService, public logger: LogService) {
    this.analytics.devMode(`${Config.ENVIRONMENT().ENV}` === 'development' ? true : false);

    logger.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);
  }
}
