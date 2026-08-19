# MorrowKit

MorrowKit is a small pnpm workspace containing the application template and the CLI that copies it into a new project.

```text
apps/template/                 Next.js SaaS application template
packages/create-morrowkit/    create-morrowkit CLI
```

## Development

Install dependencies once from the repository root:

```bash
pnpm install
```

Root scripts run across the workspace or forward to the template:

```bash
pnpm dev                       # run the template app
pnpm setup                     # set up the template's local Supabase stack
pnpm test                      # test every package
pnpm build                     # build the app and package the CLI
pnpm cli -- my-app             # exercise the CLI from source
```

See [apps/template/README.md](apps/template/README.md) for application setup and feature documentation.
