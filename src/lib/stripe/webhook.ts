import "server-only";

import type Stripe from "stripe";

import { track } from "@/lib/analytics/track";
import { createAdminClient } from "@/lib/supabase/admin";

import { getStripe } from "./client";
import { getStripeConfig } from "./config";
import { planForPrice, stripeId, stripeTimestamp } from "./mapping";

const userIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

async function ensureCustomerMapping(subscription: Stripe.Subscription) {
  const stripeCustomerId = stripeId(subscription.customer);
  if (!stripeCustomerId) {
    throw new Error(`Subscription ${subscription.id} has no Stripe customer`);
  }

  const admin = createAdminClient();
  const { data: existing, error: readError } = await admin
    .from("billing_customers")
    .select("user_id")
    .eq("stripe_customer_id", stripeCustomerId)
    .maybeSingle();

  if (readError) {
    throw new Error("Unable to read the billing customer", {
      cause: readError,
    });
  }
  if (existing) {
    return { stripeCustomerId, userId: existing.user_id };
  }

  let userId = subscription.metadata.user_id;
  if (!userId) {
    const customer = await getStripe().customers.retrieve(stripeCustomerId);
    if (!customer.deleted) userId = customer.metadata.user_id;
  }
  if (!userId) {
    throw new Error(`Stripe customer ${stripeCustomerId} has no user mapping`);
  }
  if (!userIdPattern.test(userId)) {
    throw new Error(
      `Stripe customer ${stripeCustomerId} has an invalid user mapping`,
    );
  }

  const { data: userMapping, error: userReadError } = await admin
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (userReadError) {
    throw new Error("Unable to verify the billing customer owner", {
      cause: userReadError,
    });
  }
  if (userMapping && userMapping.stripe_customer_id !== stripeCustomerId) {
    throw new Error(
      `User ${userId} is already mapped to another Stripe customer`,
    );
  }

  const { error: writeError } = await admin
    .from("billing_customers")
    .upsert(
      { user_id: userId, stripe_customer_id: stripeCustomerId },
      { onConflict: "user_id" },
    );
  if (writeError) {
    throw new Error("Unable to save the billing customer", {
      cause: writeError,
    });
  }

  return { stripeCustomerId, userId };
}

async function subscriptionFromEvent(event: Stripe.Event) {
  let subscriptionId: string | null;
  switch (event.type) {
    case "checkout.session.completed":
      subscriptionId = stripeId(event.data.object.subscription);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      subscriptionId = event.data.object.id;
      break;
    default:
      return null;
  }

  // Always read Stripe's current snapshot. This prevents a delayed event from
  // restoring stale fields even before the database timestamp guard runs.
  return subscriptionId
    ? await getStripe().subscriptions.retrieve(subscriptionId)
    : null;
}

export async function synchronizeSubscriptionEvent(event: Stripe.Event) {
  const subscription = await subscriptionFromEvent(event);
  if (!subscription) return;

  const { stripeCustomerId, userId } =
    await ensureCustomerMapping(subscription);
  const item = subscription.items.data[0];
  if (!item) {
    throw new Error(`Subscription ${subscription.id} has no items`);
  }

  const admin = createAdminClient();
  const { data: applied, error } = await admin.rpc(
    "apply_stripe_subscription_event",
    {
      p_event_id: event.id,
      p_event_type: event.type,
      p_event_created_at: stripeTimestamp(event.created),
      p_subscription_id: subscription.id,
      p_stripe_customer_id: stripeCustomerId,
      p_price_id: item.price.id,
      p_status: subscription.status,
      p_current_period_start: stripeTimestamp(item.current_period_start),
      p_current_period_end: stripeTimestamp(item.current_period_end),
      p_cancel_at_period_end: subscription.cancel_at_period_end,
    },
  );

  if (error) {
    throw new Error(`Unable to apply Stripe event ${event.id}`, {
      cause: error,
    });
  }

  if (!applied) return;

  const properties = {
    userId: String(userId),
    plan: planForPrice(item.price.id, getStripeConfig().priceIds),
  };
  if (event.type === "checkout.session.completed") {
    await track("subscription_started", properties);
  } else if (event.type === "customer.subscription.deleted") {
    await track("subscription_ended", properties);
  }
}
