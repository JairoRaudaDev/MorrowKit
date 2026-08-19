import "server-only";

import { validateEnv } from "@/env/validation";

import type { StripeConfig } from "./types";

function hostedStripeUrl(value: string, hostname: string): string {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.hostname !== hostname ||
    url.username ||
    url.password
  ) {
    throw new Error("Stripe returned an invalid hosted redirect URL");
  }
  return url.toString();
}

let config: StripeConfig | undefined;

export function getStripeConfig(): StripeConfig {
  if (config) return config;

  const env = validateEnv("Stripe", {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_PRICE_ID: process.env.STRIPE_PRO_PRICE_ID,
    STRIPE_BUSINESS_PRICE_ID: process.env.STRIPE_BUSINESS_PRICE_ID,
  });

  config = {
    secretKey: env.STRIPE_SECRET_KEY,
    webhookSecret: env.STRIPE_WEBHOOK_SECRET,
    priceIds: {
      pro: env.STRIPE_PRO_PRICE_ID,
      business: env.STRIPE_BUSINESS_PRICE_ID,
    },
    checkoutRedirect: (value) => hostedStripeUrl(value, "checkout.stripe.com"),
    portalRedirect: (value) => hostedStripeUrl(value, "billing.stripe.com"),
  };
  return config;
}
