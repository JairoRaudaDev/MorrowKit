import "server-only";

import type Stripe from "stripe";

export type StripeConfig = Readonly<{
  secretKey: string;
  webhookSecret: string;
}>;

export type StripeClient = Stripe;
export type StripeWebhookEvent = Stripe.Event;
