import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { serverEnv } from "@/env/server";

/**
 * Privileged client that bypasses Row Level Security.
 *
 * SECURITY BOUNDARY: use only in trusted server-side code after performing
 * explicit authorization. Never return this client or its key to the browser,
 * and never use it as a substitute for a user-scoped client.
 */
export function createAdminClient() {
  return createSupabaseClient(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    },
  );
}
