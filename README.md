# MorrowKit

<p align="center">
  <a href="https://github.com/JairoRaudaDev/SaaSSeed"><img src="https://img.shields.io/badge/GitHub-MorrowKit-181717?logo=github" alt="MorrowKit on GitHub"></a>
  <a href="https://github.com/JairoRaudaDev"><img src="https://img.shields.io/badge/Author-JairoRaudaDev-181717?logo=github" alt="JairoRaudaDev on GitHub"></a>
  <a href="https://github.com/JairoRaudaDev/SaaSSeed/issues"><img src="https://img.shields.io/github/issues/JairoRaudaDev/SaaSSeed" alt="GitHub issues"></a>
  <a href="https://github.com/JairoRaudaDev/SaaSSeed/blob/main/LICENSE"><img src="https://img.shields.io/github/license/JairoRaudaDev/SaaSSeed" alt="MIT license"></a>
  <a href="https://buymeacoffee.com/jairoraudadev"><img src="https://img.shields.io/badge/Buy_Me_a_Coffee-support-FFDD00?logo=buymeacoffee&logoColor=000000" alt="Buy me a coffee"></a>
</p>

> Build → launch → measure → grow or kill.

MorrowKit is an opinionated, open-source starter for shipping small SaaS products without rebuilding authentication, billing, email, analytics, and deployment plumbing for every idea.

It supports a portfolio approach to product development: validate an idea, build the smallest useful version, launch it, distribute it, measure what happens, then invest or stop. MorrowKit handles the recurring foundation so product work begins sooner—and experiments remain cheap enough to end.

## What it is

MorrowKit is a production-oriented Next.js template with email/password authentication, protected dashboards, RLS-secured user data, subscription billing, transactional email, analytics, monitoring, and tests.

It is a starter, not a hosted platform or framework. Fork it, rename it, change its plans, and replace the example product surface with your own.

## Why it exists

Most small SaaS products need the same unglamorous foundation. Rebuilding it delays the first customer conversation; skipping it creates security, billing, and operational debt when a product starts to work.

MorrowKit makes a deliberate trade: choose a focused stack and encode sound defaults once. Its job is to shorten the path from idea to evidence while keeping each product understandable enough to maintain, transfer, or shut down.

## Features

- **Authentication:** signup, login, logout, SSR sessions, safe redirects, and protected routes with Supabase Auth.
- **Profiles:** account settings backed by an owner-only, RLS-protected `profiles` table.
- **Billing:** Pro and Business plans, Stripe Checkout, Customer Portal, and synchronized customer/subscription records.
- **Reliable webhooks:** signature verification, request-size limits, durable event deduplication, and stale-event guards.
- **Entitlements:** a domain layer mapping subscription state to free, Pro, and Business capabilities.
- **Dashboard:** overview, billing, settings, and premium insights with loading, empty, error, and not-found states.
- **Email:** Resend behind a provider boundary, with React Email and an included welcome message.
- **Analytics:** typed, server-side lifecycle events through PostHog; disabled when unconfigured.
- **Observability:** optional Sentry reporting for browser, Node.js, and edge runtimes.
- **Quality gates:** Vitest, pgTAP, Playwright, ESLint, Prettier, TypeScript, and GitHub Actions.
- **Reusable UI:** Tailwind CSS, Radix UI, Lucide icons, and reusable marketing, auth, dashboard, and form components.

## Tech stack

| Layer         | Technology                                               |
| ------------- | -------------------------------------------------------- |
| Application   | Next.js 16 App Router, React 19, TypeScript 5            |
| UI            | Tailwind CSS 4, Radix UI, Lucide React                   |
| Auth and data | Supabase Auth, PostgreSQL, RLS, `@supabase/ssr`          |
| Payments      | Stripe Checkout, Billing Portal, subscriptions, webhooks |
| Email         | Resend, React Email                                      |
| Analytics     | PostHog                                                  |
| Monitoring    | Sentry                                                   |
| Tests         | Vitest, Playwright, pgTAP via Supabase CLI               |
| Tooling       | pnpm, ESLint, Prettier, GitHub Actions                   |

## Quick start

### Prerequisites

- Node.js 22.22 or newer (see `.nvmrc`)
- pnpm 10 or newer
- Docker Desktop for local Supabase

### Run locally

```bash
git clone <your-fork-url>
cd MorrowKit
pnpm install
cp .env.example .env.local
pnpm supabase:start
```

PowerShell users can copy the environment file with:

```powershell
Copy-Item .env.example .env.local
```

Run `pnpm exec supabase status`, then put its API URL, anonymous key, and service-role key in `.env.local`. For UI development without billing, the placeholder Stripe test values are sufficient.

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Supabase Studio runs at [http://localhost:54323](http://localhost:54323), and captured local Auth email at [http://localhost:54324](http://localhost:54324).

Stop the local stack with `pnpm supabase:stop`.

## Environment variables

Copy `.env.example` to `.env.local`; never commit the latter.

### Required application configuration

| Variable                        | Scope  | Purpose                                                        |
| ------------------------------- | ------ | -------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`           | Public | Canonical origin, such as `http://localhost:3000`.             |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public | Supabase API URL.                                              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Anonymous/publishable key; authorization still depends on RLS. |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server | Trusted key used by billing synchronization. Never expose it.  |
| `STRIPE_SECRET_KEY`             | Server | Stripe secret key; use `sk_test_...` outside production.       |
| `STRIPE_WEBHOOK_SECRET`         | Server | Webhook endpoint signing secret.                               |
| `STRIPE_PRO_PRICE_ID`           | Server | Recurring Stripe Price mapped to Pro.                          |
| `STRIPE_BUSINESS_PRICE_ID`      | Server | Recurring Stripe Price mapped to Business.                     |

Required variables are validated when their modules load so configuration errors fail early.

### Production email

| Variable         | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `RESEND_API_KEY` | Resend API key; required only for production delivery.    |
| `EMAIL_FROM`     | Verified sender, such as `MorrowKit <hello@example.com>`. |

### Optional services

| Variable                 | Purpose                                                   |
| ------------------------ | --------------------------------------------------------- |
| `POSTHOG_API_KEY`        | Enables server-side analytics.                            |
| `POSTHOG_HOST`           | Ingestion host; defaults to `https://us.i.posthog.com`.   |
| `SENTRY_DSN`             | Enables production server/edge reporting.                 |
| `NEXT_PUBLIC_SENTRY_DSN` | Enables production browser reporting.                     |
| `SENTRY_AUTH_TOKEN`      | Enables source-map upload when used with org and project. |
| `SENTRY_ORG`             | Sentry organization slug.                                 |
| `SENTRY_PROJECT`         | Sentry project slug.                                      |

## Supabase setup

### Local

The `supabase/` directory contains CLI configuration, ordered migrations, seed data, and database tests.

```bash
pnpm supabase:start
pnpm supabase:reset
pnpm test:db
```

Reset rebuilds the database from migrations and applies `supabase/seed.sql`. Treat migrations as the source of truth rather than making durable changes only through Studio.

The schema includes:

- `profiles`, owned and editable by the authenticated user;
- `billing_customers`, mapping a user to one Stripe customer;
- `subscriptions`, storing the current Stripe subscription snapshot;
- `stripe_webhook_events`, providing durable webhook idempotency;
- `apply_stripe_subscription_event(...)`, a service-role-only function applying eligible events atomically.

Authenticated users can read only their own billing rows through RLS. Billing writes require the service role.

### Hosted project

1. Create a Supabase project.
2. Link it: `pnpm exec supabase link --project-ref <project-ref>`.
3. Review changes: `pnpm exec supabase db push --dry-run`.
4. Apply migrations: `pnpm exec supabase db push`.
5. Add the project URL, anonymous/publishable key, and service-role key to the deployment environment.
6. In Auth URL Configuration, set the Site URL and allow local and production callback URLs. Authentication returns through `/auth/callback`.
7. Configure confirmation and SMTP behavior for your product. Local auth currently allows email/password login without confirmation.

Never use the service-role key in a client component. Add RLS policies and database tests whenever you introduce user-owned tables.

## Stripe setup

1. Create recurring Pro and Business prices.
2. Add their `price_...` IDs and the matching Stripe secret key to the environment.
3. Register `https://your-domain.example/api/stripe/webhook` as a webhook endpoint.
4. Subscribe it to `checkout.session.completed` and `customer.subscription.created`, `.updated`, and `.deleted`.
5. Put the endpoint's `whsec_...` value in `STRIPE_WEBHOOK_SECRET`.
6. Enable and configure the Stripe Customer Portal.

For local webhook development:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the printed signing secret into `.env.local`, restart Next.js, and use Stripe test cards from the pricing page.

Checkout creates or reuses a Stripe customer carrying the Supabase user ID in metadata. Webhooks verify signatures, retrieve Stripe's current subscription snapshot, resolve the user mapping, and update Supabase through an idempotent database function. Entitlements come from the synchronized subscription; never grant access from a checkout redirect alone.

## Email

Verify a sending domain in Resend and configure `RESEND_API_KEY` and `EMAIL_FROM` in production. Use the provider-neutral helper for application mail:

```tsx
import { sendEmail } from "@/lib/email/send";

await sendEmail({
  to: "customer@example.com",
  subject: "Your subject",
  react: <YourEmail />,
  text: "A plain-text fallback",
});
```

`sendWelcomeEmail` and `WelcomeEmail` demonstrate the pattern. Development and tests return `{ delivery: "preview", id: null }` without a network request. Supabase Auth mail is separate; configure Supabase SMTP when enabling production auth emails.

## Development

| Command                             | Purpose                              |
| ----------------------------------- | ------------------------------------ |
| `pnpm dev`                          | Start Next.js in development.        |
| `pnpm build` / `pnpm start`         | Build and serve production.          |
| `pnpm lint`                         | Run ESLint.                          |
| `pnpm typecheck`                    | Check TypeScript.                    |
| `pnpm format` / `pnpm format:check` | Write or verify formatting.          |
| `pnpm test` / `pnpm test:watch`     | Run Vitest once or in watch mode.    |
| `pnpm test:db`                      | Run pgTAP database/RLS tests.        |
| `pnpm test:e2e`                     | Run Playwright.                      |
| `pnpm test:e2e:ui`                  | Open Playwright's UI.                |
| `pnpm supabase:reset`               | Rebuild and seed the local database. |

The default Playwright suite tests public pages, auth forms, protected routes, and pricing without real checkouts. The stateful auth journey requires local Supabase:

```bash
PLAYWRIGHT_TEST_AUTH=true pnpm test:e2e
```

PowerShell:

```powershell
$env:PLAYWRIGHT_TEST_AUTH = "true"
pnpm test:e2e
```

Before a pull request, run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Also run database tests for schema/policy changes and E2E tests for user journeys. CI runs the core checks on pushes and pull requests.

## Deployment

MorrowKit works on any Node.js host supporting Next.js. For the complete Vercel production sequence—including Supabase migrations and Auth URLs, environment scoping, build settings, a custom domain, Stripe's live webhook, validation, and rollback—follow the [production deployment runbook](docs/production-deployment.md).

Elsewhere, build with `pnpm build` and serve with `pnpm start`. Keep server secrets out of logs and browser-prefixed variables. A successful frontend build is not a complete deployment: hosted Supabase and a reachable Stripe webhook are also required.

## Architecture

The App Router application keeps external systems behind small server-only boundaries:

```text
Browser
  └─ Next.js routes and server actions
       ├─ Supabase SSR ──> Auth, profiles, billing snapshots, RLS
       ├─ Stripe ──────> Checkout and Customer Portal
       ├─ Resend ──────> Transactional email
       ├─ PostHog ─────> Lifecycle analytics
       └─ Sentry ──────> Error monitoring

Stripe ── signed webhook ──> Next.js API route ──> service-role Supabase RPC
```

- `src/app/`: public, auth, dashboard, pricing, callback, and webhook routes.
- `src/components/`: shells, states, forms, and UI primitives.
- `src/env/`: public/server configuration and validation.
- `src/lib/auth/`: sessions and credential validation.
- `src/lib/supabase/`: browser, server, middleware, and admin clients.
- `src/lib/db/`: profile and subscription queries.
- `src/lib/stripe/`: configuration, customer mapping, event translation, and synchronization.
- `src/lib/entitlements*`: subscription-to-product-access boundary.
- `src/lib/email/`, `src/emails/`, and `src/lib/analytics/`: provider boundaries and domain events.
- `supabase/migrations/` and `supabase/tests/`: database source of truth and isolation tests.
- `tests/e2e/`: critical browser journeys.

The trust boundary is deliberate: browser code uses the anonymous key plus RLS; normal authenticated work uses the user's SSR session; trusted billing/webhook code alone uses the service-role key. Stripe is the billing source of truth, while Supabase stores the application-readable snapshot used for entitlements.

## Contributing

Issues and pull requests are welcome.

1. Fork the repository and create a focused branch.
2. Install dependencies, create `.env.local`, and start local Supabase.
3. Make the smallest coherent change and add tests where the behavior lives.
4. For database changes, add a new migration rather than editing an already-shared one; update pgTAP tests and seed data as needed.
5. Run the relevant suites and core checks from [Development](#development).
6. Open a pull request describing the problem, approach, verification, and migration/deployment impact.

Keep secrets, generated output, and local environment files out of commits. Prefer narrow provider interfaces and explicit server-only modules for integrations. Security-sensitive auth, RLS, billing, and webhook changes should include regression coverage.

## License

MorrowKit is available under the [MIT License](LICENSE).
