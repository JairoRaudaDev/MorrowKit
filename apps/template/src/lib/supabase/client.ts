"use client";

import { createBrowserClient } from "@supabase/ssr";

import { publicEnv } from "@/env/public";

/**
 * Browser client for user-scoped operations.
 *
 * This client uses the public anon key. Database access must be protected by
 * Row Level Security; never import the service-role client into client code.
 */
export function createClient() {
  return createBrowserClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
