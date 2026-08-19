import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { publicEnv } from "@/env/public";

/**
 * Request-scoped server client for the signed-in user.
 *
 * This client uses the public anon key and the request's auth cookies, so RLS
 * remains in force. Create a fresh client for each request; do not cache it.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components cannot write response cookies. src/proxy.ts
            // refreshes sessions and forwards any Set-Cookie headers instead.
          }
        },
      },
    },
  );
}
