import "server-only";

import type {
  AnalyticsEventName,
  AnalyticsEvents,
} from "@/lib/analytics/events";

export interface AnalyticsProvider {
  track<Name extends AnalyticsEventName>(
    name: Name,
    properties: AnalyticsEvents[Name],
  ): Promise<void>;
}

// Replace this adapter when an analytics vendor is configured.
export const analyticsProvider: AnalyticsProvider = {
  async track() {},
};
