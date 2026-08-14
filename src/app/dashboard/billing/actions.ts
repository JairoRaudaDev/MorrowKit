"use server";

import { redirect } from "next/navigation";

import { publicEnv } from "@/env/public";
import { requireAuth } from "@/lib/auth/session";
import { stripe } from "@/lib/stripe/client";
import { getOrCreateStripeCustomer } from "@/lib/stripe/customer";

export async function createBillingPortalSession() {
  const claims = await requireAuth();
  const userId = claims.sub;

  if (typeof userId !== "string" || userId.length === 0) {
    throw new Error("Authenticated user is missing an identifier");
  }

  const customerId = await getOrCreateStripeCustomer({
    userId,
    email: typeof claims.email === "string" ? claims.email : undefined,
  });
  const returnUrl = new URL(
    "/dashboard/billing",
    publicEnv.NEXT_PUBLIC_APP_URL,
  ).toString();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  redirect(session.url);
}
