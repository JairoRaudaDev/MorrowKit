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
    git: true,
    install: true,
    packageManager: "pnpm",
    target: undefined,
    yes: false,
  };

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--yes" || argument === "-y") options.yes = true;
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
    return { ...defaults, git, install, packageManager, target };
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
    configureProject(result.target, result.name, options.packageManager);
    finishProject(result.target, options);
    console.log(`Created ${result.name} in ${result.target}`);
    console.log(`Next: cd ${result.name} && ${options.packageManager} setup`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
