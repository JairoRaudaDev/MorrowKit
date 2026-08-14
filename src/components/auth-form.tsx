"use client";

import Link from "next/link";
import { useActionState } from "react";

import { login, signup } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuthFormState } from "@/lib/auth/validation";

const initialState: AuthFormState = {};

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

      {state.message && (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.values?.email}
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          required
        />
        {state.errors?.email && (
          <p id="email-error" className="text-sm text-destructive">
            {state.errors.email[0]}
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
          aria-invalid={Boolean(state.errors?.password)}
          aria-describedby={
            state.errors?.password ? "password-error" : undefined
          }
          required
        />
        {state.errors?.password && (
          <p id="password-error" className="text-sm text-destructive">
            {state.errors.password[0]}
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
            aria-invalid={Boolean(state.errors?.confirmPassword)}
            aria-describedby={
              state.errors?.confirmPassword
                ? "confirm-password-error"
                : undefined
            }
            required
          />
          {state.errors?.confirmPassword && (
            <p id="confirm-password-error" className="text-sm text-destructive">
              {state.errors.confirmPassword[0]}
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
