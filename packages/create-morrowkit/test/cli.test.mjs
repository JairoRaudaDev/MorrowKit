import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  configureProject,
  createApp,
  finishProject,
  removeEmailModule,
  removeAnalyticsModule,
  removeStripeModule,
} from "../src/index.mjs";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = join(packageRoot, "src", "index.mjs");

test("creates a project from the packaged template", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));

  try {
    const result = createApp("example", workspace);
    const packageJson = JSON.parse(
      readFileSync(join(result.target, "package.json"), "utf8"),
    );
    assert.equal(packageJson.name, "morrowkit");
    assert.equal(packageJson.scripts.dev, "next dev");
    assert.equal(
      existsSync(join(result.target, "src", "app", "page.tsx")),
      true,
    );
    assert.equal(existsSync(join(result.target, ".env.example")), true);
    assert.equal(existsSync(join(result.target, ".gitignore")), true);
    assert.equal(existsSync(join(result.target, "node_modules")), false);
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});

test("accepts an existing empty directory", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));
  const target = join(workspace, "example");
  mkdirSync(target);

  try {
    createApp(target, workspace);
    assert.equal(existsSync(join(target, "package.json")), true);
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});

test("configures the project name and package manager", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));
  try {
    const result = createApp("My App", workspace);
    configureProject(result.target, result.name, "npm");
    const packageJson = JSON.parse(
      readFileSync(join(result.target, "package.json"), "utf8"),
    );
    assert.equal(packageJson.name, "my-app");
    assert.equal(packageJson.packageManager, undefined);
    assert.equal(existsSync(join(result.target, "pnpm-lock.yaml")), false);
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});

test("removes the complete Stripe module when disabled", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));
  try {
    const result = createApp("without-stripe", workspace);
    removeStripeModule(result.target);

    const packageJson = JSON.parse(
      readFileSync(join(result.target, "package.json"), "utf8"),
    );
    assert.equal(packageJson.dependencies.stripe, undefined);
    assert.equal(existsSync(join(result.target, "pnpm-lock.yaml")), false);
    assert.equal(
      existsSync(join(result.target, "src", "lib", "stripe")),
      false,
    );
    assert.equal(
      existsSync(join(result.target, "src", "app", "pricing")),
      false,
    );
    assert.equal(
      existsSync(join(result.target, "src", "app", "dashboard", "billing")),
      false,
    );
    assert.doesNotMatch(
      readFileSync(join(result.target, ".env.example"), "utf8"),
      /STRIPE_/u,
    );
    assert.doesNotMatch(
      readFileSync(join(result.target, "README.md"), "utf8"),
      /billing|pricing|stripe|subscription/iu,
    );
    assert.doesNotMatch(
      readFileSync(
        join(result.target, "src", "components", "dashboard-shell.tsx"),
        "utf8",
      ),
      /billing|pricing|stripe/iu,
    );
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});

test("removes the complete transactional email module when disabled", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));
  try {
    const result = createApp("without-email", workspace);
    removeEmailModule(result.target);

    const packageJson = JSON.parse(
      readFileSync(join(result.target, "package.json"), "utf8"),
    );
    assert.equal(packageJson.dependencies["react-email"], undefined);
    assert.equal(packageJson.dependencies.resend, undefined);
    assert.equal(existsSync(join(result.target, "pnpm-lock.yaml")), false);
    assert.equal(existsSync(join(result.target, "src", "emails")), false);
    assert.equal(existsSync(join(result.target, "src", "lib", "email")), false);
    assert.doesNotMatch(
      readFileSync(join(result.target, ".env.example"), "utf8"),
      /RESEND_API_KEY|EMAIL_FROM/u,
    );
    assert.doesNotMatch(
      readFileSync(join(result.target, "README.md"), "utf8"),
      /Resend|React Email|transactional email|RESEND_API_KEY|EMAIL_FROM/iu,
    );
    assert.doesNotMatch(
      readFileSync(
        join(result.target, "docs", "production-deployment.md"),
        "utf8",
      ),
      /Resend|React Email|RESEND_API_KEY|EMAIL_FROM/iu,
    );
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});

test("removes analytics without leaving imports or environment requirements", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));
  try {
    const result = createApp("without-analytics", workspace);
    removeAnalyticsModule(result.target);

    const packageJson = JSON.parse(
      readFileSync(join(result.target, "package.json"), "utf8"),
    );
    assert.equal(packageJson.dependencies["posthog-node"], undefined);
    assert.equal(existsSync(join(result.target, "pnpm-lock.yaml")), false);
    assert.equal(
      existsSync(join(result.target, "src", "lib", "analytics")),
      false,
    );
    assert.doesNotMatch(
      readFileSync(join(result.target, ".env.example"), "utf8"),
      /POSTHOG_/u,
    );

    for (const relativePath of [
      ["src", "app", "auth", "actions.ts"],
      ["src", "app", "pricing", "actions.ts"],
      ["src", "lib", "stripe", "webhook.ts"],
    ]) {
      const source = readFileSync(join(result.target, ...relativePath), "utf8");
      assert.doesNotMatch(source, /analytics|\btrack\(/u);
    }
    assert.doesNotMatch(
      readFileSync(join(result.target, "README.md"), "utf8"),
      /PostHog|POSTHOG_|analytics/iu,
    );
    assert.doesNotMatch(
      readFileSync(
        join(result.target, "docs", "production-deployment.md"),
        "utf8",
      ),
      /PostHog|POSTHOG_|analytics/iu,
    );
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});

test("removes all optional modules together", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));
  try {
    const result = createApp("minimal", workspace);
    removeStripeModule(result.target);
    removeEmailModule(result.target);
    removeAnalyticsModule(result.target);

    const packageJson = JSON.parse(
      readFileSync(join(result.target, "package.json"), "utf8"),
    );
    assert.equal(packageJson.dependencies.stripe, undefined);
    assert.equal(packageJson.dependencies["react-email"], undefined);
    assert.equal(packageJson.dependencies.resend, undefined);
    assert.equal(packageJson.dependencies["posthog-node"], undefined);
    assert.equal(existsSync(join(result.target, "pnpm-lock.yaml")), false);
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});

test("installs dependencies and initializes Git when selected", () => {
  const calls = [];
  finishProject(
    "/project",
    { packageManager: "yarn", install: true, git: true },
    (...arguments_) => calls.push(arguments_),
  );
  assert.deepEqual(calls, [
    ["yarn", ["install"], "/project"],
    ["git", ["init"], "/project"],
  ]);
});

test("rejects missing, current, non-directory, and non-empty targets", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));
  const fileTarget = join(workspace, "file");
  const nonEmptyTarget = join(workspace, "not-empty");
  writeFileSync(fileTarget, "content");
  mkdirSync(nonEmptyTarget);
  writeFileSync(join(nonEmptyTarget, "keep.txt"), "content");

  try {
    assert.throws(
      () => createApp(undefined, workspace),
      /provide a project directory/,
    );
    assert.throws(() => createApp(".", workspace), /new project directory/);
    assert.throws(() => createApp(fileTarget, workspace), /not a directory/);
    assert.throws(() => createApp(nonEmptyTarget, workspace), /not empty/);
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});

test("CLI uses non-interactive defaults and rejects extra arguments", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));

  try {
    const created = spawnSync(
      process.execPath,
      [cliPath, "my-app", "--no-install", "--no-git"],
      {
        cwd: workspace,
        encoding: "utf8",
        timeout: 10_000,
      },
    );
    assert.equal(created.status, 0, created.stderr);
    assert.match(created.stdout, /Created my-app/);
    assert.equal(existsSync(join(workspace, "my-app", "package.json")), true);

    const withoutStripe = spawnSync(
      process.execPath,
      [cliPath, "without-stripe", "--no-stripe", "--no-install", "--no-git"],
      { cwd: workspace, encoding: "utf8", timeout: 10_000 },
    );
    assert.equal(withoutStripe.status, 0, withoutStripe.stderr);
    assert.equal(
      existsSync(join(workspace, "without-stripe", "src", "lib", "stripe")),
      false,
    );

    const withoutEmail = spawnSync(
      process.execPath,
      [cliPath, "without-email", "--no-email", "--no-install", "--no-git"],
      { cwd: workspace, encoding: "utf8", timeout: 10_000 },
    );
    assert.equal(withoutEmail.status, 0, withoutEmail.stderr);
    assert.equal(
      existsSync(join(workspace, "without-email", "src", "lib", "email")),
      false,
    );

    const withoutAnalytics = spawnSync(
      process.execPath,
      [
        cliPath,
        "without-analytics",
        "--analytics",
        "none",
        "--no-install",
        "--no-git",
      ],
      { cwd: workspace, encoding: "utf8", timeout: 10_000 },
    );
    assert.equal(withoutAnalytics.status, 0, withoutAnalytics.stderr);
    assert.equal(
      existsSync(
        join(workspace, "without-analytics", "src", "lib", "analytics"),
      ),
      false,
    );

    const invalid = spawnSync(process.execPath, [cliPath, "one", "two"], {
      cwd: workspace,
      encoding: "utf8",
      timeout: 10_000,
    });
    assert.equal(invalid.status, 1);
    assert.match(invalid.stderr, /one project directory/);
    assert.equal(existsSync(join(workspace, "one")), false);
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});
