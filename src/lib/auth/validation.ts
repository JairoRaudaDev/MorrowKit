import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const signupSchema = credentialsSchema
  .extend({ confirmPassword: z.string() })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function safeNextPath(
  value: FormDataEntryValue | string | null,
  fallback = "/dashboard",
) {
  const path = typeof value === "string" ? value : null;

  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return fallback;
  }

  return path;
}
