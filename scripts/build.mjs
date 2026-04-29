#!/usr/bin/env node
// build.mjs — Generate VSCode theme JSON files from the kanagawa palette & themes.
//
// Usage:
//   node build.mjs              -> writes all 6 theme JSONs to ../themes/
//   node build.mjs --dry-run    -> prints JSON summaries instead of writing files
//
// Architecture:
//   palette.mjs       full palette (port of lua/kanagawa/colors.lua)
//   themes.mjs        variant composition: wave, dragon, lotus
//                     (port of lua/kanagawa/themes.lua)
//   vscode-theme.mjs  VSCode color theme JSON template that consumes
//                     semantic slots (ui, syn, diag, diff, vcs, term)
//   build.mjs         this file — ties everything together

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import palette from "../lib/palette.mjs";
import { wave, dragon, lotus } from "../lib/themes.mjs";
import { buildTheme } from "../lib/vscode-theme.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themesDir = path.join(__dirname, "..", "themes");

const VARIANTS = [
  {
    id: "wave",
    compose: wave,
    name: "Kanagawa Wave",
    type: "dark",
  },
  {
    id: "dragon",
    compose: dragon,
    name: "Kanagawa Dragon",
    type: "dark",
  },
  {
    id: "lotus",
    compose: lotus,
    name: "Kanagawa Lotus",
    type: "light",
  },
];

function main() {
  const dryRun = process.argv.includes("--dry-run") || process.argv.includes("-n");

  if (!dryRun) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  for (const variant of VARIANTS) {
    const theme = variant.compose(palette);

    // --- with italics ---
    const json = buildTheme(palette, theme, {
      name: variant.name,
      type: variant.type,
      italics: true,
    });
    const fileName = `kanagawa-${variant.id}-color-theme.json`;
    const filePath = path.join(themesDir, fileName);

    if (dryRun) {
      console.log(`[dry-run] ${fileName}: ${countColors(json)} workbench colors, ${json.tokenColors.length} token rules`);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf-8");
      console.log(`wrote ${fileName}`);
    }

    // --- no italics ---
    const jsonNoItalics = buildTheme(palette, theme, {
      name: `${variant.name} (No Italics)`,
      type: variant.type,
      italics: false,
    });
    const noItalicsFile = `kanagawa-${variant.id}-no-italics-color-theme.json`;
    const noItalicsPath = path.join(themesDir, noItalicsFile);

    if (dryRun) {
      console.log(`[dry-run] ${noItalicsFile}: ${countColors(jsonNoItalics)} workbench colors, ${jsonNoItalics.tokenColors.length} token rules`);
    } else {
      fs.writeFileSync(noItalicsPath, JSON.stringify(jsonNoItalics, null, 2) + "\n", "utf-8");
      console.log(`wrote ${noItalicsFile}`);
    }
  }

  if (!dryRun) {
    console.log("\nDone. All theme files written to themes/");
  }
}

function countColors(json) {
  return Object.keys(json.colors || {}).length;
}

main();
