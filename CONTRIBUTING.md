# Contributing to MorrowKit

Thanks for helping improve MorrowKit. Keep changes focused, secure, and easy to review.

## Setup

You need Node.js 22.22+, pnpm 10+, and Docker Desktop.

1. Fork and clone the repository.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env.local` and add the local Supabase values reported by `pnpm exec supabase status`.
4. Run `pnpm supabase:start`, then `pnpm supabase:reset`.
5. Start the app with `pnpm dev`.

Never commit `.env.local` or credentials. See the README for Stripe and optional service configuration.

## Branch strategy

Create a short-lived branch from the latest default branch. Use a descriptive, lowercase name such as `feat/team-billing`, `fix/login-redirect`, `docs/setup`, or `chore/dependencies`. Keep one logical change per branch and rebase or merge the latest default branch before requesting final review. Do not commit directly to the default branch.

## Commit convention

Use Conventional Commit-style subjects:

```text
<type>(optional-scope): <imperative summary>
```

Common types are `feat`, `fix`, `docs`, `test`, `refactor`, `ci`, `chore`, and `security`. Keep commits coherent and avoid mixing unrelated formatting or generated files into a change. Examples: `feat(billing): add annual plan` and `fix(auth): preserve redirect after login`.

## Tests and checks

Add or update tests where the behavior lives. Before opening a pull request, run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Also run `pnpm test:db` for migrations, RLS policies, or database behavior, and `pnpm test:e2e` for affected user journeys. Database changes must use a new migration; do not edit a migration that may already be shared. Security-sensitive auth, RLS, billing, and webhook changes require regression coverage.

## Pull requests

Open a focused pull request with:

- a clear problem statement and summary of the approach;
- linked issues when applicable;
- the exact checks run and their results;
- screenshots or recordings for visible UI changes;
- migration, environment, deployment, security, and compatibility notes;
- documentation updates for changed setup or behavior.

Keep the branch reviewable, respond to feedback, and ensure CI passes. Reviewers may ask for a smaller scope or additional tests. By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
