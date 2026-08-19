"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { publicEnv } from "@/env/public";
import { track } from "@/lib/analytics/track";
import {
  credentialsSchema,
  safeNextPath,
  signupSchema,
} from "@/lib/auth/validation";
import {
  MutationError,
  type MutationResult,
  runMutation,
} from "@/lib/server/mutation";
import { createClient } from "@/lib/supabase/server";

type AuthField = "email" | "password" | "confirmPassword";
type AuthValues = { email?: string };
export type AuthFormState = MutationResult<undefined, AuthField, AuthValues>;

function authError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return new MutationError(
      "UNAUTHENTICATED",
      "The email or password is incorrect.",
    );
  }
  if (normalized.includes("email not confirmed")) {
    return new MutationError(
      "UNAUTHENTICATED",
      "Confirm your email before signing in.",
    );
  }
  if (normalized.includes("user already registered")) {
    return new MutationError(
      "CONFLICT",
      "An account with this email already exists.",
    );
  }
  if (normalized.includes("password")) {
    return new MutationError("EXTERNAL_SERVICE", message);
  }

  return new MutationError(
    "EXTERNAL_SERVICE",
    "Authentication is temporarily unavailable. Please try again.",
  );
}

export async function login(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = { email: String(formData.get("email") ?? "") };
  const result = await runMutation({
    input: Object.fromEntries(formData),
    schema: credentialsSchema,
    handler: async (credentials) => {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw authError(error.message);
      redirect(safeNextPath(formData.get("next")));
    },
  });

  return result.ok ? result : { ...result, values };
}

export async function signup(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = { email: String(formData.get("email") ?? "") };
  const result = await runMutation({
    input: Object.fromEntries(formData),
    schema: signupSchema,
    handler: async (input) => {
      const credentials = { email: input.email, password: input.password };
      const supabase = await createClient();
      const next = safeNextPath(formData.get("next"));
      const callback = new URL("/auth/callback", publicEnv.NEXT_PUBLIC_APP_URL);
      callback.searchParams.set("next", next);
      const { data, error } = await supabase.auth.signUp({
        ...credentials,
        options: { emailRedirectTo: callback.toString() },
      });
      if (error) throw authError(error.message);
      await track("user_signed_up", { userId: data.user?.id });
      redirect(
        data.session
          ? next
          : `/signup?status=check-email&email=${encodeURIComponent(credentials.email)}`,
      );
    },
  });

  return result.ok ? result : { ...result, values };
}

export type LogoutFormState = MutationResult<undefined>;

export async function logout(
  _state: LogoutFormState,
  _formData: FormData,
): Promise<LogoutFormState> {
  void _state;
  void _formData;

  return runMutation({
    input: {},
    schema: z.object({}).strict(),
    auth: "required",
    handler: async () => {
      const supabase = await createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw authError(error.message);
      redirect("/login?status=signed-out");
    },
  });
}
