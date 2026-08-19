# create-morrowkit

Create a new project from the MorrowKit application template.

```bash
npx create-morrowkit
```

The interactive flow asks for a project name, package manager, Git
initialization, dependency installation, and whether to include Stripe,
transactional email, and PostHog analytics. Each question has a simple default.

For scripts and CI, pass a project directory with `--yes` to accept the defaults:

```bash
npx create-morrowkit my-app --yes
```

Every interactive choice also has a non-interactive flag. Value flags accept
both `--flag value` and `--flag=value` syntax:

| Prompt                      | Flags                                         | Default    |
| --------------------------- | --------------------------------------------- | ---------- |
| Package manager             | `--package-manager=pnpm\|npm\|yarn\|bun`      | `pnpm`     |
| Install dependencies        | `--install`, `--no-install`                   | install    |
| Initialize Git              | `--git`, `--no-git`                           | initialize |
| Include Stripe              | `--stripe`, `--no-stripe`                     | include    |
| Include transactional email | `--email`, `--no-email`                       | include    |
| Analytics provider          | `--analytics=posthog\|none`, `--no-analytics` | `posthog`  |

For example, this command is suitable for a non-interactive shell:

```bash
create-morrowkit my-app \
  --stripe \
  --email \
  --analytics=posthog \
  --package-manager=pnpm
```

Use `--yes` when invoking the command from a TTY to suppress prompts for any
choices you did not specify. Disabling an integration removes its source,
dependencies, documentation, configuration, and environment variables.

Inside this repository, use `pnpm cli -- my-app` to run the source CLI and
`pnpm build` to create the publishable package contents.
