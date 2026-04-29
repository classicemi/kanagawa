# AGENTS.md

## Build & generation

```
npm run build              # or: node scripts/build.mjs
node scripts/build.mjs --dry-run   # preview counts without writing files

# Pi agent themes
npm run build:pi           # or: node scripts/build-pi.mjs
npm run dev:pi             # build + symlink to ~/.pi/agent/themes/
node scripts/build-pi.mjs --dry-run
```

Theme JSONs in `themes/` are **generated output**. Never edit them directly.
Pi theme JSONs in `extras/pi/` are also generated — edit the mapping in `lib/pi-theme.mjs` instead.

To package a `.vsix`:

```
npx @vscode/vsce package
```

## Architecture

```
lib/
  palette.mjs        # raw hex palette (ported from lua/kanagawa/colors.lua)
  themes.mjs         # wave / dragon / lotus variant composition
  vscode-theme.mjs   # semantic slots → VSCode theme JSON (workbench + tokens)
  pi-theme.mjs       # semantic slots → pi agent theme JSON (51 color tokens)
scripts/
  build.mjs          # orchestrator: runs all 3 variants × 2 (italics / no-italics)
  build-pi.mjs       # orchestrator: runs all 3 variants → pi agent JSONs
  dev-pi.mjs         # build-pi.mjs + symlink to ~/.pi/agent/themes/
themes/              # generated VSCode output (6 JSON files)
extras/
  pi/                # generated pi agent output (3 JSON files)
```

## Where to make changes

| Goal | Edit |
|------|------|
| Change a color value | `lib/palette.mjs` |
| Reassign which color fills a semantic slot (bg, fg, etc.) | `lib/themes.mjs` |
| Add or tweak token/syntax scopes or workbench colors | `lib/vscode-theme.mjs` |
| Adjust pi agent color mapping | `lib/pi-theme.mjs` |

After any change, run `npm run build` to regenerate the theme JSONs.

## Context

- This is a port of [kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim). Palette values track the upstream Lua sources.
- Italics are applied to comments and keywords by default. Each variant has a `(No Italics)` twin generated from the same source with `italics: false`.
- `semanticTokenColors` is intentionally not set — falls back to TextMate scopes for consistent cross-language rendering.
- `.vsix` files are gitignored.
- No tests, no lint, no CI in this repo.
