import "server-only";

import { getSubscription } from "@/lib/db/queries";
import { getStripeConfig } from "@/lib/stripe/config";
import {
  entitlementsForSubscription,
  type Entitlements,
  type Plan,
} from "@/lib/entitlements.logic";

export type { Entitlements, Plan };

export async function getEntitlements(userId: string): Promise<Entitlements> {
  const subscription = await getSubscription(userId);

  return entitlementsForSubscription(subscription, getStripeConfig().priceIds);
}
