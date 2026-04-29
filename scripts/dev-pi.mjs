#!/usr/bin/env node
// dev-pi.mjs — Build pi themes then symlink to pi's global config directory.
//
// Usage:
//   node dev-pi.mjs      -> build + link
//   npm run dev:pi        -> same

import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "..", "extras", "pi");
const destDir = path.join(homedir(), ".pi", "agent", "themes");

// 1. Build
execSync("node build-pi.mjs", { cwd: __dirname, stdio: "inherit" });

// 2. Link
fs.mkdirSync(destDir, { recursive: true });

for (const file of fs.readdirSync(srcDir)) {
  if (!file.endsWith(".json")) continue;
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  try { fs.unlinkSync(dest); } catch { /* not exists */ }
  fs.symlinkSync(src, dest);
  console.log(`linked ${file} -> ${dest}`);
}

console.log("\nPi themes linked. Select via /settings or set \"theme\" in settings.json.");
