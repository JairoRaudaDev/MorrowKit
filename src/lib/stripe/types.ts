import "server-only";

import type Stripe from "stripe";
import type { PaidPlan } from "@/config/product";

export type StripeConfig = Readonly<{
  secretKey: string;
  webhookSecret: string;
  priceIds: Readonly<Record<PaidPlan, string>>;
  checkoutRedirect(value: string): string;
  portalRedirect(value: string): string;
}>;

export type StripeClient = Stripe;
export type StripeWebhookEvent = Stripe.Event;
