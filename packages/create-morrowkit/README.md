# create-morrowkit

Create a new project from the MorrowKit application template.

```bash
npx create-morrowkit
```

The interactive flow asks for a project name, package manager, dependency
installation, and Git initialization. Each question has a simple default.

For scripts and CI, pass a project directory with `--yes` to accept the defaults:

```bash
npx create-morrowkit my-app --yes
```

The non-interactive defaults use pnpm, install dependencies, and initialize Git.
Use `--package-manager`, `--no-install`, or `--no-git` to override them.

Inside this repository, use `pnpm cli -- my-app` to run the source CLI and
`pnpm build` to create the publishable package contents.
