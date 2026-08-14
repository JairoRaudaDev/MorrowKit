import "server-only";

import { stripeConfig } from "@/lib/stripe/config";
import { getCurrentSubscription } from "@/lib/stripe/subscription";

export type Plan = "free" | "pro" | "business";

export type Entitlements = Readonly<{
  plan: Plan;
  features: Readonly<{
    premium: boolean;
  }>;
}>;

const freeEntitlements: Entitlements = {
  plan: "free",
  features: {
    premium: false,
  },
};

const entitledSubscriptionStatuses = new Set(["active", "trialing"]);

export async function getEntitlements(userId: string): Promise<Entitlements> {
  const subscription = await getCurrentSubscription(userId);

  if (!subscription || !entitledSubscriptionStatuses.has(subscription.status)) {
    return freeEntitlements;
  }

  const plan: Plan =
    subscription.priceId === stripeConfig.priceIds.business
      ? "business"
      : subscription.priceId === stripeConfig.priceIds.pro
        ? "pro"
        : "free";

  return {
    plan,
    features: {
      premium: plan !== "free",
    },
  };
}
