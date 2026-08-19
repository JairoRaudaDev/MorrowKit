import "server-only";

import Stripe from "stripe";

import { productConfig } from "@/config/product";

import { getStripeConfig } from "./config";
import type { StripeClient } from "./types";

let client: StripeClient | undefined;

export function getStripe(): StripeClient {
  if (client) return client;

  client = new Stripe(getStripeConfig().secretKey, {
    appInfo: { name: productConfig.name },
  });
  return client;
}
