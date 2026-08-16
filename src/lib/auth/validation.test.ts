import { describe, expect, it } from "vitest";

import { credentialsSchema, safeNextPath, signupSchema } from "./validation";

describe("auth validation", () => {
  it("normalizes valid credentials", () => {
    expect(
      credentialsSchema.parse({
        email: "  PERSON@Example.COM ",
        password: "correct horse battery staple",
      }),
    ).toEqual({
      email: "person@example.com",
      password: "correct horse battery staple",
    });
  });

  it("rejects invalid credentials and mismatched confirmation", () => {
    expect(
      signupSchema.safeParse({
        email: "not-an-email",
        password: "short",
        confirmPassword: "different",
      }).success,
    ).toBe(false);
  });
});

describe("safeNextPath", () => {
  it("preserves local paths with query strings and fragments", () => {
    expect(safeNextPath("/dashboard/billing?tab=plan#details")).toBe(
      "/dashboard/billing?tab=plan#details",
    );
  });

  it.each([
    "https://evil.example/path",
    "//evil.example/path",
    "/\\evil.example/path",
    "/dashboard\n/elsewhere",
  ])("rejects unsafe redirect %j", (path) => {
    expect(safeNextPath(path, "/safe")).toBe("/safe");
  });
});
