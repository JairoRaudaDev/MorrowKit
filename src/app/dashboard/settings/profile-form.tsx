"use client";

import { useActionState } from "react";

import { updateProfile, type ProfileFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ProfileFormState = {};

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
          aria-invalid={Boolean(state.errors?.displayName)}
          aria-describedby={
            state.errors?.displayName ? "display-name-error" : undefined
          }
          required
        />
        {state.errors?.displayName ? (
          <p id="display-name-error" className="text-sm text-destructive">
            {state.errors.displayName[0]}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            This is how your name will appear across the app.
          </p>
        )}
      </div>

      {state.message ? (
        <p
          role="status"
          aria-live="polite"
          className={
            state.status === "success"
              ? "text-sm text-foreground"
              : "text-sm text-destructive"
          }
        >
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
