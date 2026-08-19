#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  renameSync,
} from "node:fs";
import { basename, dirname, resolve } from "node:path";
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

function printHelp() {
  console.log(`Usage: create-morrowkit <project-directory>

Create a new application from the MorrowKit template.`);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const arguments_ = process.argv.slice(2);
  const argument = arguments_[0];
  if (argument === "--help" || argument === "-h") {
    printHelp();
    process.exit(0);
  }

  try {
    if (arguments_.length > 1) {
      throw new Error("Accepts exactly one project directory and no options.");
    }
    const result = createApp(argument);
    console.log(`Created ${result.name} in ${result.target}`);
    console.log(`Next: cd ${result.name} && pnpm install && pnpm setup`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
