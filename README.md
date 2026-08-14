# SaaSSeed

SaaSSeed is an opinionated, open-source SaaS starter for launching small web products without rebuilding the same foundation every time.

The project will provide a production-ready Next.js and TypeScript base with reusable patterns for authentication, Supabase, billing, email, analytics, dashboards, and deployment. It is being developed by dogfooding the starter across real SaaS launches before adding a CLI.

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

Add schema changes as SQL migrations under `supabase/migrations/`. Keep repeatable development data in `supabase/seed.sql`; it is applied after migrations when the database is reset.

## License

MIT
