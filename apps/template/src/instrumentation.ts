import * as Sentry from "@sentry/nextjs";

const isEnabled =
  process.env.NODE_ENV === "production" &&
  Boolean(process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN);

export async function register() {
  if (!isEnabled) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError: typeof Sentry.captureRequestError = (
  ...arguments_
) => {
  if (isEnabled) Sentry.captureRequestError(...arguments_);
};
