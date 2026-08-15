"use client";

import { useActionState, useId } from "react";
import type { VariantProps } from "class-variance-authority";

import { FormFeedback } from "@/components/form-feedback";
import { Button, buttonVariants } from "@/components/ui/button";
import type { MutationResult } from "@/lib/server/mutation";

type ActionFormProps<Field extends string> = {
  action: (
    state: MutationResult<undefined, Field>,
    formData: FormData,
  ) => Promise<MutationResult<undefined, Field>>;
  label: string;
  pendingLabel: string;
  pendingMessage?: string;
  fields?: Record<string, string>;
  className?: string;
  buttonClassName?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
};

export function ActionForm<Field extends string>({
  action,
  label,
  pendingLabel,
  pendingMessage,
  fields,
  className,
  buttonClassName,
  variant,
}: ActionFormProps<Field>) {
  const feedbackId = useId();
  const [state, formAction, pending] = useActionState(action, {
    ok: true,
    data: undefined,
  } as MutationResult<undefined, Field>);

  return (
    <form action={formAction} className={className}>
      {fields &&
        Object.entries(fields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
      <Button
        type="submit"
        variant={variant}
        className={buttonClassName}
        disabled={pending}
        aria-describedby={pending || !state.ok ? feedbackId : undefined}
      >
        {pending ? pendingLabel : label}
      </Button>
      <div id={feedbackId} className="mt-3">
        {pending && (
          <FormFeedback
            kind="pending"
            message={pendingMessage ?? pendingLabel}
          />
        )}
        {!pending && !state.ok && (
          <FormFeedback kind="error" message={state.error.message} />
        )}
        {!pending && state.ok && state.message && (
          <FormFeedback kind="success" message={state.message} />
        )}
      </div>
    </form>
  );
}
