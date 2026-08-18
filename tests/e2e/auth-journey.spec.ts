import { expect, test } from "@playwright/test";

test.skip(
  process.env.PLAYWRIGHT_TEST_AUTH !== "true",
  "Set PLAYWRIGHT_TEST_AUTH=true and start the configured Supabase instance to run the stateful auth journey.",
);

test("a user can sign up, update settings, sign out, and log back in", async ({
  page,
}) => {
  const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const email = `playwright-${runId}@example.com`;
  const password = `Smoke-${runId}!Aa1`;
  const displayName = `Smoke User ${runId}`;

  await page.goto("/signup?next=/dashboard");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Confirm password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Dashboard" }),
  ).toBeVisible();

  await page.goto("/dashboard/settings");
  await expect(
    page.getByRole("heading", { level: 1, name: "Account settings" }),
  ).toBeVisible();
  await expect(page.getByLabel("Email address")).toHaveValue(email);

  await page.getByLabel("Display name").fill(displayName);
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Profile updated.")).toBeVisible();

  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login\?status=signed-out$/);
  await expect(page.getByText("You have been signed out.")).toBeVisible();

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Dashboard" }),
  ).toBeVisible();
});
