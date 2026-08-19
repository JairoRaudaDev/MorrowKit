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
import { basename, dirname, relative, resolve } from "node:path";
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

class CancellationError extends Error {
  constructor() {
    super("Cancelled.");
    this.name = "CancellationError";
  }
}

function isCancellation(error) {
  return (
    error instanceof CancellationError ||
    (error instanceof Error && error.name === "AbortError")
  );
}

export function createApp(targetArgument, cwd = process.cwd()) {
  if (typeof targetArgument !== "string" || targetArgument.trim() === "") {
    throw new Error(
      "Provide a project directory, for example: create-morrowkit my-app.",
    );
  }

  const workingDirectory = resolve(cwd);
  const target = resolve(workingDirectory, targetArgument);
  if (target === workingDirectory) {
    throw new Error(
      "The project directory cannot be the current directory. Choose a new directory, such as ./my-app.",
    );
  }
  if (existsSync(target)) {
    if (!lstatSync(target).isDirectory()) {
      throw new Error(
        `The target path is not a directory: ${target}. Choose a different project directory.`,
      );
    }
    if (readdirSync(target).length > 0) {
      throw new Error(
        `The target directory is not empty: ${target}. Choose an empty directory or a different project name.`,
      );
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

  const productionDeploymentPath = resolve(
    target,
    "docs/production-deployment.md",
  );
  if (existsSync(productionDeploymentPath)) {
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

  const productionDeploymentPath = resolve(
    target,
    "docs/production-deployment.md",
  );
  if (existsSync(productionDeploymentPath)) {
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
    stdio: ["inherit", "pipe", "pipe"],
  });
  if (result.signal === "SIGINT") throw new CancellationError();
  if (result.error) {
    if (result.error.code === "ENOENT") {
      throw new Error(
        `Could not find ${command}. Install it and make sure it is available on PATH.`,
      );
    }
    throw result.error;
  }
  if (result.status !== 0) {
    const commandOutput = [result.stderr, result.stdout]
      .filter(Boolean)
      .join("\n")
      .trim()
      .split(/\r?\n/u)
      .slice(-8)
      .join("\n");
    throw new Error(
      `Command failed with exit code ${result.status}: ${command} ${arguments_.join(" ")}${commandOutput ? `\n${commandOutput}` : ""}`,
    );
  }
}

export function finishProject(
  target,
  { packageManager = "pnpm", install = true, git = true } = {},
  commandRunner = runCommand,
  progress = undefined,
) {
  if (install) {
    progress?.start("Installing dependencies");
    try {
      commandRunner(packageManager, ["install"], target);
      progress?.succeed("Dependencies installed");
    } catch (error) {
      progress?.stop(error);
      throw error;
    }
  }
  if (git) {
    progress?.start("Initializing Git");
    try {
      commandRunner("git", ["init"], target);
      progress?.succeed("Git initialized");
    } catch (error) {
      progress?.stop(error);
      throw error;
    }
  }
}

function requireOptionValue(arguments_, index, option) {
  const value = arguments_[index + 1];
  if (!value || value.startsWith("-")) {
    throw new Error(`${option} requires a value. Run with --help for usage.`);
  }
  return value;
}

export function parseArguments(arguments_) {
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
    const rawArgument = arguments_[index];
    const equalsIndex = rawArgument.startsWith("--")
      ? rawArgument.indexOf("=")
      : -1;
    const argument =
      equalsIndex === -1 ? rawArgument : rawArgument.slice(0, equalsIndex);
    const inlineValue =
      equalsIndex === -1 ? undefined : rawArgument.slice(equalsIndex + 1);
    const optionValue = () => {
      if (inlineValue !== undefined) {
        if (!inlineValue) {
          throw new Error(
            `${argument} requires a value. Run with --help for usage.`,
          );
        }
        return inlineValue;
      }
      const value = requireOptionValue(arguments_, index, argument);
      index += 1;
      return value;
    };

    if (
      inlineValue !== undefined &&
      argument !== "--analytics" &&
      argument !== "--package-manager"
    ) {
      throw new Error(
        `Unknown option: ${rawArgument}. Run with --help for usage.`,
      );
    }

    if (argument === "--yes" || argument === "-y") options.yes = true;
    else if (argument === "--no-analytics") options.analytics = "none";
    else if (argument === "--analytics") {
      options.analytics = optionValue();
    } else if (argument === "--email") options.email = true;
    else if (argument === "--no-email") options.email = false;
    else if (argument === "--stripe") options.stripe = true;
    else if (argument === "--no-stripe") options.stripe = false;
    else if (argument === "--install") options.install = true;
    else if (argument === "--no-install") options.install = false;
    else if (argument === "--git") options.git = true;
    else if (argument === "--no-git") options.git = false;
    else if (argument === "--package-manager") {
      options.packageManager = optionValue();
    } else if (argument.startsWith("-")) {
      throw new Error(
        `Unknown option: ${rawArgument}. Run with --help for usage.`,
      );
    } else if (options.target) {
      throw new Error(
        `Expected one project directory, but received "${options.target}" and "${argument}".`,
      );
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
  if (answer === "y" || answer === "yes") return true;
  if (answer === "n" || answer === "no") return false;
  return undefined;
}

async function promptForOptions(defaults) {
  const prompts = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const cancellation = new AbortController();
  prompts.on("SIGINT", () => cancellation.abort());

  const ask = async (question) => {
    try {
      return await prompts.question(question, {
        signal: cancellation.signal,
      });
    } catch (error) {
      if (cancellation.signal.aborted || isCancellation(error)) {
        throw new CancellationError();
      }
      throw error;
    }
  };

  const askChoice = async (question, choices, defaultValue) => {
    while (true) {
      const answer = (await ask(question)).trim().toLowerCase();
      const value = answer || defaultValue;
      if (choices.includes(value)) return value;
      console.error(`Please choose one of: ${choices.join(", ")}.`);
    }
  };

  const askYesNo = async (question, defaultValue) => {
    while (true) {
      const value = parseYesNo(await ask(question), defaultValue);
      if (value !== undefined) return value;
      console.error("Please answer yes or no.");
    }
  };

  try {
    const target =
      (await ask(`Project name? (${defaults.target}) `)).trim() ||
      defaults.target;
    const packageManager = await askChoice(
      `Package manager? (${packageManagers.join("/")}) [${defaults.packageManager}] `,
      packageManagers,
      defaults.packageManager,
    );
    const git = await askYesNo("Initialize git? (Y/n) ", true);
    const install = await askYesNo("Install dependencies? (Y/n) ", true);
    const stripe = await askYesNo("Include Stripe? (Y/n) ", true);
    const email = await askYesNo("Include transactional email? (Y/n) ", true);
    const analytics = await askChoice(
      "Analytics provider? (posthog/none) [posthog] ",
      ["posthog", "none"],
      defaults.analytics,
    );
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

function createProgress(output = process.stdout) {
  let pending = false;
  const replacePending = (message) => {
    if (output.isTTY && pending) output.write(`\r\u001b[2K${message}\n`);
    else output.write(`${message}\n`);
    pending = false;
  };

  return {
    start(message) {
      if (output.isTTY) {
        output.write(`\u2026 ${message}`);
        pending = true;
      }
    },
    succeed(message) {
      replacePending(`\u2714 ${message}`);
    },
    stop(error) {
      if (isCancellation(error)) {
        if (output.isTTY && pending) output.write("\r\u001b[2K");
        pending = false;
      } else {
        replacePending("\u2716 Setup failed");
      }
    },
  };
}

function shellPath(path) {
  return /\s/u.test(path) ? `"${path.replaceAll('"', '\\"')}"` : path;
}

export function nextSteps(result, options, cwd = process.cwd()) {
  const targetFromCwd = relative(resolve(cwd), result.target) || result.name;
  const steps = [
    `cd ${shellPath(targetFromCwd)}`,
    "cp .env.example .env.local",
  ];
  if (!options.install) steps.push(`${options.packageManager} install`);
  steps.push(`${options.packageManager} dev`);
  return steps;
}

function printHelp() {
  console.log(`Usage: create-morrowkit [project-directory] [options]

Create a new application from the MorrowKit template.

Options:
  -y, --yes                    Use defaults without prompting
  --package-manager <manager> pnpm, npm, yarn, or bun (default: pnpm)
  --install, --no-install     Install or skip dependencies (default: install)
  --git, --no-git             Initialize or skip Git (default: git)
  --stripe, --no-stripe       Include or exclude Stripe (default: include)
  --email, --no-email         Include or exclude email (default: include)
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
    const progress = createProgress();

    console.log("\u2600\ufe0f MorrowKit\n");
    progress.start("Creating project");
    let result;
    try {
      result = createApp(options.target);
      if (!options.stripe) removeStripeModule(result.target);
      if (!options.email) removeEmailModule(result.target);
      if (options.analytics === "none") removeAnalyticsModule(result.target);
      configureProject(result.target, result.name, options.packageManager);
      progress.succeed("Project created");
    } catch (error) {
      progress.stop(error);
      throw error;
    }

    finishProject(result.target, options, runCommand, progress);
    console.log("\nNext:\n");
    console.log(nextSteps(result, options).join("\n"));
  } catch (error) {
    if (isCancellation(error)) {
      console.log("\nCancelled.");
      process.exitCode = 130;
    } else {
      console.error(
        `\nError: ${error instanceof Error ? error.message : String(error)}`,
      );
      process.exitCode = 1;
    }
  }
}
