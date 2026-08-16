import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be 128 characters or fewer."),
});

export const signupSchema = credentialsSchema
  .extend({ confirmPassword: z.string().max(128) })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function safeNextPath(
  value: FormDataEntryValue | string | null,
  fallback = "/dashboard",
) {
  const path = typeof value === "string" ? value : null;

  if (
    !path ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\") ||
    /[\u0000-\u001f\u007f]/u.test(path)
  ) {
    return fallback;
  }

  try {
    const origin = "https://redirect.invalid";
    const url = new URL(path, origin);
    return url.origin === origin
      ? `${url.pathname}${url.search}${url.hash}`
      : fallback;
  } catch {
    return fallback;
  }
}
