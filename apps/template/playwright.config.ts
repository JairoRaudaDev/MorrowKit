import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `pnpm dev --hostname 127.0.0.1 --port ${port}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: {
          ...process.env,
          NEXT_PUBLIC_APP_URL: baseURL,
          STRIPE_SECRET_KEY:
            process.env.STRIPE_SECRET_KEY ?? "sk_test_playwright_isolated",
          STRIPE_WEBHOOK_SECRET:
            process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_playwright_isolated",
          STRIPE_PRO_PRICE_ID:
            process.env.STRIPE_PRO_PRICE_ID ?? "price_playwright_pro",
          STRIPE_BUSINESS_PRICE_ID:
            process.env.STRIPE_BUSINESS_PRICE_ID ?? "price_playwright_business",
        },
      },
});
