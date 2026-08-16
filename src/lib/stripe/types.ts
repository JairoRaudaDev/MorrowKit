import "server-only";

import type Stripe from "stripe";

export type StripeConfig = Readonly<{
  secretKey: string;
  webhookSecret: string;
  priceIds: Readonly<Record<"pro" | "business", string>>;
  checkoutRedirect(value: string): string;
  portalRedirect(value: string): string;
}>;

export type StripeClient = Stripe;
export type StripeWebhookEvent = Stripe.Event;
