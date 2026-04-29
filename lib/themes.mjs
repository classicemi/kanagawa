// Theme variant composition — ported from lua/kanagawa/themes.lua
//
// Each variant function receives the full palette and returns an object of
// semantic color slots organized into ui, syn, diag, diff, vcs, and term.
// The VSCode template then uses these slots to generate theme JSONs.

import palette from './palette.mjs';

/**
 * Wave variant (dark, blue-tinged)
 * @param {import('./palette.mjs').default} p
 */
export function wave(p) {
  return {
    ui: {
      fg:         p.fujiWhite,
      fg_dim:     p.oldWhite,
      fg_reverse: p.waveBlue1,

      bg_dim:     p.sumiInk1,
      bg_gutter:  p.sumiInk4,

      bg_m3:      p.sumiInk0,
      bg_m2:      p.sumiInk1,
      bg_m1:      p.sumiInk2,
      bg:         p.sumiInk3,
      bg_p1:      p.sumiInk4,
      bg_p2:      p.sumiInk5,

      special:    p.springViolet1,
      nontext:    p.sumiInk6,
      whitespace: p.sumiInk6,

      bg_search:  p.waveBlue2,
      bg_visual:  p.waveBlue1,

      pmenu: {
        fg:       p.fujiWhite,
        fg_sel:   "none",
        bg:       p.waveBlue1,
        bg_sel:   p.waveBlue2,
        bg_sbar:  p.waveBlue1,
        bg_thumb: p.waveBlue2,
      },
      float: {
        fg:        p.oldWhite,
        bg:        p.sumiInk0,
        fg_border: p.sumiInk6,
        bg_border: p.sumiInk0,
      },
    },
    syn: {
      string:     p.springGreen,
      variable:   "none",
      number:     p.sakuraPink,
      constant:   p.surimiOrange,
      identifier: p.carpYellow,
      parameter:  p.oniViolet2,
      fun:        p.crystalBlue,
      statement:  p.oniViolet,
      keyword:    p.oniViolet,
      operator:   p.boatYellow2,
      preproc:    p.waveRed,
      type:       p.waveAqua2,
      regex:      p.boatYellow2,
      deprecated: p.katanaGray,
      comment:    p.fujiGray,
      punct:      p.springViolet2,
      special1:   p.springBlue,
      special2:   p.waveRed,
      special3:   p.peachRed,
    },
    vcs: {
      added:   p.autumnGreen,
      removed: p.autumnRed,
      changed: p.autumnYellow,
    },
    diff: {
      add:    p.winterGreen,
      delete: p.winterRed,
      change: p.winterBlue,
      text:   p.winterYellow,
    },
    diag: {
      ok:      p.springGreen,
      error:   p.samuraiRed,
      warning: p.roninYellow,
      info:    p.dragonBlue,
      hint:    p.waveAqua1,
    },
    term: [
      p.sumiInk0,        // black
      p.autumnRed,       // red
      p.autumnGreen,     // green
      p.boatYellow2,     // yellow
      p.crystalBlue,     // blue
      p.oniViolet,       // magenta
      p.waveAqua1,       // cyan
      p.oldWhite,        // white
      p.fujiGray,        // bright black
      p.samuraiRed,      // bright red
      p.springGreen,     // bright green
      p.carpYellow,      // bright yellow
      p.springBlue,      // bright blue
      p.springViolet1,   // bright magenta
      p.waveAqua2,       // bright cyan
      p.fujiWhite,       // bright white
      p.surimiOrange,    // extended color 1
      p.peachRed,        // extended color 2
    ],
  };
}

/**
 * Dragon variant (dark, warm/muted)
 * @param {import('./palette.mjs').default} p
 */
export function dragon(p) {
  return {
    ui: {
      fg:         p.dragonWhite,
      fg_dim:     p.oldWhite,
      fg_reverse: p.waveBlue1,

      bg_dim:     p.dragonBlack1,
      bg_gutter:  p.dragonBlack4,

      bg_m3:      p.dragonBlack0,
      bg_m2:      p.dragonBlack1,
      bg_m1:      p.dragonBlack2,
      bg:         p.dragonBlack3,
      bg_p1:      p.dragonBlack4,
      bg_p2:      p.dragonBlack5,

      special:    p.dragonGray3,
      whitespace: p.dragonBlack6,
      nontext:    p.dragonBlack6,

      bg_visual:  p.waveBlue1,
      bg_search:  p.waveBlue2,

      pmenu: {
        fg:       p.fujiWhite,
        fg_sel:   "none",
        bg:       p.waveBlue1,
        bg_sel:   p.waveBlue2,
        bg_thumb: p.waveBlue2,
        bg_sbar:  p.waveBlue1,
      },
      float: {
        fg:        p.oldWhite,
        bg:        p.dragonBlack0,
        fg_border: p.sumiInk6,
        bg_border: p.dragonBlack0,
      },
    },
    syn: {
      string:     p.dragonGreen2,
      variable:   "none",
      number:     p.dragonPink,
      constant:   p.dragonOrange,
      identifier: p.dragonYellow,
      parameter:  p.dragonGray,
      fun:        p.dragonBlue2,
      statement:  p.dragonViolet,
      keyword:    p.dragonViolet,
      operator:   p.dragonRed,
      preproc:    p.dragonRed,
      type:       p.dragonAqua,
      regex:      p.dragonRed,
      deprecated: p.katanaGray,
      punct:      p.dragonGray2,
      comment:    p.dragonAsh,
      special1:   p.dragonTeal,
      special2:   p.dragonRed,
      special3:   p.dragonRed,
    },
    diag: {
      error:   p.samuraiRed,
      ok:      p.springGreen,
      warning: p.roninYellow,
      info:    p.dragonBlue,
      hint:    p.waveAqua1,
    },
    diff: {
      add:    p.winterGreen,
      delete: p.winterRed,
      change: p.winterBlue,
      text:   p.winterYellow,
    },
    vcs: {
      added:   p.autumnGreen,
      removed: p.autumnRed,
      changed: p.autumnYellow,
    },
    term: [
      p.dragonBlack0,   // black
      p.dragonRed,      // red
      p.dragonGreen2,   // green
      p.dragonYellow,   // yellow
      p.dragonBlue2,    // blue
      p.dragonPink,     // magenta
      p.dragonAqua,     // cyan
      p.oldWhite,       // white
      p.dragonGray,     // bright black
      p.waveRed,        // bright red
      p.dragonGreen,    // bright green
      p.carpYellow,     // bright yellow
      p.springBlue,     // bright blue
      p.springViolet1,  // bright magenta
      p.waveAqua2,      // bright cyan
      p.dragonWhite,    // bright white
      p.dragonOrange,   // extended color 1
      p.dragonOrange2,  // extended color 2
    ],
  };
}

/**
 * Lotus variant (light)
 * @param {import('./palette.mjs').default} p
 */
export function lotus(p) {
  return {
    ui: {
      fg:         p.lotusInk1,
      fg_dim:     p.lotusInk2,
      fg_reverse: p.lotusGray,

      bg_dim:     p.lotusWhite1,
      bg_gutter:  p.lotusWhite4,

      bg_m3:      p.lotusWhite0,
      bg_m2:      p.lotusWhite1,
      bg_m1:      p.lotusWhite2,
      bg:         p.lotusWhite3,
      bg_p1:      p.lotusWhite4,
      bg_p2:      p.lotusWhite5,

      nontext:    p.lotusViolet1,
      whitespace: p.lotusViolet1,
      special:    p.lotusViolet2,

      bg_visual:  p.lotusViolet3,
      bg_search:  p.lotusBlue2,

      pmenu: {
        fg:       p.lotusInk2,
        fg_sel:   "none",
        bg:       p.lotusBlue1,
        bg_sel:   p.lotusBlue3,
        bg_sbar:  p.lotusBlue1,
        bg_thumb: p.lotusBlue2,
      },
      float: {
        fg:        p.lotusInk2,
        bg:        p.lotusWhite0,
        fg_border: p.lotusGray2,
        bg_border: p.lotusWhite0,
      },
    },
    syn: {
      string:     p.lotusGreen,
      variable:   "none",
      number:     p.lotusPink,
      constant:   p.lotusOrange,
      identifier: p.lotusYellow,
      parameter:  p.lotusBlue5,
      fun:        p.lotusBlue4,
      statement:  p.lotusViolet4,
      keyword:    p.lotusViolet4,
      operator:   p.lotusYellow2,
      preproc:    p.lotusRed,
      type:       p.lotusAqua,
      regex:      p.lotusYellow2,
      deprecated: p.lotusGray3,
      comment:    p.lotusGray3,
      punct:      p.lotusTeal1,
      special1:   p.lotusTeal2,
      special2:   p.lotusRed,
      special3:   p.lotusRed,
    },
    vcs: {
      added:   p.lotusGreen2,
      removed: p.lotusRed2,
      changed: p.lotusYellow3,
    },
    diff: {
      add:    p.lotusGreen3,
      delete: p.lotusRed4,
      change: p.lotusCyan,
      text:   p.lotusYellow4,
    },
    diag: {
      error:   p.lotusRed3,
      ok:      p.lotusGreen,
      warning: p.lotusOrange2,
      info:    p.lotusTeal3,
      hint:    p.lotusAqua2,
    },
    term: [
      p.sumiInk3,       // black
      p.lotusRed,       // red
      p.lotusGreen,     // green
      p.lotusYellow,    // yellow
      p.lotusBlue4,     // blue
      p.lotusPink,      // magenta
      p.lotusAqua,      // cyan
      p.lotusInk1,      // white
      p.lotusGray3,     // bright black
      p.lotusRed2,      // bright red
      p.lotusGreen2,    // bright green
      p.lotusYellow2,   // bright yellow
      p.lotusTeal2,     // bright blue
      p.lotusViolet4,   // bright magenta
      p.lotusAqua2,     // bright cyan
      p.lotusInk2,      // bright white
      p.lotusOrange2,   // extended color 1
      p.lotusRed3,      // extended color 2
    ],
  };
}

/**
 * Compose theme: deep-merge user overrides on top of a base variant.
 *
 * mirrors the behavior of lua/kanagawa/colors.lua M.setup():
 *   1. merge palette overrides
 *   2. invoke variant function with updated palette
 *   3. deep-merge theme overrides (all + [variant])
 *
 * @param {"wave"|"dragon"|"lotus"} variant
 * @param {{ palette?: Record<string,string>, theme?: Record<string,any> }} [overrides]
 * @returns {{ palette: Record<string,string>, theme: ReturnType<wave|dragon|lotus> }}
 */
export function compose(variant, overrides = {}) {
  // copy palette so we don't mutate the defaults
  const p = { ...palette, ...(overrides.palette || {}) };

  const themeFns = { wave, dragon, lotus };
  const base = themeFns[variant](p);

  // deep-merge theme overrides: "all" first, then variant-specific
  const allOverrides = overrides.theme?.all || {};
  const variantOverrides = overrides.theme?.[variant] || {};

  return {
    palette: p,
    theme: deepMerge(deepMerge(base, allOverrides), variantOverrides),
  };
}

// simple recursive deep merge (objects only, no arrays)
function deepMerge(base, overrides) {
  const result = { ...base };
  for (const key of Object.keys(overrides)) {
    if (isPlainObject(overrides[key]) && isPlainObject(result[key])) {
      result[key] = deepMerge(result[key], overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
