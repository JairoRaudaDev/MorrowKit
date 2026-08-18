# SaaSSeed

SaaSSeed is an opinionated, open-source SaaS starter for launching small web products without rebuilding the same foundation every time.

The project will provide a production-ready Next.js and TypeScript base with reusable patterns for authentication, Supabase, billing, email, analytics, dashboards, and deployment. It is being developed by dogfooding the starter across real SaaS launches before adding a CLI.

## Transactional email

Resend is the default transactional email provider. Set `RESEND_API_KEY` and
`EMAIL_FROM` from `.env.example` in production, then use `sendEmail` for custom
messages or `sendWelcomeEmail` for the included welcome template. In development
and tests, email calls return `{ delivery: "preview", id: null }` without making a
network request.

## Status

SaaSSeed is in its initial setup phase. Application functionality has not been added yet.

## Local Supabase

The local database schema and seed data are versioned in `supabase/`, so a fresh clone can reproduce the database from Git. Install [Docker Desktop](https://docs.docker.com/desktop/) and the project dependencies, then start the local Supabase stack:

```bash
pnpm install
supabase start
```

The same command is available through the project scripts:

```bash
pnpm supabase:start
```

Useful database commands:

```bash
pnpm supabase:stop   # Stop the local stack
pnpm supabase:reset  # Rebuild the database from migrations and seed.sql
```

## Browser smoke tests

The Playwright suite covers the public site, auth forms, protected dashboard
routes, account settings protection, and pricing. Stripe credentials are replaced
with inert test values when Playwright starts the app, and the default suite does
not create checkout sessions.

```bash
pnpm test:e2e
```

The stateful signup, settings, logout, and login journey needs the configured
Supabase instance. Start local Supabase, then opt in to that test:

```powershell
$env:PLAYWRIGHT_TEST_AUTH = "true"
pnpm test:e2e
```

Add schema changes as SQL migrations under `supabase/migrations/`. Keep repeatable development data in `supabase/seed.sql`; it is applied after migrations when the database is reset.

## License

MIT
