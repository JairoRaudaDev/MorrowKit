"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { publicEnv } from "@/env/public";
import { MutationError, runMutation } from "@/lib/server/mutation";
import { stripe } from "@/lib/stripe/client";
import { getOrCreateStripeCustomer } from "@/lib/stripe/customer";

export async function createBillingPortalSession() {
  const result = await runMutation({
    input: {},
    schema: z.object({}),
    auth: "required",
    unexpectedErrorMessage: "We couldn't open billing. Please try again.",
    handler: async (_, { user }): Promise<void> => {
      if (!user) {
        throw new MutationError("UNAUTHENTICATED", "Sign in to continue.");
      }
      const customerId = await getOrCreateStripeCustomer({
        userId: user.id,
        email: user.email,
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
    },
  });

  if (!result.ok) throw new Error(result.error.message);
}
