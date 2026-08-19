#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { basename, dirname, resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const entryDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(entryDirectory, "..");
const packagedTemplate = resolve(packageRoot, "template");
const workspaceTemplate = resolve(packageRoot, "../../apps/template");
const templateRoot =
  basename(entryDirectory) === "dist" ? packagedTemplate : workspaceTemplate;
const excludedTemplateEntries = new Set([
  ".env",
  ".env.local",
  ".next",
  "node_modules",
  "playwright-report",
  "test-results",
  "tsconfig.tsbuildinfo",
]);

export function createApp(targetArgument, cwd = process.cwd()) {
  if (typeof targetArgument !== "string" || targetArgument.trim() === "") {
    throw new Error("Please provide a project directory.");
  }

  const workingDirectory = resolve(cwd);
  const target = resolve(workingDirectory, targetArgument);
  if (target === workingDirectory) {
    throw new Error(
      "Choose a new project directory instead of the current directory.",
    );
  }
  if (existsSync(target)) {
    if (!lstatSync(target).isDirectory()) {
      throw new Error(`The target path is not a directory: ${target}`);
    }
    if (readdirSync(target).length > 0) {
      throw new Error(`The target directory is not empty: ${target}`);
    }
  }
  if (!existsSync(templateRoot)) {
    throw new Error(
      "The packaged MorrowKit template is missing. Run the CLI build first.",
    );
  }

  mkdirSync(target, { recursive: true });
  cpSync(templateRoot, target, {
    recursive: true,
    filter: (source) =>
      !excludedTemplateEntries.has(source.split(/[\\/]/u).at(-1)),
  });
  const packagedGitignore = resolve(target, "_gitignore");
  if (existsSync(packagedGitignore)) {
    renameSync(packagedGitignore, resolve(target, ".gitignore"));
  }
  return { name: basename(target), target };
}

const stripeModulePaths = [
  "src/app/api/stripe",
  "src/app/dashboard/billing",
  "src/app/dashboard/insights",
  "src/app/pricing",
  "src/lib/stripe",
  "src/lib/entitlements.logic.test.ts",
  "src/lib/entitlements.logic.ts",
  "src/lib/entitlements.ts",
  "src/lib/premium-insights.ts",
  "supabase/migrations/20260814010000_create_billing_tables.sql",
  "supabase/migrations/20260814020000_add_stripe_webhook_processing.sql",
  "supabase/tests/database/auth_profile_subscription.test.sql",
  "supabase/tests/database/rls_policies.test.sql",
  "tests/e2e/pricing.spec.ts",
  "docs/production-deployment.md",
  "pnpm-lock.yaml",
];

const emailModulePaths = ["src/emails", "src/lib/email", "pnpm-lock.yaml"];

const analyticsModulePaths = ["src/lib/analytics", "pnpm-lock.yaml"];

function replaceFile(target, relativePath, transform) {
  const path = resolve(target, relativePath);
  writeFileSync(path, transform(readFileSync(path, "utf8")));
}

export function removeStripeModule(target) {
  for (const relativePath of stripeModulePaths) {
    rmSync(resolve(target, relativePath), { force: true, recursive: true });
  }

  const packageJsonPath = resolve(target, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  delete packageJson.dependencies?.stripe;
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

  replaceFile(
    target,
    "README.md",
    () => `# MorrowKit application

A production-oriented Next.js application with Supabase authentication, a
protected dashboard, transactional email, analytics, monitoring, and tests.

## Get started

1. Run \`pnpm setup\` and follow the prompts.
2. Start the app with \`pnpm dev\`.
3. Open \`http://localhost:3000\`.

Copy \`.env.example\` to \`.env.local\` when configuring the application
manually. Keep all server secrets out of source control and browser-exposed
environment variables.

## Commands

- \`pnpm dev\` — start local development.
- \`pnpm typecheck\` — check TypeScript.
- \`pnpm lint\` — run ESLint.
- \`pnpm test\` — run unit tests.
- \`pnpm test:e2e\` — run browser tests.
- \`pnpm test:db\` — run database tests.
`,
  );

  replaceFile(target, ".env.example", (source) =>
    source
      .split(/\r?\n/u)
      .filter((line) => !line.startsWith("STRIPE_"))
      .join("\n"),
  );

  replaceFile(target, "src/components/marketing.tsx", (source) =>
    source
      .replace(/import \{ createCheckoutSession \}[^\n]+\n/u, "")
      .replace(/import \{ ActionForm \}[^\n]+\n/u, "")
      .replace(/^\s*Check,\r?\n/mu, "")
      .replace(
        `          <Link
            className="transition-colors hover:text-foreground"
            href="/pricing"
          >
            Pricing
          </Link>
`,
        "",
      )
      .replace(
        `            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
`,
        "",
      )
      .replace(
        `          <Link className="hover:text-foreground" href="/pricing">
            Pricing
          </Link>
`,
        "",
      )
      .replace(
        /\nexport function Pricing\(\)[\s\S]*?\nexport function Footer\(\)/u,
        "\nexport function Footer()",
      ),
  );

  replaceFile(target, "src/components/dashboard-shell.tsx", (source) =>
    source
      .replace(/^\s*(ChartNoAxesCombined|CreditCard),\r?\n/gmu, "")
      .replace(
        /\n\s*\{\n\s*href: "\/dashboard\/insights",[\s\S]*?\n\s*\},/u,
        "",
      )
      .replace(/\n\s*\{ href: "\/dashboard\/billing"[^\n]+\n/u, "")
      .replace(
        /\n\s*<DropdownMenuItem asChild>\s*<Link href="\/dashboard\/billing">[\s\S]*?<\/DropdownMenuItem>/u,
        "",
      ),
  );

  replaceFile(
    target,
    "src/config/product.ts",
    () => `export const productConfig = {
  name: "MorrowKit",
  description: "Build what matters",
  companyName: "MorrowKit",
  dashboardLabel: "Workspace",
} as const;
`,
  );

  replaceFile(target, "src/lib/db/queries.ts", (source) =>
    source
      .replace(/\nexport type Subscription =[\s\S]*?\n\}>;\n/u, "")
      .replace(
        /\n\/\*\* Returns the user's most recently updated subscription[\s\S]*$/u,
        "\n",
      ),
  );

  replaceFile(
    target,
    "src/lib/analytics/events.ts",
    () => `export type AnalyticsEvents = {
  user_signed_up: {
    userId?: string;
  };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

export type AnalyticsEvent<
  Name extends AnalyticsEventName = AnalyticsEventName,
> = {
  [EventName in Name]: {
    name: EventName;
    properties: AnalyticsEvents[EventName];
  };
}[Name];
`,
  );

  replaceFile(
    target,
    "supabase/migrations/20260815000000_harden_rls_privileges.sql",
    (source) =>
      source.replace(
        /\nrevoke all on table public\.billing_customers[\s\S]*?(?=\n-- This trigger helper)/u,
        "\n",
      ),
  );

  replaceFile(target, "playwright.config.ts", (source) =>
    source.replace(
      /\n\s*STRIPE_SECRET_KEY:[\s\S]*?"price_playwright_business",/u,
      "",
    ),
  );

  replaceFile(target, "tests/e2e/public-site.spec.ts", (source) =>
    source.replace(
      /\n\s*await page\.getByRole\("link", \{ name: "View pricing" \}\)[\s\S]*?\)\.toBeVisible\(\);/u,
      "",
    ),
  );
}

export function removeEmailModule(target) {
  for (const relativePath of emailModulePaths) {
    rmSync(resolve(target, relativePath), { force: true, recursive: true });
  }

  const packageJsonPath = resolve(target, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  delete packageJson.dependencies?.["react-email"];
  delete packageJson.dependencies?.resend;
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

  replaceFile(target, ".env.example", (source) =>
    source
      .split(/\r?\n/u)
      .filter(
        (line) =>
          !line.startsWith("RESEND_API_KEY=") &&
          !line.startsWith("EMAIL_FROM=") &&
          line !== "# Transactional email (required in production)",
      )
      .join("\n"),
  );

  replaceFile(target, "README.md", (source) =>
    source
      .replace(", billing, email, analytics", ", billing, analytics")
      .replace(", transactional email, analytics", ", analytics")
      .replace(/^.*\*\*Email:\*\*.*\r?\n/mu, "")
      .replace(/^\| Email\s+\|.*\r?\n/mu, "")
      .replace(" or email\nprovider", "\nprovider")
      .replace(/\n### Production email[\s\S]*?(?=\n### Optional services)/u, "")
      .replace(/\n## Email[\s\S]*?(?=\n## Development)/u, "")
      .replace(", email, monitoring", ", monitoring")
      .replace(/^\s*├─ Resend .*\r?\n/mu, "")
      .replace(
        "- `src/lib/email/`, `src/emails/`, and `src/lib/analytics/`: provider boundaries and domain events.",
        "- `src/lib/analytics/`: provider boundary and domain events.",
      ),
  );

  replaceFile(target, "docs/production-deployment.md", (source) =>
    source
      .replace(
        "This is separate from the application's Resend integration.",
        "",
      )
      .replace(/^.*`EMAIL_FROM`.*\r?\n/gmu, "")
      .replace(/^\| `RESEND_API_KEY`.*\r?\n/mu, "")
      .replace(/^\| `EMAIL_FROM`.*\r?\n/mu, ""),
  );
}

export function removeAnalyticsModule(target) {
  for (const relativePath of analyticsModulePaths) {
    rmSync(resolve(target, relativePath), { force: true, recursive: true });
  }

  const packageJsonPath = resolve(target, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  delete packageJson.dependencies?.["posthog-node"];
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

  replaceFile(target, ".env.example", (source) =>
    source
      .split(/\r?\n/u)
      .filter(
        (line) =>
          !line.startsWith("POSTHOG_") &&
          line !==
            "# Analytics (optional; disabled when POSTHOG_API_KEY is unset)",
      )
      .join("\n"),
  );

  for (const relativePath of [
    "src/app/auth/actions.ts",
    "src/app/pricing/actions.ts",
    "src/lib/stripe/webhook.ts",
  ]) {
    const path = resolve(target, relativePath);
    if (!existsSync(path)) continue;
    replaceFile(target, relativePath, (source) =>
      source
        .replace(
          /import \{ track \} from "@\/lib\/analytics\/track";\r?\n/u,
          "",
        )
        .replace(/^\s*await track\([^;]+;\r?\n/gmu, ""),
    );
  }

  replaceFile(target, "README.md", (source) =>
    source
      .replace(", email, analytics, and deployment", ", email, and deployment")
      .replace(
        ", transactional email, analytics, monitoring",
        ", transactional email, monitoring",
      )
      .replace(/^\| `POSTHOG_API_KEY`.*\r?\n/mu, "")
      .replace(/^\| `POSTHOG_HOST`.*\r?\n/mu, "")
      .replace(
        ", monitoring, analytics, legal pages",
        ", monitoring, legal pages",
      )
      .replace(/^\s*├─ PostHog .*\r?\n/mu, "")
      .replace(", and `src/lib/analytics/`", "")
      .replace(" and domain events.", ".")
      .split(/\r?\n/u)
      .filter((line) => !/analytics|posthog|POSTHOG_/iu.test(line))
      .join("\n"),
  );

  replaceFile(target, "docs/production-deployment.md", (source) =>
    source
      .replace(", analytics, and monitoring", ", and monitoring")
      .replace("### Monitoring and analytics", "### Monitoring")
      .replace(/^.*Product analytics.*\r?\n/gmu, "")
      .replace(/^.*analytics events.*\r?\n/gmu, "")
      .replace(/^.*configured analytics.*\r?\n/gmu, "")
      .split(/\r?\n/u)
      .filter((line) => !/analytics|posthog|POSTHOG_/iu.test(line))
      .join("\n"),
  );
}

const packageManagers = ["pnpm", "npm", "yarn", "bun"];

function normalizePackageName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

export function configureProject(target, name, packageManager) {
  const packageJsonPath = resolve(target, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  packageJson.name = normalizePackageName(name) || "morrowkit-app";
  if (packageManager !== "pnpm") delete packageJson.packageManager;
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

  for (const [manager, lockfile] of [
    ["pnpm", "pnpm-lock.yaml"],
    ["npm", "package-lock.json"],
    ["yarn", "yarn.lock"],
    ["bun", "bun.lock"],
  ]) {
    if (manager !== packageManager) {
      rmSync(resolve(target, lockfile), { force: true });
    }
  }
}

function runCommand(command, arguments_, cwd) {
  const result = spawnSync(command, arguments_, {
    cwd,
    encoding: "utf8",
    shell: process.platform === "win32",
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${arguments_.join(" ")}`);
  }
}

export function finishProject(
  target,
  { packageManager = "pnpm", install = true, git = true } = {},
  commandRunner = runCommand,
) {
  if (install) commandRunner(packageManager, ["install"], target);
  if (git) commandRunner("git", ["init"], target);
}

function parseArguments(arguments_) {
  const options = {
    analytics: "posthog",
    git: true,
    install: true,
    packageManager: "pnpm",
    email: true,
    target: undefined,
    stripe: true,
    yes: false,
  };

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--yes" || argument === "-y") options.yes = true;
    else if (argument === "--no-analytics") options.analytics = "none";
    else if (argument === "--analytics") {
      options.analytics = arguments_[index + 1];
      index += 1;
    } else if (argument === "--no-email") options.email = false;
    else if (argument === "--no-stripe") options.stripe = false;
    else if (argument === "--no-install") options.install = false;
    else if (argument === "--no-git") options.git = false;
    else if (argument === "--package-manager") {
      options.packageManager = arguments_[index + 1];
      index += 1;
    } else if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    } else if (options.target) {
      throw new Error("Accepts one project directory.");
    } else options.target = argument;
  }

  if (!packageManagers.includes(options.packageManager)) {
    throw new Error(
      `Package manager must be one of: ${packageManagers.join(", ")}.`,
    );
  }
  if (!["posthog", "none"].includes(options.analytics)) {
    throw new Error("Analytics provider must be one of: posthog, none.");
  }
  return options;
}

function parseYesNo(value, defaultValue) {
  const answer = value.trim().toLowerCase();
  if (!answer) return defaultValue;
  return answer === "y" || answer === "yes";
}

async function promptForOptions(defaults) {
  const prompts = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    const target =
      (await prompts.question(`Project name? (${defaults.target}) `)).trim() ||
      defaults.target;
    const managerAnswer = (
      await prompts.question(
        `Package manager? (${packageManagers.join("/")}) [${defaults.packageManager}] `,
      )
    )
      .trim()
      .toLowerCase();
    const packageManager = managerAnswer || defaults.packageManager;
    if (!packageManagers.includes(packageManager)) {
      throw new Error(
        `Package manager must be one of: ${packageManagers.join(", ")}.`,
      );
    }
    const git = parseYesNo(
      await prompts.question("Initialize git? (Y/n) "),
      true,
    );
    const install = parseYesNo(
      await prompts.question("Install dependencies? (Y/n) "),
      true,
    );
    const stripe = parseYesNo(
      await prompts.question("Include Stripe? (Y/n) "),
      true,
    );
    const email = parseYesNo(
      await prompts.question("Include transactional email? (Y/n) "),
      true,
    );
    const analyticsAnswer = (
      await prompts.question("Analytics provider? (posthog/none) [posthog] ")
    )
      .trim()
      .toLowerCase();
    const analytics = analyticsAnswer || defaults.analytics;
    if (!["posthog", "none"].includes(analytics)) {
      throw new Error("Analytics provider must be one of: posthog, none.");
    }
    return {
      ...defaults,
      analytics,
      email,
      git,
      install,
      packageManager,
      stripe,
      target,
    };
  } finally {
    prompts.close();
  }
}

function printHelp() {
  console.log(`Usage: create-morrowkit [project-directory] [options]

Create a new application from the MorrowKit template.

Options:
  -y, --yes                    Use defaults without prompting
  --package-manager <manager> pnpm, npm, yarn, or bun (default: pnpm)
  --no-install                Skip dependency installation
  --no-git                    Skip Git initialization
  --no-stripe                 Exclude Stripe and billing features
  --no-email                  Exclude transactional email features
  --analytics <provider>      posthog or none (default: posthog)
  --no-analytics              Exclude analytics (alias for --analytics none)
  -h, --help                  Show help`);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const arguments_ = process.argv.slice(2);
  if (arguments_.includes("--help") || arguments_.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  try {
    const defaults = parseArguments(arguments_);
    defaults.target ||= "morrowkit-app";
    const interactive =
      process.stdin.isTTY && process.stdout.isTTY && !defaults.yes;
    const options = interactive ? await promptForOptions(defaults) : defaults;
    const result = createApp(options.target);
    if (!options.stripe) removeStripeModule(result.target);
    if (!options.email) removeEmailModule(result.target);
    if (options.analytics === "none") removeAnalyticsModule(result.target);
    configureProject(result.target, result.name, options.packageManager);
    finishProject(result.target, options);
    console.log(`Created ${result.name} in ${result.target}`);
    console.log(`Next: cd ${result.name} && ${options.packageManager} setup`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
