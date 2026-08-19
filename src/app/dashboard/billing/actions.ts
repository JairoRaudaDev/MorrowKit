"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { publicEnv } from "@/env/public";
import { type MutationResult, runMutation } from "@/lib/server/mutation";
import { getStripe } from "@/lib/stripe/client";
import { getStripeConfig } from "@/lib/stripe/config";
import { getOrCreateStripeCustomer } from "@/lib/stripe/customer";

export type BillingPortalFormState = MutationResult<undefined>;

export async function createBillingPortalSession(
  _state: BillingPortalFormState,
  _formData: FormData,
): Promise<BillingPortalFormState> {
  void _state;
  void _formData;

  return runMutation({
    input: {},
    schema: z.object({}).strict(),
    auth: "required",
    unexpectedErrorMessage: "We couldn't open billing. Please try again.",
    handler: async (_, { user }): Promise<undefined> => {
      const customerId = await getOrCreateStripeCustomer({
        userId: user.id,
        email: user.email,
      });
      const stripeConfig = getStripeConfig();
      const returnUrl = new URL(
        "/dashboard/billing",
        publicEnv.NEXT_PUBLIC_APP_URL,
      ).toString();
      const session = await getStripe().billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });
      redirect(stripeConfig.portalRedirect(session.url));
    },
  });
}
