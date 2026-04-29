#!/usr/bin/env node
// build-pi.mjs — Generate pi agent theme JSON files from kanagawa palette & themes.
//
// Usage:
//   node build-pi.mjs           -> writes 3 theme JSONs to ../extras/pi/
//   node build-pi.mjs --dry-run -> prints preview instead of writing files
//
// Output:
//   extras/pi/kanagawa-wave.json
//   extras/pi/kanagawa-dragon.json
//   extras/pi/kanagawa-lotus.json

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import palette from "../lib/palette.mjs";
import { wave, dragon, lotus } from "../lib/themes.mjs";
import { buildPiTheme } from "../lib/pi-theme.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "extras", "pi");

const VARIANTS = [
  { id: "wave",   compose: wave,   name: "Kanagawa Wave" },
  { id: "dragon", compose: dragon, name: "Kanagawa Dragon" },
  { id: "lotus",  compose: lotus,  name: "Kanagawa Lotus" },
];

function main() {
  const dryRun = process.argv.includes("--dry-run") || process.argv.includes("-n");

  if (!dryRun) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const variant of VARIANTS) {
    const theme = variant.compose(palette);
    const json = buildPiTheme(palette, theme, {
      name: variant.name,
      id: variant.id,
    });

    const fileName = `kanagawa-${variant.id}.json`;
    const filePath = path.join(outDir, fileName);

    if (dryRun) {
      console.log(`[dry-run] ${fileName}: ${Object.keys(json.colors).length} color tokens`);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf-8");
      console.log(`wrote ${fileName}`);
    }
  }

  if (!dryRun) {
    console.log("\nDone. 3 pi theme files written to extras/pi/");
  }
}

main();
