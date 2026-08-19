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

import { configureProject, createApp, finishProject } from "../src/index.mjs";

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
