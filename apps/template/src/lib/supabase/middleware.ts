import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { publicEnv } from "@/env/public";

/**
 * Refreshes the user's cookie-backed session at the request boundary.
 *
 * This only authenticates/refreshes the request. Route handlers, Server
 * Actions, and pages must still perform their own authorization checks.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not use getSession() for authorization: it reads unverified cookie data.
  // getClaims() verifies the access token and refreshes it when necessary.
  await supabase.auth.getClaims();

  return response;
}
