import "server-only";

import { serverEnv } from "@/env/server";

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

export const stripeConfig = {
  secretKey: serverEnv.STRIPE_SECRET_KEY,
  webhookSecret: serverEnv.STRIPE_WEBHOOK_SECRET,
  priceIds: {
    pro: serverEnv.STRIPE_PRO_PRICE_ID,
    business: serverEnv.STRIPE_BUSINESS_PRICE_ID,
  },
  checkoutRedirect: (value) => hostedStripeUrl(value, "checkout.stripe.com"),
  portalRedirect: (value) => hostedStripeUrl(value, "billing.stripe.com"),
} satisfies StripeConfig;
