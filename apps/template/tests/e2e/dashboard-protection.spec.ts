import { expect, test } from "@playwright/test";

for (const route of ["/dashboard", "/dashboard/settings"]) {
  test(`${route} redirects signed-out visitors to login`, async ({ page }) => {
    await page.goto(route);

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText("Welcome back", { exact: true })).toBeVisible();
  });
}
