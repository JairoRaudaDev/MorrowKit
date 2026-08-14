export type AuthFormState = {
  errors?: Partial<Record<"email" | "password" | "confirmPassword", string[]>>;
  message?: string;
  values?: { email?: string };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCredentials(
  formData: FormData,
  options: { confirmPassword?: boolean } = {},
) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const errors: NonNullable<AuthFormState["errors"]> = {};

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = ["Enter a valid email address."];
  }

  if (password.length < 8) {
    errors.password = ["Password must be at least 8 characters."];
  }

  if (options.confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = ["Passwords do not match."];
  }

  return {
    data: { email, password },
    errors,
    success: Object.keys(errors).length === 0,
  };
}

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
