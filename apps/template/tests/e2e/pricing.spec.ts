import { expect, test } from "@playwright/test";

test("pricing displays all plans without contacting Stripe", async ({
  page,
}) => {
  await page.goto("/pricing");

  for (const plan of ["Starter", "Pro", "Business"]) {
    await expect(
      page.getByRole("heading", { level: 2, name: plan, exact: true }),
    ).toBeVisible();
  }

  await expect(page.getByRole("button", { name: "Choose Pro" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Choose Business" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Start free" }).click();
  await expect(page).toHaveURL(/\/signup$/);
});
