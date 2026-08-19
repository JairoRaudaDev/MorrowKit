# Production deployment

This runbook deploys MorrowKit as a coordinated system: a Next.js application on Vercel, a hosted Supabase project, and a Stripe live-mode webhook. A green Vercel build alone is not a completed production deployment.

Use these placeholders consistently:

- `<production-origin>`: the final HTTPS origin, for example `https://app.example.com` (no trailing slash)
- `<project-ref>`: the Supabase project reference
- `<vercel-project>`: the Vercel project name

## Production launch checklist

Treat every unchecked item as a release blocker or record an owner, reason, and follow-up date for accepting the risk. Complete the detailed deployment steps below before signing off this checklist.

### Security and access

- [ ] Production secrets are stored only in the hosting provider or team secret manager, never in source control, client bundles, logs, or screenshots.
- [ ] Production access for Vercel, Supabase, Stripe, DNS, email, analytics, and monitoring uses team-owned accounts with MFA and least-privilege roles.
- [ ] Preview and development deployments cannot reach production Supabase or Stripe resources.
- [ ] Secret rotation, incident response, database recovery, and rollback owners are documented.
- [ ] Dependency, lint, type, test, and production-build checks pass for the release commit.

### Supabase

- [ ] A dedicated production project exists in the intended organization and region.
- [ ] Every committed migration has been reviewed, dry-run, and applied; no production-only schema changes live solely in the dashboard.
- [ ] RLS is enabled and reviewed for every exposed table, including negative tests proving users cannot access another user's rows.
- [ ] Auth Site URL and exact callback URLs use `<production-origin>` and do not point to localhost or a preview deployment.
- [ ] Backups, point-in-time recovery expectations, database credentials, and restore responsibility are documented.

### Stripe

- [ ] Production uses live secret keys and live recurring price IDs; no test-mode identifiers remain.
- [ ] Products, prices, tax behavior, currencies, intervals, cancellation rules, and Customer Portal settings match the intended offer.
- [ ] The live webhook targets `<production-origin>/api/stripe/webhook`, has the correct signing secret, and subscribes only to handled events.
- [ ] Successful delivery, signature rejection, retries, and idempotency have been verified without granting entitlements from the checkout redirect alone.

### Email

- [ ] The sending domain is verified with the email provider and required SPF, DKIM, and DMARC records pass validation.
- [ ] `EMAIL_FROM` uses the verified domain, replies reach a monitored mailbox, and production sending limits are sufficient.
- [ ] Supabase Auth SMTP is configured separately when confirmation, recovery, or magic-link email is enabled.
- [ ] Sign-up, confirmation, recovery, and application emails render correctly and link only to `<production-origin>`.

### Monitoring and analytics

- [ ] Error monitoring is enabled for browser, server, and edge runtimes; a controlled test error arrives with the correct environment and release.
- [ ] Source maps are uploaded without exposing source-map credentials to the browser.
- [ ] Alerts cover elevated errors and critical auth, checkout, webhook, and email failures, with a named responder.
- [ ] Product analytics receives the expected lifecycle events in the production project without sensitive personal or payment data.
- [ ] Consent, retention, deletion, and opt-out behavior match the published privacy policy and applicable requirements.

### Legal and customer-facing content

- [ ] Published Privacy Policy and Terms of Service pages are linked from the site and use the final business identity and contact details.
- [ ] Billing terms clearly state pricing, renewal, cancellation, refund, and trial behavior where applicable.
- [ ] Cookie or tracking consent is implemented where required for the launch audience and configured analytics.
- [ ] Support, privacy, and security contact channels are monitored.

### Domain and SEO

- [ ] The canonical domain resolves to the production deployment over HTTPS; alternate hosts redirect to one canonical origin.
- [ ] DNS ownership, renewal, registrar access, and TLS status have been verified, and no stale preview URLs appear in production configuration.
- [ ] Global and page metadata use the production name, description, canonical URL, and social sharing image.
- [ ] Favicon and platform icons load correctly; `robots.txt` and `sitemap.xml` return the intended production content.
- [ ] Private dashboard and auth pages are excluded from indexing while public marketing pages remain crawlable.

### Production smoke tests

- [ ] Homepage, pricing, legal pages, favicon, robots file, sitemap, and unknown-route handling work on the canonical domain.
- [ ] A new user can sign up, confirm email when enabled, log in, refresh the session, log out, and recover access.
- [ ] Unauthenticated users cannot open protected routes, and two test users cannot access each other's data.
- [ ] A real low-cost purchase (or an explicitly approved staging substitute) completes, synchronizes by webhook, updates entitlements, opens the Customer Portal, and can be changed or cancelled.
- [ ] Transactional email, analytics events, error reporting, logs, and alerts are visible in their production systems.
- [ ] Mobile and desktop checks show no broken layout, mixed content, console errors, failed requests, or leaked secrets.
- [ ] The deployed commit, validation owner, launch time, known risks, and rollback target are recorded.

## 1. Choose the environment model

Keep production and non-production resources separate.

| Vercel environment | Supabase                                                         | Stripe                              | `NEXT_PUBLIC_APP_URL`   |
| ------------------ | ---------------------------------------------------------------- | ----------------------------------- | ----------------------- |
| Production         | Dedicated production project                                     | Live-mode keys, prices, and webhook | `<production-origin>`   |
| Preview            | Dedicated staging project, if previews need working auth/billing | Test-mode keys, prices, and webhook | A stable staging origin |
| Development        | Local Supabase                                                   | Stripe test mode and Stripe CLI     | `http://localhost:3000` |

Do not connect arbitrary preview deployments to production Supabase or Stripe. This starter uses `NEXT_PUBLIC_APP_URL` to construct auth callbacks, checkout return URLs, portal return URLs, and links in email; it therefore needs one stable origin per configured environment. If previews do not have a stable origin, either leave billing/auth validation to staging or configure a branch-specific preview variable.

## 2. Pass the release gates

From a clean checkout of the release commit:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For database changes, also start local Supabase from Docker and run:

```bash
pnpm supabase:start
pnpm supabase:reset
pnpm test:db
```

Do not deploy if a migration only exists in a Supabase dashboard. Migrations in `supabase/migrations/` are the schema source of truth.

## 3. Create and migrate Supabase production

1. Create a new hosted Supabase project in the intended organization and region. Record the project reference and database password in the team's secret manager.
2. In Supabase, copy the Project URL, anonymous/publishable key, and service-role key. The service-role key is a server secret and must never appear in browser code, tickets, logs, or screenshots.
3. Authenticate and link this repository:

   ```bash
   pnpm exec supabase login
   pnpm exec supabase link --project-ref <project-ref>
   ```

4. Confirm the linked target before every production schema change:

   ```bash
   pnpm exec supabase projects list
   pnpm exec supabase db push --dry-run
   ```

5. Review the dry-run output, then apply only the committed migrations:

   ```bash
   pnpm exec supabase db push
   ```

Do not use `db reset --linked` or `--include-seed` against production. The included seed file is for local development and tests.

### Supabase Auth URLs and mail

In **Authentication > URL Configuration**:

- set **Site URL** to `<production-origin>`;
- add the exact production redirect `<production-origin>/auth/callback`;
- retain `http://localhost:3000/auth/callback` only if the production project is deliberately used for local development (a separate local/staging project is safer);
- if staging is supported, add its exact `/auth/callback` URL.

Prefer exact production URLs over wildcards. Preview wildcards are appropriate only for an isolated preview/staging Supabase project.

Configure a production SMTP provider and the desired confirmation policy in Supabase Auth before relying on confirmation, recovery, or magic-link email. This is separate from the application's Resend integration.

## 4. Configure Stripe live mode

In Stripe live mode:

1. Create or verify the products and recurring prices for Pro and Business. Record the live `price_...` IDs.
2. Enable and configure the Customer Portal. Set the product, cancellation, and update behavior you intend to offer.
3. Keep the live secret key available for the Vercel Production environment only. Never mix an `sk_live_...` key with test price IDs.

The application maps exactly two configured price IDs to entitlements. Changing a Stripe price requires updating the corresponding Vercel variable and redeploying.

## 5. Import and configure the Vercel project

Import the repository through Vercel's Git integration. This is a single application at the repository root; keep the auto-detected Next.js settings:

| Setting          | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| Framework Preset | Next.js                                                        |
| Root Directory   | repository root (`.`)                                          |
| Install Command  | `pnpm install` (auto-detected)                                 |
| Build Command    | `pnpm build` (auto-detected)                                   |
| Output Directory | Next.js default (`.next`)                                      |
| Node.js          | A version satisfying `.nvmrc` and `package.json` (`>=22.22.0`) |

No `vercel.json` or custom output directory is required. Do not add a Supabase migration command to the Vercel build: database changes should be reviewed and applied as a distinct release step.

### Environment variables

Add these under **Project Settings > Environment Variables**. Set secret values as sensitive where Vercel permits it. Any variable change requires a new deployment; it does not alter an existing deployment.

| Variable                        | Production value                                         | Exposure                    |
| ------------------------------- | -------------------------------------------------------- | --------------------------- |
| `NEXT_PUBLIC_APP_URL`           | `<production-origin>`                                    | Browser-visible, build-time |
| `NEXT_PUBLIC_SUPABASE_URL`      | Production Supabase Project URL                          | Browser-visible, build-time |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production anonymous/publishable key                     | Browser-visible, build-time |
| `SUPABASE_SERVICE_ROLE_KEY`     | Production service-role key                              | Server only                 |
| `STRIPE_SECRET_KEY`             | Stripe live secret key                                   | Server only                 |
| `STRIPE_WEBHOOK_SECRET`         | Added after the live webhook is created                  | Server only                 |
| `STRIPE_PRO_PRICE_ID`           | Live Pro recurring price ID                              | Server only                 |
| `STRIPE_BUSINESS_PRICE_ID`      | Live Business recurring price ID                         | Server only                 |
| `RESEND_API_KEY`                | Production Resend API key                                | Server only                 |
| `EMAIL_FROM`                    | Verified sender, such as `MorrowKit <hello@example.com>` | Server only                 |

Optional integrations:

- `POSTHOG_API_KEY` and, when needed, `POSTHOG_HOST`
- `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` for source-map upload during the build

Only names prefixed with `NEXT_PUBLIC_` belong in the browser bundle. Never copy `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, webhook secrets, or provider tokens into a public variable.

For Preview, use a staging Supabase project and Stripe test-mode values. A Stripe endpoint's `whsec_...` secret belongs only with that exact endpoint; it is not interchangeable with the Stripe CLI secret or another environment's endpoint.

## 6. Make the first Vercel deployment

Deploy the release commit after all variables except `STRIPE_WEBHOOK_SECRET` are present. The first deployment provides an HTTPS `vercel.app` URL and proves the application builds. A configuration error may fail the build early because required variables are validated when the relevant modules load.

Use the temporary Vercel URL only to diagnose the build. Complete the custom-domain step before configuring the canonical application URL and live Stripe webhook.

## 7. Attach the custom domain

In **Vercel Project > Settings > Domains**, add the chosen apex or subdomain. Follow the exact DNS records Vercel displays; do not copy an A or CNAME target from an unrelated project. If both apex and `www` are added, select one canonical domain and redirect the other.

Wait until Vercel reports the domain as valid and its TLS certificate is active, then verify:

```bash
curl -I <production-origin>
```

Update `NEXT_PUBLIC_APP_URL` to this exact HTTPS origin if the initial value differed, then redeploy. Update the Supabase Site URL and production callback at the same time. Avoid a trailing slash, which can produce inconsistent URL composition.

## 8. Register the Stripe webhook

After the custom domain is serving the production deployment, create a live-mode webhook destination in Stripe Workbench:

```text
<production-origin>/api/stripe/webhook
```

Subscribe only to the events handled by this repository:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Reveal the endpoint signing secret and set it as `STRIPE_WEBHOOK_SECRET` in Vercel's **Production** environment. Redeploy once more so the new secret is available to the function.

The endpoint requires a public HTTPS URL, reads the raw request body, verifies `Stripe-Signature`, limits request size, and records events idempotently in Supabase. A direct browser request is not a meaningful webhook test.

## 9. Validate the production system

Run this checklist with a new user and a real, low-cost live purchase that can be refunded afterward. If live billing is not yet authorized, complete the same flow against staging with Stripe test mode and mark live billing as an explicit release blocker.

### Infrastructure

- [ ] Production deployment and custom domain return HTTPS successfully.
- [ ] The browser console and Network panel do not expose server-only secrets.
- [ ] Vercel function logs show no environment-validation errors.
- [ ] Supabase migration history contains every committed migration.
- [ ] RLS is enabled and a signed-in user cannot read another user's profile or billing rows.

### Authentication and email

- [ ] Sign up, confirmation (when enabled), login, logout, and session refresh work.
- [ ] Auth emails and application emails link to `<production-origin>`, not localhost or a preview URL.
- [ ] `/dashboard` redirects unauthenticated visitors and loads for the signed-in user.

### Billing and webhooks

- [ ] Pro and Business buttons open Stripe Checkout with the intended live product, price, currency, and interval.
- [ ] Cancel returns to the production billing page without granting access.
- [ ] A completed checkout returns successfully, and Stripe reports a `2xx` delivery for the subscribed events.
- [ ] `billing_customers`, `subscriptions`, and `stripe_webhook_events` contain the expected records for the test user.
- [ ] The dashboard reflects the paid plan only after webhook synchronization.
- [ ] Customer Portal opens and returns to the production billing page.
- [ ] A cancellation or plan change in the portal produces a successful webhook and updates entitlements.
- [ ] Retrying an already-delivered event does not duplicate or regress subscription state.

### Operations

- [ ] Sentry receives a controlled test error if enabled; source maps resolve if upload credentials are configured.
- [ ] PostHog receives the expected lifecycle events if enabled.
- [ ] Vercel, Supabase, Stripe, mail, and monitoring ownership is assigned to team accounts rather than one person's account.
- [ ] Recovery codes, database credentials, and secret-rotation instructions are stored in the team's secret manager/runbook.

## 10. Release and rollback

Record the deployed Git commit, Vercel deployment URL, migration IDs, Stripe webhook destination, and validation owner. Promote or merge only the verified commit.

If the application fails, roll the custom domain back to the last known-good Vercel deployment. A Vercel rollback does not undo Supabase migrations or Stripe configuration. Prefer forward-compatible, additive migrations and prepare a separate, reviewed corrective migration when database rollback is necessary. Disable the live webhook or product only when the incident calls for it; doing so changes external production behavior.

## Optional future deploy button

A future **Deploy to Vercel** button may import the repository and predeclare environment-variable names. It must not claim to create or migrate Supabase, create Stripe products or webhook destinations, choose a canonical domain, or validate production billing. The manual steps and validation checklist in this runbook remain authoritative.

## Provider references

- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Vercel custom domains](https://vercel.com/docs/domains/set-up-custom-domain)
- [Supabase CLI workflow](https://supabase.com/docs/guides/local-development/cli-workflows)
- [Supabase Auth redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
- [Stripe webhook endpoints](https://docs.stripe.com/webhooks)
