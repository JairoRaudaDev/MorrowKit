"use client";

import { useActionState } from "react";

import { updateProfile, type ProfileFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ProfileFormState = { ok: true, data: undefined };

export function ProfileForm({ displayName }: { displayName: string }) {
  const [state, action, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="displayName">Display name</Label>
        <Input
          id="displayName"
          name="displayName"
          autoComplete="name"
          defaultValue={displayName}
          maxLength={80}
          aria-invalid={
            !state.ok && Boolean(state.error.fieldErrors?.displayName)
          }
          aria-describedby={
            !state.ok && state.error.fieldErrors?.displayName
              ? "display-name-error"
              : undefined
          }
          required
        />
        {!state.ok && state.error.fieldErrors?.displayName ? (
          <p id="display-name-error" className="text-sm text-destructive">
            {state.error.fieldErrors.displayName[0]}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            This is how your name will appear across the app.
          </p>
        )}
      </div>

      {state.ok ? (
        state.message ? (
          <p
            role="status"
            aria-live="polite"
            className="text-sm text-foreground"
          >
            {state.message}
          </p>
        ) : null
      ) : (
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-destructive"
        >
          {state.error.message}
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
