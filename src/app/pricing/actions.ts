"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { publicEnv } from "@/env/public";
import { track } from "@/lib/analytics/track";
import {
  formDataToObject,
  MutationError,
  type MutationResult,
  runMutation,
} from "@/lib/server/mutation";
import { stripe } from "@/lib/stripe/client";
import { stripeConfig } from "@/lib/stripe/config";
import { getOrCreateStripeCustomer } from "@/lib/stripe/customer";

const checkoutSchema = z.object({ plan: z.enum(["pro", "business"]) });

export type CheckoutFormState = MutationResult<undefined, "plan">;

export async function createCheckoutSession(
  _state: CheckoutFormState,
  formData: FormData,
): Promise<CheckoutFormState> {
  return runMutation({
    input: formDataToObject(formData),
    schema: checkoutSchema,
    auth: "required",
    unexpectedErrorMessage: "We couldn't start checkout. Please try again.",
    handler: async ({ plan }, { user }): Promise<undefined> => {
      if (!user) {
        throw new MutationError("UNAUTHENTICATED", "Sign in to continue.");
      }
      const customerId = await getOrCreateStripeCustomer({
        userId: user.id,
        email: user.email,
      });
      const billingUrl = new URL(
        "/dashboard/billing",
        publicEnv.NEXT_PUBLIC_APP_URL,
      );
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId,
        line_items: [{ price: stripeConfig.priceIds[plan], quantity: 1 }],
        success_url: `${billingUrl.toString()}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${billingUrl.toString()}?checkout=canceled`,
        client_reference_id: user.id,
        allow_promotion_codes: true,
        subscription_data: { metadata: { user_id: user.id } },
      });
      if (!session.url) {
        throw new MutationError(
          "EXTERNAL_SERVICE",
          "We couldn't start checkout. Please try again.",
        );
      }
      await track("checkout_started", { plan, userId: user.id });
      redirect(session.url);
    },
  });
}
