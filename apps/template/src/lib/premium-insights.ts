import "server-only";

import { requireAuth } from "@/lib/auth/session";
import { getEntitlements, type Plan } from "@/lib/entitlements";

type PremiumInsight = Readonly<{
  label: string;
  value: string;
  detail: string;
}>;

export type PremiumInsightsResult =
  | Readonly<{
      available: false;
      plan: Plan;
    }>
  | Readonly<{
      available: true;
      plan: Exclude<Plan, "free">;
      insights: readonly PremiumInsight[];
    }>;

const demoInsights: readonly PremiumInsight[] = [
  {
    label: "Growth forecast",
    value: "+18.4%",
    detail: "Projected growth over the next 30 days",
  },
  {
    label: "Expansion opportunity",
    value: "$4,280",
    detail: "Estimated revenue available from existing accounts",
  },
  {
    label: "Accounts to watch",
    value: "12",
    detail: "Customers with a recent drop in engagement",
  },
];

/**
 * Premium data is only returned after auth and entitlement checks run on the
 * server. Callers never supply a plan, so a client cannot unlock the feature.
 */
export async function getPremiumInsights(): Promise<PremiumInsightsResult> {
  const claims = await requireAuth();
  const userId = claims.sub;

  if (typeof userId !== "string" || userId.length === 0) {
    throw new Error("Authenticated user is missing an identifier");
  }

  const entitlements = await getEntitlements(userId);

  if (!entitlements.features.premium || entitlements.plan === "free") {
    return { available: false, plan: entitlements.plan };
  }

  return {
    available: true,
    plan: entitlements.plan,
    insights: demoInsights,
  };
}
