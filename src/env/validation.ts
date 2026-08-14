type Environment = Record<string, string | undefined>;

export function validateEnv<const T extends Environment>(
  scope: string,
  environment: T,
): { [Key in keyof T]: string } {
  const missing = Object.entries(environment)
    .filter(([, value]) => value === undefined || value.trim() === "")
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(
      `Missing required ${scope} environment variable${missing.length === 1 ? "" : "s"}: ${missing.join(", ")}. ` +
        "Copy .env.example to .env.local and provide the missing values.",
    );
  }

  return environment as { [Key in keyof T]: string };
}
