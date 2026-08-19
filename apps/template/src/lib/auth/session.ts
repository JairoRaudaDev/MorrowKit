import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the request's Supabase access token and returns its claims.
 * Private routes should call this before reading or rendering user data.
 */
export async function requireAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/login");
  }

  return data.claims;
}
