"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  formDataToObject,
  MutationError,
  type MutationResult,
  runMutation,
} from "@/lib/server/mutation";
import { createClient } from "@/lib/supabase/server";

const profileSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(1, "Enter a display name.")
      .max(80, "Display name must be 80 characters or fewer.")
      .refine((value) => !/[\u0000-\u001f\u007f]/u.test(value), {
        message: "Display name contains unsupported characters.",
      }),
  })
  .strict();

export type ProfileFormState = MutationResult<
  undefined,
  keyof z.infer<typeof profileSchema>
>;

export async function updateProfile(
  _state: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  return runMutation({
    input: formDataToObject(formData),
    schema: profileSchema,
    auth: "required",
    successMessage: "Profile updated.",
    unexpectedErrorMessage: "We couldn't save your profile. Please try again.",
    handler: async ({ displayName }) => {
      const supabase = await createClient();
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });
      if (error) {
        throw new MutationError(
          "EXTERNAL_SERVICE",
          "We couldn't save your profile. Please try again.",
          { cause: error },
        );
      }
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/settings");
      return undefined;
    },
  });
}
