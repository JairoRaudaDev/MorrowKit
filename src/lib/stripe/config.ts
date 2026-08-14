import "server-only";

import { serverEnv } from "@/env/server";

import type { StripeConfig } from "./types";

export const stripeConfig = {
  secretKey: serverEnv.STRIPE_SECRET_KEY,
  webhookSecret: serverEnv.STRIPE_WEBHOOK_SECRET,
} satisfies StripeConfig;
