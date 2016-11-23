// libs
import { Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';

// app
import { AnalyticsService } from './services/analytics.service';

export const ANALYTICS_PROVIDERS: any[] = [
  Angulartics2,
  Angulartics2GoogleAnalytics,
  AnalyticsService
];

// services
export * from './services/analytics.service';
