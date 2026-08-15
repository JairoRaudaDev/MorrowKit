"use client";

import Link from "next/link";
import { useActionState } from "react";

import { login, signup, type AuthFormState } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { FormFeedback } from "@/components/form-feedback";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthFormState = { ok: true, data: undefined };

type AuthFormProps = {
  mode: "login" | "signup";
  next: string;
};

export function AuthForm({ mode, next }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [state, action, pending] = useActionState(
    isSignup ? signup : login,
    initialState,
  );

  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="next" value={next} />

      {!state.ok && state.error.message && (
        <FormFeedback kind="error" message={state.error.message} />
      )}

      {pending && (
        <FormFeedback
          kind="pending"
          message={isSignup ? "Creating your account…" : "Signing you in…"}
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={!state.ok ? state.values?.email : undefined}
          aria-invalid={!state.ok && Boolean(state.error.fieldErrors?.email)}
          aria-describedby={
            !state.ok && state.error.fieldErrors?.email
              ? "email-error"
              : undefined
          }
          required
        />
        {!state.ok && state.error.fieldErrors?.email && (
          <p id="email-error" className="text-sm text-destructive">
            {state.error.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          aria-invalid={!state.ok && Boolean(state.error.fieldErrors?.password)}
          aria-describedby={
            !state.ok && state.error.fieldErrors?.password
              ? "password-error"
              : undefined
          }
          required
        />
        {!state.ok && state.error.fieldErrors?.password && (
          <p id="password-error" className="text-sm text-destructive">
            {state.error.fieldErrors.password[0]}
          </p>
        )}
      </div>

      {isSignup && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={
              !state.ok && Boolean(state.error.fieldErrors?.confirmPassword)
            }
            aria-describedby={
              !state.ok && state.error.fieldErrors?.confirmPassword
                ? "confirm-password-error"
                : undefined
            }
            required
          />
          {!state.ok && state.error.fieldErrors?.confirmPassword && (
            <p id="confirm-password-error" className="text-sm text-destructive">
              {state.error.fieldErrors.confirmPassword[0]}
            </p>
          )}
        </div>
      )}

      <Button className="w-full" type="submit" disabled={pending}>
        {pending
          ? isSignup
            ? "Creating account…"
            : "Signing in…"
          : isSignup
            ? "Create account"
            : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isSignup ? "Already have an account?" : "New to SaaSSeed?"}{" "}
        <Link
          className="font-medium text-foreground underline-offset-4 hover:underline"
          href={`${isSignup ? "/login" : "/signup"}${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`}
        >
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
