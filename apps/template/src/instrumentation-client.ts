import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (process.env.NODE_ENV === "production" && dsn) {
  Sentry.init({
    dsn,
    enabled: true,
    sendDefaultPii: false,
    tracesSampleRate: 0,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
