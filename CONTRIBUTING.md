# Contributing to MorrowKit

Thanks for helping improve MorrowKit. Keep changes focused, secure, and easy to review.

## Setup

You need Node.js 22.22+, pnpm 10+, and Docker Desktop.

1. Fork and clone the repository.
2. Run `pnpm install`.
3. Copy `apps/template/.env.example` to `apps/template/.env.local` and add the local Supabase values reported by `pnpm --filter morrowkit exec supabase status`.
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

## Versioning and releases

MorrowKit uses [Semantic Versioning](https://semver.org/). The public version is
the version of `create-morrowkit`; the private workspace and the application
template bundled by the CLI are released with it under the same Git tag.

- **Patch** releases fix bugs or make compatible maintenance and documentation
  improvements.
- **Minor** releases add backward-compatible features or meaningful template
  capabilities.
- **Major** releases contain breaking CLI behavior, remove supported options, or
  require generated applications to make incompatible migration changes.

Before `1.0.0`, breaking changes may be released in a minor version. They must be
called out clearly in the changelog with migration guidance. Versions do not
need to be bumped in every pull request.

Contributors should add user-visible changes to the appropriate `Added`,
`Changed`, `Deprecated`, `Removed`, `Fixed`, or `Security` section under
[`Unreleased`](CHANGELOG.md#unreleased). Pure refactors, tests, and routine
maintenance do not need entries unless they affect users.

### Maintainer release checklist

Releases are manual and are cut from the default branch:

1. Confirm CI passes and review everything under `Unreleased`.
2. Choose the next semantic version from user-visible impact, then update
   `packages/create-morrowkit/package.json`.
3. Rename the `Unreleased` changelog content to `[x.y.z] - YYYY-MM-DD`, add a new
   empty `Unreleased` section, and include migration notes for breaking changes.
4. Run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and
   `pnpm build`.
5. Merge the release change into the default branch.
6. From `packages/create-morrowkit` at that commit, run
   `npm publish --access public` using an
   npm account with publish access and two-factor authentication.
7. Create and push an annotated Git tag named `vX.Y.Z`, create a GitHub release
   from it using that version's changelog section, then verify
   `npx create-morrowkit@X.Y.Z` in a temporary directory.

If publishing fails, fix the cause and publish the same version only if npm has
not accepted it. Never reuse or overwrite a version or Git tag that users may
already have consumed; prepare a new patch release instead.

This process intentionally requires no release tooling. If release volume or
parallel contributions make manual changelog entries and version bumps
error-prone, the project may adopt Changesets while retaining this changelog,
semantic-versioning policy, and tag format.
