"use server";

import { redirect } from "next/navigation";

import { publicEnv } from "@/env/public";
import {
  type AuthFormState,
  safeNextPath,
  validateCredentials,
} from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/server";

function authErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "The email or password is incorrect.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Confirm your email before signing in.";
  }
  if (normalized.includes("user already registered")) {
    return "An account with this email already exists.";
  }
  if (normalized.includes("password")) {
    return message;
  }

  return "Authentication is temporarily unavailable. Please try again.";
}

export async function login(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = validateCredentials(formData);

  if (!result.success) {
    return { errors: result.errors, values: { email: result.data.email } };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) {
    return {
      message: authErrorMessage(error.message),
      values: { email: result.data.email },
    };
  }

  redirect(safeNextPath(formData.get("next")));
}

export async function signup(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = validateCredentials(formData, { confirmPassword: true });

  if (!result.success) {
    return { errors: result.errors, values: { email: result.data.email } };
  }

  const supabase = await createClient();
  const next = safeNextPath(formData.get("next"));
  const callback = new URL("/auth/callback", publicEnv.NEXT_PUBLIC_APP_URL);
  callback.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signUp({
    ...result.data,
    options: { emailRedirectTo: callback.toString() },
  });

  if (error) {
    return {
      message: authErrorMessage(error.message),
      values: { email: result.data.email },
    };
  }

  if (data.session) {
    redirect(next);
  }

  redirect(
    `/signup?status=check-email&email=${encodeURIComponent(result.data.email)}`,
  );
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login?status=signed-out");
}
