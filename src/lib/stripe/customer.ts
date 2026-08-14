import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

import { stripe } from "./client";

type CustomerIdentity = Readonly<{
  userId: string;
  email?: string;
}>;

/**
 * Returns the Stripe customer mapped to a user, creating it at most once.
 *
 * The database uniqueness constraint protects the local mapping while Stripe's
 * idempotency key makes concurrent/retried customer creation return the same
 * remote customer.
 */
export async function getOrCreateStripeCustomer({
  userId,
  email,
}: CustomerIdentity): Promise<string> {
  const admin = createAdminClient();
  const { data: existing, error: readError } = await admin
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (readError) {
    throw new Error("Unable to read the billing customer", {
      cause: readError,
    });
  }

  if (existing) {
    return existing.stripe_customer_id;
  }

  const customer = await stripe.customers.create(
    {
      ...(email ? { email } : {}),
      metadata: { user_id: userId },
    },
    { idempotencyKey: `customer:${userId}` },
  );

  const { data: saved, error: writeError } = await admin
    .from("billing_customers")
    .upsert(
      { user_id: userId, stripe_customer_id: customer.id },
      { onConflict: "user_id" },
    )
    .select("stripe_customer_id")
    .single();

  if (writeError) {
    throw new Error("Unable to save the billing customer", {
      cause: writeError,
    });
  }

  return saved.stripe_customer_id;
}
