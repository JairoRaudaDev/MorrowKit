export type AnalyticsEvents = {
  user_signed_up: {
    userId?: string;
  };
  checkout_started: {
    plan?: "pro" | "business";
    userId?: string;
  };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

export type AnalyticsEvent<
  Name extends AnalyticsEventName = AnalyticsEventName,
> = {
  [EventName in Name]: {
    name: EventName;
    properties: AnalyticsEvents[EventName];
  };
}[Name];
