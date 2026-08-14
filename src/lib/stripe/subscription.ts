import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

export type SubscriptionSnapshot = Readonly<{
  priceId: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}>;

export async function getCurrentSubscription(
  userId: string,
): Promise<SubscriptionSnapshot | null> {
  const admin = createAdminClient();
  const { data: customer, error: customerError } = await admin
    .from("billing_customers")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (customerError) {
    throw new Error("Unable to read the billing customer", {
      cause: customerError,
    });
  }

  if (!customer) {
    return null;
  }

  const { data: subscription, error: subscriptionError } = await admin
    .from("subscriptions")
    .select("price_id,status,current_period_end,cancel_at_period_end")
    .eq("customer_id", customer.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subscriptionError) {
    throw new Error("Unable to read the subscription", {
      cause: subscriptionError,
    });
  }

  if (!subscription) {
    return null;
  }

  return {
    priceId: subscription.price_id,
    status: subscription.status,
    currentPeriodEnd: subscription.current_period_end,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  };
}
