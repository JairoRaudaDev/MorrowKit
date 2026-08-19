# MorrowKit

<p align="center">
  <a href="https://github.com/JairoRaudaDev/MorrowKit"><img src="https://img.shields.io/badge/GitHub-MorrowKit-181717?logo=github" alt="MorrowKit on GitHub"></a>
  <a href="https://github.com/JairoRaudaDev"><img src="https://img.shields.io/badge/Author-JairoRaudaDev-181717?logo=github" alt="JairoRaudaDev on GitHub"></a>
  <a href="https://github.com/JairoRaudaDev/MorrowKit/issues"><img src="https://img.shields.io/github/issues/JairoRaudaDev/MorrowKit" alt="GitHub issues"></a>
  <a href="https://github.com/JairoRaudaDev/MorrowKit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/JairoRaudaDev/MorrowKit" alt="MIT license"></a>
  <a href="https://buymeacoffee.com/jairoraudadev"><img src="https://img.shields.io/badge/Buy_Me_a_Coffee-support-FFDD00?logo=buymeacoffee&logoColor=000000" alt="Buy me a coffee"></a>
</p>

> Build → launch → measure → grow or kill.

MorrowKit is an opinionated, open-source starter for shipping small SaaS
products without rebuilding authentication, billing, email, analytics, and
deployment plumbing for every idea.

It supports a portfolio approach to product development: validate an idea,
build the smallest useful version, launch it, distribute it, measure what
happens, then invest or stop. MorrowKit handles the recurring foundation so
product work begins sooner—and experiments remain cheap enough to end.

## What it is

MorrowKit combines a production-oriented Next.js application template with the
`create-morrowkit` project generator. A generated application includes
email/password authentication, protected dashboards, RLS-secured user data,
subscription billing, transactional email, analytics, monitoring, and tests.

It is a starter, not a hosted platform or framework. Generate a project, rename
the product, change its plans, remove integrations you do not need, and replace
the example product surface with your own.

## Why it exists

Most small SaaS products need the same unglamorous foundation. Rebuilding it
delays the first customer conversation; skipping it creates security, billing,
and operational debt when a product starts to work.

MorrowKit makes a deliberate trade: choose a focused stack and encode sound
defaults once. Its job is to shorten the path from idea to evidence while
keeping each product understandable enough to maintain, transfer, or shut down.

## Features

- **Project generator:** interactive and scriptable scaffolding with pnpm, npm,
  yarn, and Bun support.
- **Optional modules:** remove Stripe, transactional email, or PostHog during
  generation without leaving unused source, dependencies, environment
  variables, migrations, or documentation behind.
- **Authentication:** signup, login, logout, SSR sessions, safe redirects, and
  protected routes with Supabase Auth.
- **Profiles:** account settings backed by an owner-only, RLS-protected
  `profiles` table.
- **Billing:** Pro and Business plans, Stripe Checkout, Customer Portal, and
  synchronized customer/subscription records.
- **Reliable webhooks:** signature verification, request-size limits, durable
  event deduplication, and stale-event guards.
- **Entitlements:** a domain layer mapping subscription state to free, Pro, and
  Business capabilities.
- **Dashboard:** overview, billing, settings, and premium insights with loading,
  empty, error, and not-found states.
- **Email:** Resend behind a provider boundary, with React Email and an included
  welcome message.
- **Analytics:** typed, server-side lifecycle events through PostHog; disabled
  when unconfigured.
- **Observability:** optional Sentry reporting for browser, Node.js, and edge
  runtimes.
- **Quality gates:** Vitest, pgTAP, Playwright, ESLint, Prettier, and TypeScript.
- **Reusable UI:** Tailwind CSS, Radix UI, Lucide icons, and reusable marketing,
  auth, dashboard, and form components.

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
| Tooling       | pnpm, ESLint, Prettier                                   |

## Create a project

### Interactive

Run the generator and answer its prompts:

```bash
npx create-morrowkit@latest
```

You can choose the project directory, package manager, dependency installation,
Git initialization, Stripe billing, transactional email, and analytics.

### Non-interactive

Create the complete default stack with pnpm:

```bash
npx create-morrowkit@latest my-app --yes
```

Create a smaller application without billing, email, or analytics:

```bash
npx create-morrowkit@latest my-app \
  --no-stripe \
  --no-email \
  --no-analytics \
  --yes
```

After generation:

```bash
cd my-app
cp .env.example .env.local
pnpm dev
```

See the [create-morrowkit documentation](packages/create-morrowkit/README.md)
for all prompts, flags, module-removal behavior, generated project structure,
and CI examples.

## Generated application

The default application is organized around explicit product and provider
boundaries:

```text
src/
├── app/                 Routes, layouts, server actions, and Stripe webhook
├── components/          Application components and UI primitives
├── config/              Product name, company, and plan presentation
├── emails/              React Email templates
├── env/                 Public and server environment validation
└── lib/
    ├── analytics/       Product events and PostHog provider
    ├── auth/            Sessions and credential validation
    ├── db/              Profile and subscription queries
    ├── email/           Transactional email provider boundary
    ├── stripe/          Checkout, portal, mapping, and webhook logic
    └── supabase/        Browser, server, middleware, and admin clients

supabase/
├── migrations/          Profiles, billing, webhook processing, and RLS
├── tests/database/      pgTAP schema and policy tests
└── seed.sql

tests/e2e/               Playwright user journeys
```

The generator rewrites this structure when optional modules are excluded.

## Architecture

The App Router application keeps external systems behind small server-only
boundaries:

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

The trust boundary is deliberate: browser code uses the anonymous key plus RLS;
normal authenticated work uses the user's SSR session; trusted billing and
webhook code alone uses the service-role key. Stripe is the billing source of
truth, while Supabase stores the application-readable subscription snapshot
used for entitlements.

## Application setup

Generated projects include a setup script that creates `.env.local` when
needed, starts local Supabase, and refreshes its local URL and keys while
preserving existing configuration:

```bash
pnpm setup
pnpm dev
```

Local development requires Node.js 22.22 or newer, the selected package manager,
and Docker Desktop for Supabase. Supabase Studio is available at
`http://localhost:54323`; captured local Auth email is available at
`http://localhost:54324`.

The [application template documentation](apps/template/README.md) covers:

- environment variables and validation;
- local and hosted Supabase setup;
- Stripe products, webhooks, and Customer Portal configuration;
- Resend and React Email usage;
- test suites and development workflows;
- deployment and production readiness.

For production, follow the
[deployment runbook](apps/template/docs/production-deployment.md), which covers
security checks, Supabase migrations and Auth URLs, Stripe live mode, email,
monitoring, analytics, legal pages, SEO, domains, smoke tests, and rollback.

## Repository development

This repository is a pnpm workspace containing the source application template
and the CLI that packages it:

```text
apps/template/                 Next.js SaaS application template
packages/create-morrowkit/    create-morrowkit CLI
```

Install dependencies once from the repository root:

```bash
pnpm install
```

Common commands:

| Command                             | Purpose                                     |
| ----------------------------------- | ------------------------------------------- |
| `pnpm dev`                          | Run the application template.               |
| `pnpm setup`                        | Set up the template's local Supabase stack. |
| `pnpm cli -- my-app`                | Run the generator directly from source.     |
| `pnpm build`                        | Build the template and publishable CLI.     |
| `pnpm test` / `pnpm test:watch`     | Run tests once or in watch mode.            |
| `pnpm test:db`                      | Run pgTAP database and RLS tests.           |
| `pnpm test:e2e`                     | Run Playwright browser tests.               |
| `pnpm lint`                         | Run ESLint across the workspace.            |
| `pnpm typecheck`                    | Check TypeScript and CLI JavaScript syntax. |
| `pnpm format` / `pnpm format:check` | Write or verify repository formatting.      |

To exercise generation without installing dependencies or creating a nested Git
repository:

```bash
pnpm cli -- my-app --no-install --no-git --yes
```

## Contributing

Issues and pull requests are welcome.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution, versioning, and
release process, and [CHANGELOG.md](CHANGELOG.md) for notable changes.

1. Fork the repository and create a focused branch.
2. Install dependencies and run `pnpm setup` for application work.
3. Make the smallest coherent change and add tests where the behavior lives.
4. For database changes, add a migration rather than editing an already-shared
   one; update pgTAP tests and seed data as needed.
5. Run the relevant tests plus formatting, linting, type checking, and builds.
6. Open a pull request describing the problem, approach, verification, and any
   migration or deployment impact.

Keep secrets, generated output, and local environment files out of commits.
Prefer narrow provider interfaces and explicit server-only modules for
integrations. Security-sensitive authentication, RLS, billing, and webhook
changes should include regression coverage.

## License

MorrowKit is available under the [MIT License](LICENSE).
