import "server-only";

import { unstable_rethrow } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

export type MutationErrorCode =
  | "UNAUTHENTICATED"
  | "VALIDATION"
  | "CONFLICT"
  | "EXTERNAL_SERVICE"
  | "INTERNAL";

export type MutationResult<
  Data = undefined,
  Field extends string = string,
  Values = undefined,
> =
  | { ok: true; data: Data; message?: string }
  | {
      ok: false;
      error: {
        code: MutationErrorCode;
        message: string;
        fieldErrors?: Partial<Record<Field, string[]>>;
      };
      values?: Values;
    };

export class MutationError extends Error {
  constructor(
    readonly code: Exclude<MutationErrorCode, "VALIDATION" | "INTERNAL">,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "MutationError";
  }
}

type MutationContext = { user: User | null };

type RunMutationOptions<Schema extends z.ZodType, Data> = {
  input: unknown;
  schema: Schema;
  auth?: "none" | "required";
  handler: (input: z.output<Schema>, context: MutationContext) => Promise<Data>;
  successMessage?: string;
  unexpectedErrorMessage?: string;
};

export function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export async function runMutation<Schema extends z.ZodType, Data>({
  input,
  schema,
  auth = "none",
  handler,
  successMessage,
  unexpectedErrorMessage = "Something went wrong. Please try again.",
}: RunMutationOptions<Schema, Data>): Promise<
  MutationResult<Data, Extract<keyof z.input<Schema>, string>>
> {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: {
        code: "VALIDATION",
        message: "Check the highlighted fields and try again.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors as Partial<
          Record<Extract<keyof z.input<Schema>, string>, string[]>
        >,
      },
    };
  }

  try {
    let user: User | null = null;

    if (auth === "required") {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        return {
          ok: false,
          error: {
            code: "UNAUTHENTICATED",
            message: "Your session has expired. Sign in and try again.",
          },
        };
      }

      user = data.user;
    }

    return {
      ok: true,
      data: await handler(parsed.data, { user }),
      message: successMessage,
    };
  } catch (error) {
    unstable_rethrow(error);

    if (error instanceof MutationError) {
      return {
        ok: false,
        error: { code: error.code, message: error.message },
      };
    }

    console.error("Unexpected server mutation error", error);
    return {
      ok: false,
      error: { code: "INTERNAL", message: unexpectedErrorMessage },
    };
  }
}
