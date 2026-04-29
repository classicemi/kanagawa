# Changelog

All notable changes to the Kanagawa VSCode theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-04-29

### Added

- `npm run build` command to regenerate all 6 theme variants from source.

### Changed

- Refactored theme generation into a build pipeline:
  - `lib/palette.mjs` — full color palette ported from `lua/kanagawa/colors.lua`.
  - `lib/themes.mjs` — wave/dragon/lotus composition functions ported from `lua/kanagawa/themes.lua`.
  - `lib/vscode-theme.mjs` — VSCode theme JSON template consuming semantic color slots.
  - `build.mjs` — orchestrator that writes the 6 variant files to `themes/`.
- Theme JSONs are now generated rather than hand-maintained; palette changes only need to be made once in `lib/palette.mjs`.

## [0.1.0] - 2026-04-27

### Added

- Initial port of [kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim) to VSCode.
- Three core variants:
  - **Kanagawa Wave** — the classic dark palette.
  - **Kanagawa Dragon** — warmer, dimmer dark variant.
  - **Kanagawa Lotus** — cream-and-ink light variant.
- Three matching **(No Italics)** variants for fonts without an italic face or for users who prefer upright type.
- Workbench/UI coloring covering editor, tabs, sidebar, activity bar, status bar, integrated terminal (ANSI 0–15), git decorations, diff editor, peek view, notifications, and lists/menus.
- Token coloring on standard TextMate scopes, with italic comments + keywords (in italic-enabled variants) and bold control-flow + escapes.
