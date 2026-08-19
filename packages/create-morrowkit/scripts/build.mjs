import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = resolve(packageRoot, "../..");
const sourceTemplate = resolve(workspaceRoot, "apps/template");
const packagedTemplate = resolve(packageRoot, "template");
const dist = resolve(packageRoot, "dist");

rmSync(packagedTemplate, { force: true, recursive: true });
rmSync(dist, { force: true, recursive: true });
mkdirSync(dist, { recursive: true });

const excluded = new Set([
  ".env",
  ".env.local",
  ".next",
  "node_modules",
  "playwright-report",
  "test-results",
  "tsconfig.tsbuildinfo",
]);

cpSync(sourceTemplate, packagedTemplate, {
  recursive: true,
  filter: (source) => !excluded.has(source.split(/[\\/]/u).at(-1)),
});
cpSync(
  resolve(sourceTemplate, ".gitignore"),
  resolve(packagedTemplate, "_gitignore"),
);
cpSync(resolve(packageRoot, "src/index.mjs"), resolve(dist, "index.mjs"));

console.log("Built create-morrowkit with the current application template.");
