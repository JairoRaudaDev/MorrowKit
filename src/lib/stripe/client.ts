import "server-only";

import Stripe from "stripe";

import { stripeConfig } from "./config";
import type { StripeClient } from "./types";

export const stripe: StripeClient = new Stripe(stripeConfig.secretKey, {
  appInfo: {
    name: "MorrowKit",
  },
});
