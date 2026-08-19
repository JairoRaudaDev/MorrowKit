# create-morrowkit

Create a new application from the MorrowKit SaaS template.

## Usage

Start the interactive generator with:

```bash
npx create-morrowkit@latest
```

The default project directory is `morrowkit-app`. You can provide another
directory as the first positional argument:

```bash
npx create-morrowkit@latest my-app
```

The target must be a new or empty directory and cannot be the current working
directory. The generator copies the template, removes unselected modules,
updates the package name and lockfile, optionally installs dependencies, and
optionally initializes a Git repository.

After generation, follow the printed next steps:

```bash
cd my-app
cp .env.example .env.local
pnpm dev
```

If dependency installation was skipped, run the selected package manager's
`install` command before `dev`.

## Interactive options

When stdin and stdout are attached to a terminal, the CLI asks for:

| Question                    | Choices                      | Default         |
| --------------------------- | ---------------------------- | --------------- |
| Project name                | A new or empty directory     | `morrowkit-app` |
| Package manager             | `pnpm`, `npm`, `yarn`, `bun` | `pnpm`          |
| Initialize Git              | yes/no                       | yes             |
| Install dependencies        | yes/no                       | yes             |
| Include Stripe              | yes/no                       | yes             |
| Include transactional email | yes/no                       | yes             |
| Analytics provider          | `posthog`, `none`            | `posthog`       |

Press Enter to accept a default. Yes/no questions accept `y`, `yes`, `n`, or
`no`. Press Ctrl+C to cancel cleanly.

Flags supplied in a terminal become defaults for the prompts. Add `--yes` (or
`-y`) to accept all supplied and built-in defaults without prompting. The CLI
also runs without prompts automatically when either input or output is not a
TTY, as is typical in CI.

## CLI flags

```text
Usage: create-morrowkit [project-directory] [options]

Options:
  -y, --yes                    Use defaults without prompting
  --package-manager <manager> pnpm, npm, yarn, or bun (default: pnpm)
  --install, --no-install     Install or skip dependencies (default: install)
  --git, --no-git             Initialize or skip Git (default: git)
  --stripe, --no-stripe       Include or exclude Stripe (default: include)
  --email, --no-email         Include or exclude email (default: include)
  --analytics <provider>      posthog or none (default: posthog)
  --no-analytics              Alias for --analytics none
  -h, --help                  Show help
```

Value options accept both `--flag value` and `--flag=value`. Exactly one project
directory may be provided. Unknown flags, missing option values, and unsupported
package managers or analytics providers fail with an explanatory error.

## Optional modules

MorrowKit always includes the Next.js application, Supabase authentication and
data access, dashboard shell, UI components, environment validation, Sentry
integration, and test tooling. Three modules can be removed during generation:

### Stripe billing

Disable with `--no-stripe`. This removes the pricing, billing, premium-insights,
and Stripe webhook routes; the Stripe and entitlement libraries; billing
migrations and related database/E2E tests; Stripe dependencies and environment
variables; and billing-specific documentation. The dashboard navigation and
Supabase schema are rewritten so they do not retain billing references.

### Transactional email

Disable with `--no-email`. This removes `src/emails/`, `src/lib/email/`, the
Resend and React Email dependencies, email environment variables, and related
documentation.

### PostHog analytics

Disable with `--analytics none` or `--no-analytics`. This removes
`src/lib/analytics/`, the PostHog dependency and environment variables, event
tracking imports and calls, and analytics documentation.

Disabling modules is additive: all three can be removed in one invocation. The
generator deletes their implementation rather than leaving dormant code or
unused configuration behind.

## Generated project structure

The exact tree depends on the selected modules. A default project has this
high-level structure:

```text
my-app/
├── docs/
│   └── production-deployment.md
├── scripts/
│   └── setup.mjs
├── src/
│   ├── app/                 # Marketing, auth, dashboard, pricing, and API routes
│   ├── components/          # Application components and UI primitives
│   ├── config/              # Product-facing configuration
│   ├── emails/              # React Email templates (optional)
│   ├── env/                 # Public/server environment validation
│   ├── lib/
│   │   ├── analytics/       # PostHog events and provider boundary (optional)
│   │   ├── auth/            # Session and credential helpers
│   │   ├── db/              # Application queries
│   │   ├── email/           # Transactional email delivery (optional)
│   │   ├── stripe/          # Billing and webhook logic (optional)
│   │   └── supabase/        # Browser, server, middleware, and admin clients
│   ├── instrumentation.ts   # Server monitoring setup
│   └── proxy.ts             # Session refresh and protected-route handling
├── supabase/
│   ├── migrations/          # Profiles plus optional billing schema
│   ├── tests/database/      # pgTAP database tests
│   ├── config.toml
│   └── seed.sql
├── tests/e2e/               # Playwright journeys
├── .env.example
├── package.json
└── README.md
```

The selected package manager determines which lockfile remains. Generated
runtime/build artifacts such as `.next`, `node_modules`, test reports, local
environment files, and TypeScript build state are never copied from the source
template.

## Examples

Run the full interactive flow:

```bash
npx create-morrowkit@latest
```

Create the default stack non-interactively with pnpm:

```bash
npx create-morrowkit@latest my-app --yes
```

Create a lightweight app without billing, email, or analytics, and leave
dependency installation and Git initialization for later:

```bash
npx create-morrowkit@latest my-app \
  --no-stripe \
  --no-email \
  --no-analytics \
  --no-install \
  --no-git \
  --yes
```

Generate with npm while keeping every optional module:

```bash
npx create-morrowkit@latest my-app \
  --package-manager npm \
  --stripe \
  --email \
  --analytics posthog \
  --yes
```

Use `--flag=value` syntax in CI:

```bash
npx create-morrowkit@latest "$APP_DIRECTORY" \
  --package-manager=pnpm \
  --analytics=none \
  --no-install \
  --no-git \
  --yes
```

Run the CLI from this monorepo while developing it:

```bash
pnpm cli -- my-app --no-install --no-git --yes
```

Build the publishable CLI package with `pnpm build` from the repository root.

## Support

Report bugs and request features in the
[MorrowKit issue tracker](https://github.com/JairoRaudaDev/MorrowKit/issues).

## License

`create-morrowkit` is available under the [MIT License](LICENSE).
