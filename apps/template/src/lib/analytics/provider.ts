import "server-only";

import { PostHog } from "posthog-node";

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

let postHog: PostHog | undefined;

function getPostHog() {
  const apiKey = process.env.POSTHOG_API_KEY?.trim();
  if (!apiKey) return null;

  postHog ??= new PostHog(apiKey, {
    host: process.env.POSTHOG_HOST?.trim() || "https://us.i.posthog.com",
    disableGeoip: true,
  });

  return postHog;
}

export const analyticsProvider: AnalyticsProvider = {
  async track(name, properties) {
    const client = getPostHog();
    if (!client) return;

    const { userId, ...eventProperties } = properties as {
      userId?: string;
      [key: string]: unknown;
    };
    if (!userId) return;

    try {
      await client.captureImmediate({
        distinctId: userId,
        event: name,
        properties: {
          ...eventProperties,
          $process_person_profile: false,
        },
        disableGeoip: true,
      });
    } catch (error) {
      // Analytics is best-effort and must never block a product lifecycle action.
      console.warn("PostHog event capture failed", { event: name, error });
    }
  },
};
