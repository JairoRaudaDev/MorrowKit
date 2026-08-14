"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type ProfileFormState = {
  status?: "success" | "error";
  message?: string;
  errors?: { displayName?: string[] };
};

export async function updateProfile(
  _state: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    return {
      status: "error",
      message:
        "Your session has expired. Sign in again to update your profile.",
    };
  }

  const value = formData.get("displayName");
  const displayName = typeof value === "string" ? value.trim() : "";

  if (!displayName) {
    return {
      status: "error",
      errors: { displayName: ["Enter a display name."] },
    };
  }

  if (displayName.length > 80) {
    return {
      status: "error",
      errors: { displayName: ["Display name must be 80 characters or fewer."] },
    };
  }

  const { error } = await supabase.auth.updateUser({
    data: { display_name: displayName },
  });

  if (error) {
    return {
      status: "error",
      message: "We couldn't save your profile. Please try again.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");

  return { status: "success", message: "Profile updated." };
}
