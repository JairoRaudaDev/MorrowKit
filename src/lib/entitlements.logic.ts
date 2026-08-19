import type { PaidPlan, Plan } from "@/config/product";

export type { Plan } from "@/config/product";

export type Entitlements = Readonly<{
  plan: Plan;
  features: Readonly<{
    premium: boolean;
  }>;
}>;

type Subscription = Readonly<{
  priceId: string;
  status: string;
}>;

type PriceIds = Readonly<Record<PaidPlan, string>>;

const entitledSubscriptionStatuses = new Set(["active", "trialing"]);

export function entitlementsForSubscription(
  subscription: Subscription | null,
  priceIds: PriceIds,
): Entitlements {
  if (!subscription || !entitledSubscriptionStatuses.has(subscription.status)) {
    return { plan: "free", features: { premium: false } };
  }

  const plan: Plan =
    subscription.priceId === priceIds.business
      ? "business"
      : subscription.priceId === priceIds.pro
        ? "pro"
        : "free";

  return { plan, features: { premium: plan !== "free" } };
}
