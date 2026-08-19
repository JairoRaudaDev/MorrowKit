import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

const isProduction = process.env.NODE_ENV === "production";
const hasSentryDsn = Boolean(
  process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
);
const canUploadSourceMaps = Boolean(
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT,
);

export default isProduction && hasSentryDsn
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: true,
      sourcemaps: {
        disable: !canUploadSourceMaps,
        deleteSourcemapsAfterUpload: true,
      },
    })
  : nextConfig;
