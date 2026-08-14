"use server";

import { redirect } from "next/navigation";

import { publicEnv } from "@/env/public";
import { track } from "@/lib/analytics/track";
import { requireAuth } from "@/lib/auth/session";
import { stripe } from "@/lib/stripe/client";
import { stripeConfig } from "@/lib/stripe/config";
import { getOrCreateStripeCustomer } from "@/lib/stripe/customer";

const paidPlans = ["pro", "business"] as const;
type PaidPlan = (typeof paidPlans)[number];

function isPaidPlan(value: FormDataEntryValue | null): value is PaidPlan {
  return typeof value === "string" && paidPlans.includes(value as PaidPlan);
}

export async function createCheckoutSession(formData: FormData) {
  const claims = await requireAuth();
  const plan = formData.get("plan");

  if (!isPaidPlan(plan)) {
    throw new Error("Invalid subscription plan");
  }

  const userId = claims.sub;
  if (typeof userId !== "string" || userId.length === 0) {
    throw new Error("Authenticated user is missing an identifier");
  }

  const customerId = await getOrCreateStripeCustomer({
    userId,
    email: typeof claims.email === "string" ? claims.email : undefined,
  });
  const billingUrl = new URL(
    "/dashboard/billing",
    publicEnv.NEXT_PUBLIC_APP_URL,
  );
  const successUrl = `${billingUrl.toString()}?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${billingUrl.toString()}?checkout=canceled`;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: stripeConfig.priceIds[plan], quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { user_id: userId },
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  await track("checkout_started", { plan, userId });

  redirect(session.url);
}
