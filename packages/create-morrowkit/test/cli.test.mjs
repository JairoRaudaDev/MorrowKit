import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { createApp } from "../src/index.mjs";

test("creates a project from the packaged template", () => {
  const workspace = mkdtempSync(join(tmpdir(), "create-morrowkit-"));

  try {
    const result = createApp("example", workspace);
    const packageJson = JSON.parse(
      readFileSync(join(result.target, "package.json"), "utf8"),
    );
    assert.equal(packageJson.name, "morrowkit");
    assert.equal(packageJson.scripts.dev, "next dev");
  } finally {
    rmSync(workspace, { force: true, recursive: true });
  }
});
