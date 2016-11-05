// angular
import { Injectable, Inject } from '@angular/core';

// libs
import { extend } from 'lodash';
import { Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';

export interface IAnalyticsProperties {
  category?: string;
  label?: string;
  value?: number;
}

export interface IAnalytics {
  track(action: string, properties: IAnalyticsProperties): void;
}

/**
 * Wrapper for Angulartics2
 */
@Injectable()
export class AnalyticsService implements IAnalytics {

  constructor(private angulartics2: Angulartics2, private ga: Angulartics2GoogleAnalytics) {
    // options
    // https://github.com/angulartics/angulartics2/blob/master/src/core/angulartics2.ts#L90-L104
    // angulartics2.virtualPageviews(value: boolean);
    // angulartics2.excludeRoutes(routes: Array<string>);
    // angulartics2.firstPageview(value: boolean);
    // angulartics2.withBase(value: string);

    this.devMode(false);
  }

  /**
   * Track actions, events, etc.
   */
  public track(action: string, properties: IAnalyticsProperties): void {
    if (!this.devMode()) {
      this.ga.eventTrack(action, properties);
    }
  }

  /**
   * Called automatically by default with Angular 2 Routing
   * However, that can be turned off and this could be used manually
   */
  public pageTrack(path: string) {
    if (!this.devMode()) {
      this.ga.pageTrack(path);
    }
  }

  /**
   * Identify authenticated users
   */
  public identify(properties: any) {
    if (!this.devMode()) {
      this.ga.setUserProperties(properties);
    }
  }

  /**
   * Control whether analytics are tracked
   * true: dev mode on, therefore do not track anything
   * false: dev mode off, track everything
   */
  public devMode(enable?: boolean): boolean {
    if (typeof enable !== 'undefined') {
      this.angulartics2.developerMode(enable);
    }
    return this.angulartics2.settings.developerMode;
  }
}

/**
 * Base class
 * Standardizes tracking actions and categorization
 */
export class Analytics implements IAnalytics {
  // sub-classes should define their category
  public category: string;

  constructor(@Inject(AnalyticsService) public analytics: AnalyticsService) {

  }

  /**
   * Track actions, events, etc.
   */
  track(action: string, properties: IAnalyticsProperties): void {
    this.analytics.track(action, extend(properties, { category: this.category }));
  }
}
