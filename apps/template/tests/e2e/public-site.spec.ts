import { expect, test } from "@playwright/test";

test("homepage loads and links to the primary public routes", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Build what matters. Leave the busywork behind.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "View pricing" }).click();
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Choose the plan that fits." }),
  ).toBeVisible();
});

test("login and signup pages expose the expected authentication forms", async ({
  page,
}) => {
  await page.goto("/login");
  await expect(page.getByText("Welcome back", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();

  await page.getByRole("link", { name: "Create an account" }).click();
  await expect(page).toHaveURL(/\/signup\?next=%2Fdashboard$/);
  await expect(
    page.getByText("Create your account", { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Confirm password")).toBeVisible();
});
