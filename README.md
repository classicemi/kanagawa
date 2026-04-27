<p align="center">
  <h2 align="center">🌊 Kanagawa for VSCode 🌊</h2>
</p>

<p align="center">
  <img src="kanagawa@2x.png" width="500" >
</p>

A port of the [kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim) colorscheme to Visual Studio Code, packaged as a minimal extension.

<p align="center">
  <h2 align="center"><img alt="Preview" src="https://github.com/user-attachments/assets/3366132c-8042-4bbb-9a49-f55167bebc62" width=1000></h2>
</p>

## Variants

| Theme            | Background | Notes                                  |
| ---------------- | ---------- | -------------------------------------- |
| Kanagawa Wave    | Dark       | The classic, default kanagawa palette. |
| Kanagawa Dragon  | Dark       | Warmer, dimmer dark variant.           |
| Kanagawa Lotus   | Light      | Cream-and-ink light variant.           |

Each variant also ships a **(No Italics)** twin (`Kanagawa Wave (No Italics)`, `Kanagawa Dragon (No Italics)`, `Kanagawa Lotus (No Italics)`) that strips `fontStyle: italic` from every token rule — useful for fonts that lack a true italic face or for users who simply prefer upright type.

All hex values are taken directly from `lua/kanagawa/colors.lua` and `lua/kanagawa/themes.lua` in the parent repository, so the VSCode look matches the Neovim original.

## Install

### Option 1 — load from this directory (no packaging)

1. In VSCode: `Cmd+Shift+P` (or `Ctrl+Shift+P`) → **Developer: Install Extension from Location…**
2. Pick this `extras/vscode/` directory.
3. `Cmd+Shift+P` → **Preferences: Color Theme** → choose *Kanagawa Wave*, *Kanagawa Dragon*, or *Kanagawa Lotus*.

### Option 2 — build a `.vsix` and install it

```sh
cd extras/vscode
npx --yes @vscode/vsce package
code --install-extension kanagawa-0.1.0.vsix
```

### Option 3 — copy the JSON only

If you only want the colors and not a full extension, copy any file under `themes/` into your own theme extension or use it as a reference for `workbench.colorCustomizations` / `editor.tokenColorCustomizations` in `settings.json`.

## Customization

VSCode users can override individual colors per theme without forking, e.g. in `settings.json`:

```jsonc
{
  "workbench.colorCustomizations": {
    "[Kanagawa Wave]": {
      "editor.background": "#181820"
    }
  },
  "editor.tokenColorCustomizations": {
    "[Kanagawa Wave]": {
      "comments": "#727169"
    }
  }
}
```

## Notes

- Token coloring uses standard TextMate scopes; `semanticTokenColors` is intentionally not set, so VSCode falls back to TextMate scopes for consistent rendering across languages.
- Italics are applied to comments and keywords (matching `commentStyle = { italic = true }` and `keywordStyle = { italic = true }` defaults from `lua/kanagawa/init.lua`).
- This port is hand-maintained alongside the Lua sources; if you tweak the palette in `lua/kanagawa/colors.lua`, update the corresponding hex values in `themes/*.json` here.
