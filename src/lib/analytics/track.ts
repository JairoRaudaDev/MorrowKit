import "server-only";

import type {
  AnalyticsEventName,
  AnalyticsEvents,
} from "@/lib/analytics/events";
import { analyticsProvider } from "@/lib/analytics/provider";

export async function track<Name extends AnalyticsEventName>(
  name: Name,
  properties?: AnalyticsEvents[Name],
): Promise<void> {
  await analyticsProvider.track(name, properties ?? {});
}
