import "server-only";

import type { User } from "@supabase/supabase-js";
import { cache } from "react";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type Profile = Readonly<{
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
}>;

export type Subscription = Readonly<{
  priceId: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}>;

/** Returns the authenticated Supabase user for the current request. */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error?.name === "AuthSessionMissingError") {
    return null;
  }

  if (error) {
    throw new Error("Unable to read the current user", { cause: error });
  }

  return data.user;
});

/** Returns the current user's public profile fields. */
export const getProfile = cache(
  async (userId: string): Promise<Profile | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id,display_name,avatar_url")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      throw new Error("Unable to read the profile", { cause: error });
    }

    return data
      ? {
          id: data.id,
          displayName: data.display_name,
          avatarUrl: data.avatar_url,
        }
      : null;
  },
);

/** Returns the user's most recently updated subscription, if one exists. */
export const getSubscription = cache(
  async (userId: string): Promise<Subscription | null> => {
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

    return subscription
      ? {
          priceId: subscription.price_id,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        }
      : null;
  },
);
