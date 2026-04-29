// VSCode theme JSON template
//
// Given a full palette `p` and a composed theme `t` (from themes.mjs),
// returns a VSCode color theme JSON object.  Every color reference uses
// either a semantic slot (t.ui.*, t.syn.*, t.diag.*, t.diff.*, t.vcs.*,
// t.term[]) or a direct palette entry for cross-variant shared colors.

/**
 * @param {import('./palette.mjs').default} p  full palette
 * @param {ReturnType<import('./themes.mjs').wave>} t  composed theme slots
 * @param {{ name: string, type: "dark"|"light", italics?: boolean }} meta
 * @returns {object} VSCode color theme JSON
 */
export function buildTheme(p, t, meta) {
  const italics = meta.italics !== false; // default to true

  // ── helper: build token color entries ────────────────────────
  const tc = (name, scopes, foreground, fontStyle) => {
    const settings = { foreground };
    if (italics && fontStyle) {
      settings.fontStyle = fontStyle;
    } else if (!italics && fontStyle) {
      // no-italics: drop italic, keep bold/underline/strikethrough
      const stripped = fontStyle
        .split(" ")
        .filter((s) => s !== "italic")
        .join(" ");
      if (stripped) settings.fontStyle = stripped;
    }
    return {
      name,
      scope: Array.isArray(scopes) ? scopes : [scopes],
      settings,
    };
  };

  // ── workbench colors ─────────────────────────────────────────
  const colors = {
    focusBorder:            t.ui.bg_search,
    foreground:             t.ui.fg,
    descriptionForeground:  t.ui.fg_dim,
    errorForeground:        t.diag.error,
    "selection.background": t.ui.bg_search,
    "icon.foreground":      t.ui.fg_dim,
    "widget.shadow":        meta.type === "light" ? "#0000001A" : "#0000004D",

    "editor.background":                t.ui.bg,
    "editor.foreground":                t.ui.fg,
    "editor.lineHighlightBackground":   t.ui.bg_p2,
    "editor.lineHighlightBorder":       t.ui.bg_p2 + "00",
    "editor.selectionBackground":       t.ui.bg_visual,
    "editor.selectionHighlightBackground":       t.ui.bg_visual + "66",
    "editor.inactiveSelectionBackground":       t.ui.bg_visual + "88",
    "editor.findMatchBackground":               t.ui.bg_search + "99",
    "editor.findMatchHighlightBackground":      t.ui.bg_search + "66",
    "editor.findRangeHighlightBackground":      t.ui.bg_search + "44",
    "editor.wordHighlightBackground":           t.ui.bg_search + "66",
    "editor.wordHighlightStrongBackground":     t.ui.bg_search + "99",
    "editor.hoverHighlightBackground":          t.ui.bg_search + "44",
    "editor.rangeHighlightBackground":          t.ui.bg_search + "44",
    "editor.foldBackground":            t.ui.bg_p1 + "66",

    "editorCursor.foreground":          t.ui.special,
    "editorWhitespace.foreground":      t.ui.whitespace,
    "editorIndentGuide.background1":    t.ui.bg_p1,
    "editorIndentGuide.activeBackground1": t.ui.bg_p2,
    "editorRuler.foreground":           t.ui.bg_p1,
    "editorLineNumber.foreground":      t.ui.nontext,
    "editorLineNumber.activeForeground":t.ui.fg_dim,
    "editorBracketMatch.background":    t.ui.bg_p1,
    "editorBracketMatch.border":        t.ui.nontext,
    "editorBracketHighlight.foreground1": t.syn.fun,
    "editorBracketHighlight.foreground2": t.syn.statement,
    "editorBracketHighlight.foreground3": t.syn.type,
    "editorBracketHighlight.foreground4": t.syn.identifier,
    "editorBracketHighlight.foreground5": t.syn.special1,
    "editorBracketHighlight.foreground6": t.syn.number,
    "editorBracketHighlight.unexpectedBracket.foreground": t.diag.error,

    "editorError.foreground":   t.diag.error,
    "editorWarning.foreground": t.diag.warning,
    "editorInfo.foreground":    t.diag.info,
    "editorHint.foreground":    t.diag.hint,

    "editorGutter.background":            t.ui.bg,
    "editorGutter.modifiedBackground":    t.vcs.changed,
    "editorGutter.addedBackground":       t.vcs.added,
    "editorGutter.deletedBackground":     t.vcs.removed,

    "diffEditor.insertedTextBackground":  t.diff.add    + "33",
    "diffEditor.removedTextBackground":   t.diff.delete + "33",
    "diffEditor.insertedLineBackground":  t.diff.add    + "66",
    "diffEditor.removedLineBackground":   t.diff.delete + "66",
    "diffEditor.diagonalFill":            t.ui.bg_p1,

    // ── editor widgets (float) ──────────────────────────────────
    "editorWidget.background":   t.ui.float.bg,
    "editorWidget.foreground":   t.ui.float.fg,
    "editorWidget.border":       t.ui.float.fg_border,

    "editorSuggestWidget.background":          t.ui.pmenu.bg,
    "editorSuggestWidget.foreground":          t.ui.pmenu.fg,
    "editorSuggestWidget.selectedBackground":  t.ui.pmenu.bg_sel,
    "editorSuggestWidget.highlightForeground": t.syn.special1,
    "editorSuggestWidget.border":              t.ui.float.fg_border,

    "editorHoverWidget.background": t.ui.float.bg,
    "editorHoverWidget.foreground": t.ui.float.fg,
    "editorHoverWidget.border":     t.ui.float.fg_border,

    // ── tabs ────────────────────────────────────────────────────
    "editorGroupHeader.tabsBackground": t.ui.bg_m2,
    "editorGroupHeader.tabsBorder":     t.ui.bg_m3,
    "editorGroup.border":               t.ui.bg_m3,
    "editorGroup.dropBackground":       t.ui.bg_visual + "66",

    "tab.activeBackground":             t.ui.bg,
    "tab.activeForeground":             t.ui.fg,
    "tab.inactiveBackground":           t.ui.bg_dim,
    "tab.inactiveForeground":           t.syn.comment,
    "tab.border":                       t.ui.bg_m3,
    "tab.activeBorderTop":              t.syn.fun,
    "tab.unfocusedActiveBorderTop":     t.ui.nontext,
    "tab.hoverBackground":              t.ui.bg_p1,

    // ── panels ──────────────────────────────────────────────────
    "panel.background":                 t.ui.bg,
    "panel.border":                     t.ui.bg_m3,
    "panelTitle.activeForeground":      t.ui.fg,
    "panelTitle.inactiveForeground":    t.syn.comment,
    "panelTitle.activeBorder":          t.syn.fun,

    // ── activity bar ────────────────────────────────────────────
    "activityBar.background":           t.ui.bg_dim,
    "activityBar.foreground":           t.ui.fg,
    "activityBar.inactiveForeground":   t.syn.comment,
    "activityBar.border":               t.ui.bg_m3,
    "activityBar.activeBorder":         t.syn.fun,
    "activityBarBadge.background":      t.syn.fun,
    "activityBarBadge.foreground":      t.ui.bg,

    // ── side bar ────────────────────────────────────────────────
    "sideBar.background":               t.ui.bg_dim,
    "sideBar.foreground":               t.ui.fg_dim,
    "sideBar.border":                   t.ui.bg_m3,
    "sideBarTitle.foreground":          t.ui.fg,
    "sideBarSectionHeader.background":  t.ui.bg_dim,
    "sideBarSectionHeader.foreground":  t.ui.fg_dim,
    "sideBarSectionHeader.border":      t.ui.bg_m3,

    // ── lists ───────────────────────────────────────────────────
    "list.activeSelectionBackground":   t.ui.bg_search,
    "list.activeSelectionForeground":   t.ui.pmenu.fg,
    "list.inactiveSelectionBackground": t.ui.bg_visual,
    "list.inactiveSelectionForeground": t.ui.pmenu.fg,
    "list.hoverBackground":             t.ui.bg_p1,
    "list.hoverForeground":             t.ui.fg,
    "list.focusBackground":             t.ui.bg_visual,
    "list.focusForeground":             t.ui.pmenu.fg,
    "list.highlightForeground":         t.syn.special1,
    "list.errorForeground":             t.diag.error,
    "list.warningForeground":           t.diag.warning,

    "tree.indentGuidesStroke":          t.ui.bg_p1,

    // ── status bar ──────────────────────────────────────────────
    "statusBar.background":             t.ui.bg_m3,
    "statusBar.foreground":             t.ui.fg_dim,
    "statusBar.border":                 t.ui.bg_m3,
    "statusBar.noFolderBackground":     t.ui.bg_m3,
    "statusBar.debuggingBackground":    t.syn.statement,
    "statusBar.debuggingForeground":    t.ui.bg,
    "statusBarItem.remoteBackground":   t.ui.bg_search,
    "statusBarItem.remoteForeground":   t.ui.fg,
    "statusBarItem.prominentBackground":t.ui.bg_p1,
    "statusBarItem.hoverBackground":    t.ui.bg_p1,

    // ── title bar ───────────────────────────────────────────────
    "titleBar.activeBackground":        t.ui.bg_m3,
    "titleBar.activeForeground":        t.ui.fg,
    "titleBar.inactiveBackground":      t.ui.bg_m3,
    "titleBar.inactiveForeground":      t.syn.comment,
    "titleBar.border":                  t.ui.bg_m3,

    // ── menus ───────────────────────────────────────────────────
    "menu.background":                  t.ui.bg_m3,
    "menu.foreground":                  t.ui.fg_dim,
    "menu.selectionBackground":         t.ui.bg_search,
    "menu.selectionForeground":         t.ui.fg,
    "menu.separatorBackground":         t.ui.nontext,
    "menubar.selectionBackground":      t.ui.bg_p1,
    "menubar.selectionForeground":      t.ui.fg,

    // ── inputs ──────────────────────────────────────────────────
    "input.background":                 t.ui.bg_m1,
    "input.foreground":                 t.ui.fg,
    "input.border":                     t.ui.nontext,
    "input.placeholderForeground":      t.syn.comment,
    "inputOption.activeBackground":     t.ui.bg_search,
    "inputOption.activeForeground":     t.ui.fg_dim,
    "inputValidation.errorBackground":  t.diff.delete,
    "inputValidation.errorBorder":      t.diag.error,
    "inputValidation.warningBackground":t.diff.text,
    "inputValidation.warningBorder":    t.diag.warning,
    "inputValidation.infoBackground":   t.diff.change,
    "inputValidation.infoBorder":       t.diag.info,

    // ── dropdowns ───────────────────────────────────────────────
    "dropdown.background":              t.ui.bg_m3,
    "dropdown.foreground":              t.ui.fg_dim,
    "dropdown.border":                  t.ui.nontext,

    // ── badges ──────────────────────────────────────────────────
    "badge.background":                 t.ui.bg_search,
    "badge.foreground":                 t.ui.fg,

    "progressBar.background":           t.syn.fun,

    // ── scrollbar ───────────────────────────────────────────────
    "scrollbar.shadow":                 meta.type === "light" ? "#00000026" : "#00000066",
    "scrollbarSlider.background":       t.ui.bg_p1 + "99",
    "scrollbarSlider.hoverBackground":  t.ui.bg_p2 + "CC",
    "scrollbarSlider.activeBackground": t.ui.nontext + "CC",

    // ── buttons ─────────────────────────────────────────────────
    "button.background":                        t.ui.bg_search,
    "button.foreground":                        t.ui.fg,
    "button.hoverBackground":                   t.ui.bg_visual,
    "button.secondaryBackground":               t.ui.bg_p1,
    "button.secondaryForeground":               t.ui.fg,
    "button.secondaryHoverBackground":          t.ui.bg_p2,

    "checkbox.background":                      t.ui.bg_m1,
    "checkbox.foreground":                      t.ui.fg,
    "checkbox.border":                          t.ui.nontext,

    // ── breadcrumbs ─────────────────────────────────────────────
    "breadcrumb.foreground":                    t.syn.comment,
    "breadcrumb.focusForeground":               t.ui.fg,
    "breadcrumb.activeSelectionForeground":     t.ui.fg,
    "breadcrumbPicker.background":              t.ui.bg_m3,

    // ── git decorations ─────────────────────────────────────────
    "gitDecoration.addedResourceForeground":           t.vcs.added,
    "gitDecoration.modifiedResourceForeground":        t.vcs.changed,
    "gitDecoration.deletedResourceForeground":         t.vcs.removed,
    "gitDecoration.untrackedResourceForeground":       t.syn.type,
    "gitDecoration.ignoredResourceForeground":         t.ui.nontext,
    "gitDecoration.conflictingResourceForeground":     t.diag.error,
    "gitDecoration.stageDeletedResourceForeground":    t.vcs.removed,
    "gitDecoration.stageModifiedResourceForeground":   t.vcs.changed,
    "gitDecoration.submoduleResourceForeground":       t.syn.statement,

    // ── minimap ─────────────────────────────────────────────────
    "minimap.findMatchHighlight":               t.ui.bg_search,
    "minimap.selectionHighlight":               t.ui.bg_visual,
    "minimap.errorHighlight":                   t.diag.error,
    "minimap.warningHighlight":                 t.diag.warning,
    "minimapGutter.addedBackground":            t.vcs.added,
    "minimapGutter.modifiedBackground":         t.vcs.changed,
    "minimapGutter.deletedBackground":          t.vcs.removed,

    // ── peek view ───────────────────────────────────────────────
    "peekView.border":                          t.ui.bg_search,
    "peekViewEditor.background":                t.ui.bg_m1,
    "peekViewEditor.matchHighlightBackground":  t.ui.bg_search + "66",
    "peekViewResult.background":                t.ui.bg_dim,
    "peekViewResult.matchHighlightBackground":  t.ui.bg_search + "66",
    "peekViewResult.selectionBackground":       t.ui.bg_visual,
    "peekViewResult.selectionForeground":       t.ui.pmenu.fg,
    "peekViewTitle.background":                 t.ui.bg_m3,
    "peekViewTitleLabel.foreground":            t.ui.fg,
    "peekViewTitleDescription.foreground":      t.ui.fg_dim,

    // ── notifications ───────────────────────────────────────────
    "notificationCenter.border":                t.ui.nontext,
    "notificationCenterHeader.background":      t.ui.bg_m3,
    "notificationCenterHeader.foreground":      t.ui.fg,
    "notifications.background":                 t.ui.bg_m3,
    "notifications.foreground":                 t.ui.fg,
    "notifications.border":                     t.ui.nontext,
    "notificationLink.foreground":              t.syn.special1,

    // ── extensions ──────────────────────────────────────────────
    "extensionButton.prominentBackground":          t.ui.bg_search,
    "extensionButton.prominentForeground":          t.ui.fg,
    "extensionButton.prominentHoverBackground":     t.ui.bg_visual,
    "extensionBadge.remoteBackground":              t.ui.bg_search,
    "extensionBadge.remoteForeground":              t.ui.fg,

    // ── terminal ────────────────────────────────────────────────
    "terminal.background":                  t.ui.bg,
    "terminal.foreground":                  t.ui.fg,
    "terminal.ansiBlack":                   t.term[0],
    "terminal.ansiRed":                     t.term[1],
    "terminal.ansiGreen":                   t.term[2],
    "terminal.ansiYellow":                  t.term[3],
    "terminal.ansiBlue":                    t.term[4],
    "terminal.ansiMagenta":                 t.term[5],
    "terminal.ansiCyan":                    t.term[6],
    "terminal.ansiWhite":                   t.term[7],
    "terminal.ansiBrightBlack":             t.term[8],
    "terminal.ansiBrightRed":               t.term[9],
    "terminal.ansiBrightGreen":             t.term[10],
    "terminal.ansiBrightYellow":            t.term[11],
    "terminal.ansiBrightBlue":              t.term[12],
    "terminal.ansiBrightMagenta":           t.term[13],
    "terminal.ansiBrightCyan":              t.term[14],
    "terminal.ansiBrightWhite":             t.term[15],
    "terminalCursor.foreground":            t.ui.special,
    "terminalCursor.background":            t.ui.bg,

    // ── debug ───────────────────────────────────────────────────
    "debugToolBar.background":              t.ui.bg_m3,
    "debugConsole.errorForeground":         t.diag.error,
    "debugConsole.warningForeground":       t.diag.warning,
    "debugConsole.infoForeground":          t.diag.info,
    "debugIcon.breakpointForeground":       t.diag.error,
  };

  // ── token colors ──────────────────────────────────────────────
  const tokenColors = [
    tc("Comment", [
      "comment", "punctuation.definition.comment", "string.comment",
    ], t.syn.comment, "italic"),

    tc("Variable", [
      "variable", "variable.other", "variable.other.readwrite", "variable.language",
    ], t.ui.fg),

    tc("Variable - this/self", [
      "variable.language.this", "variable.language.self", "variable.language.super",
    ], t.syn.statement, "italic"),

    tc("Parameter", [
      "variable.parameter", "meta.parameter", "meta.function.parameters variable",
    ], t.syn.parameter),

    tc("Member / property / field", [
      "variable.other.member", "variable.other.property",
      "variable.other.object.property", "meta.object.member",
      "meta.property.object", "support.variable.property",
    ], t.syn.identifier),

    tc("Constant", [
      "constant", "constant.other", "support.constant", "variable.other.constant",
    ], t.syn.constant),

    tc("Constant - language (true/false/null/undefined)", [
      "constant.language", "constant.language.boolean",
      "constant.language.null", "constant.language.undefined",
    ], t.syn.constant, "bold"),

    tc("Number", [
      "constant.numeric", "constant.numeric.integer", "constant.numeric.float",
      "constant.numeric.hex", "constant.numeric.binary",
    ], t.syn.number),

    tc("Character / escape", [
      "constant.character", "constant.character.escape",
      "constant.character.string.escape",
    ], t.syn.operator, "bold"),

    tc("String", [
      "string", "string.quoted", "string.quoted.single", "string.quoted.double",
      "string.quoted.triple", "string.template", "string.unquoted",
      "string.heredoc",
    ], t.syn.string),

    tc("String regexp", [
      "string.regexp", "string.regexp.character-class",
    ], t.syn.regex),

    tc("String template punctuation", [
      "punctuation.definition.string", "punctuation.definition.string.begin",
      "punctuation.definition.string.end",
    ], t.syn.string),

    tc("String template embedded expression markers", [
      "punctuation.definition.template-expression", "punctuation.section.embedded",
    ], t.syn.special3),

    tc("Keyword", [
      "keyword", "keyword.other", "keyword.declaration", "storage",
      "storage.modifier",
    ], t.syn.keyword, "italic"),

    tc("Storage type (class/function/var/let/const)", [
      "storage.type", "storage.type.class", "storage.type.function",
      "storage.type.struct", "storage.type.enum", "storage.type.interface",
    ], t.syn.type),

    tc("Control flow / statement", [
      "keyword.control", "keyword.control.flow", "keyword.control.conditional",
      "keyword.control.loop", "keyword.control.exception",
    ], t.syn.keyword, "italic bold"),

    tc("Return / yield / throw", [
      "keyword.control.return", "keyword.control.yield", "keyword.control.throw",
    ], t.syn.special2, "italic"),

    tc("Import / export / from / as", [
      "keyword.control.import", "keyword.control.export", "keyword.control.from",
      "keyword.control.as", "keyword.control.default",
    ], t.syn.special2, "italic"),

    tc("Operator (symbolic)", [
      "keyword.operator", "keyword.operator.assignment", "keyword.operator.arithmetic",
      "keyword.operator.comparison", "keyword.operator.logical",
      "keyword.operator.bitwise", "keyword.operator.relational",
      "keyword.operator.ternary", "keyword.operator.spread",
      "keyword.operator.rest", "keyword.operator.optional",
      "keyword.operator.type.annotation",
    ], t.syn.operator),

    tc("Operator (word: and/or/not/in/is)", [
      "keyword.operator.word", "keyword.operator.new", "keyword.operator.expression",
    ], t.syn.operator, "bold"),

    tc("Function definition / call", [
      "entity.name.function", "meta.function-call",
      "meta.function-call entity.name.function", "support.function",
      "support.function.builtin", "variable.function",
    ], t.syn.fun),

    tc("Method definition", [
      "entity.name.method", "meta.method entity.name.function",
    ], t.syn.fun),

    tc("Constructor", [
      "entity.name.function.constructor", "variable.function.constructor",
      "support.function.constructor", "meta.class entity.name.function",
    ], t.syn.special1),

    tc("Type / class / interface name", [
      "entity.name.type", "entity.name.class", "entity.name.interface",
      "entity.name.struct", "entity.name.enum", "entity.name.trait",
      "entity.name.namespace", "support.type", "support.class",
      "support.type.primitive",
    ], t.syn.type),

    tc("Type built-in", [
      "support.type.builtin", "support.type.primitive", "storage.type.primitive",
    ], t.syn.type),

    tc("Decorator / annotation", [
      "entity.name.function.decorator", "meta.decorator",
      "punctuation.definition.decorator", "storage.type.annotation",
    ], t.syn.special1, "italic"),

    tc("Preprocessor / directives", [
      "meta.preprocessor", "keyword.control.directive",
      "entity.name.function.preprocessor",
    ], t.syn.preproc),

    tc("Punctuation", [
      "punctuation", "punctuation.separator", "punctuation.terminator",
      "punctuation.section", "meta.brace", "meta.delimiter",
    ], t.syn.punct),

    tc("Punctuation accessor (./->/::)", [
      "punctuation.accessor",
    ], t.syn.operator),

    tc("Tag (HTML/JSX/XML)", [
      "entity.name.tag", "meta.tag", "punctuation.definition.tag",
    ], t.syn.statement),

    tc("Tag attribute", [
      "entity.other.attribute-name", "meta.attribute",
    ], t.syn.identifier, "italic"),

    tc("JSON property", [
      "support.type.property-name", "support.type.property-name.json",
      "meta.object-literal.key",
    ], t.syn.identifier),

    tc("Inherited / parent class", [
      "entity.other.inherited-class",
    ], t.syn.type, "italic"),

    tc("Invalid", [
      "invalid", "invalid.illegal",
    ], t.diag.error, "underline"),

    tc("Deprecated", [
      "invalid.deprecated",
    ], t.syn.deprecated, "strikethrough"),

    tc("Markup heading", [
      "markup.heading", "markup.heading punctuation.definition.heading",
      "entity.name.section",
    ], t.syn.fun, "bold"),

    tc("Markup bold", [
      "markup.bold",
    ], t.syn.constant, "bold"),

    tc("Markup italic", [
      "markup.italic",
    ], t.syn.constant, "italic"),

    tc("Markup strikethrough", [
      "markup.strikethrough",
    ], undefined, "strikethrough"),

    tc("Markup underline link", [
      "markup.underline.link", "string.other.link", "constant.other.reference.link",
    ], t.syn.special1, "underline"),

    tc("Markup quote", [
      "markup.quote",
    ], t.syn.comment, "italic"),

    tc("Markup raw / code block", [
      "markup.raw", "markup.raw.inline", "markup.raw.block",
      "markup.inline.raw",
    ], t.syn.string),

    tc("Markup list bullets", [
      "markup.list", "punctuation.definition.list.begin",
    ], t.syn.special3),

    tc("Diff inserted", [
      "markup.inserted", "meta.diff.header.to-file",
    ], t.vcs.added),

    tc("Diff deleted", [
      "markup.deleted", "meta.diff.header.from-file",
    ], t.vcs.removed),

    tc("Diff changed", [
      "markup.changed",
    ], t.vcs.changed),

    tc("Diff range", [
      "meta.diff.range", "punctuation.definition.range.diff",
    ], t.diag.info),

    tc("CSS class / id selector", [
      "entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css",
    ], t.syn.identifier),

    tc("CSS pseudo-class / pseudo-element", [
      "entity.other.attribute-name.pseudo-class",
      "entity.other.attribute-name.pseudo-element",
    ], t.syn.special1),

    tc("CSS property name", [
      "support.type.property-name.css", "meta.property-name",
    ], t.syn.fun),

    tc("CSS unit", [
      "keyword.other.unit",
    ], t.syn.constant),

    tc("Regex character class / group", [
      "constant.other.character-class.regexp", "punctuation.definition.group.regexp",
    ], t.syn.regex),

    tc("Embedded source punctuation (e.g. ${} in templates)", [
      "punctuation.section.embedded.begin", "punctuation.section.embedded.end",
    ], t.syn.special3),
  ];

  return {
    name: meta.name,
    type: meta.type,
    semanticHighlighting: false,
    colors,
    tokenColors,
  };
}
