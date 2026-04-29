// Pi agent theme JSON template
//
// Maps kanagawa semantic slots (ui, syn, diag, diff, vcs) to pi agent's
// 51 required color tokens plus optional export section.
//
// All colors are direct hex values — no vars indirection — for simplicity.

/**
 * @param {import('./palette.mjs').default} p  full palette
 * @param {ReturnType<import('./themes.mjs').wave>} t  composed theme slots
 * @param {{ name: string, id: string }} meta
 * @returns {object} pi agent theme JSON
 */
export function buildPiTheme(p, t, meta) {
  const colors = {
    // ── Core UI (11) ──────────────────────────────────────────
    accent:        t.syn.special1,
    border:        t.ui.nontext,
    borderAccent:  t.syn.fun,
    borderMuted:   t.ui.nontext,
    success:       t.diag.ok,
    error:         t.diag.error,
    warning:       t.diag.warning,
    muted:         t.syn.comment,
    dim:           t.ui.nontext,
    text:          "",
    thinkingText:  t.syn.comment,

    // ── Backgrounds & Content (11) ────────────────────────────
    selectedBg:         t.ui.bg_visual,
    userMessageBg:      t.ui.bg_p1,
    userMessageText:    "",
    customMessageBg:    t.ui.bg_visual,
    customMessageText:  "",
    customMessageLabel: t.syn.statement,
    toolPendingBg:      t.ui.bg_p1,
    toolSuccessBg:      t.diff.add,
    toolErrorBg:        t.diff.delete,
    toolTitle:          t.syn.special1,
    toolOutput:         t.syn.comment,

    // ── Markdown (10) ─────────────────────────────────────────
    mdHeading:         t.syn.constant,
    mdLink:            t.syn.special1,
    mdLinkUrl:         t.syn.comment,
    mdCode:            t.syn.special1,
    mdCodeBlock:       "",
    mdCodeBlockBorder: t.ui.nontext,
    mdQuote:           t.syn.comment,
    mdQuoteBorder:     t.ui.nontext,
    mdHr:              t.ui.nontext,
    mdListBullet:      t.syn.special1,

    // ── Tool Diffs (3) ────────────────────────────────────────
    toolDiffAdded:   t.vcs.added,
    toolDiffRemoved: t.vcs.removed,
    toolDiffContext: t.syn.comment,

    // ── Syntax Highlighting (9) ───────────────────────────────
    syntaxComment:     t.syn.comment,
    syntaxKeyword:     t.syn.keyword,
    syntaxFunction:    t.syn.fun,
    syntaxVariable:    t.ui.fg,
    syntaxString:      t.syn.string,
    syntaxNumber:      t.syn.number,
    syntaxType:        t.syn.type,
    syntaxOperator:    t.syn.operator,
    syntaxPunctuation: t.syn.punct,

    // ── Thinking Level Borders (6) ────────────────────────────
    thinkingOff:     t.ui.nontext,
    thinkingMinimal: t.syn.comment,
    thinkingLow:     t.syn.type,
    thinkingMedium:  t.syn.special1,
    thinkingHigh:    t.syn.statement,
    thinkingXhigh:   t.syn.special2,

    // ── Bash Mode (1) ─────────────────────────────────────────
    bashMode: t.syn.string,
  };

  return {
    $schema: "https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json",
    name: meta.name,
    colors,
    export: {
      pageBg: t.ui.bg_m3,
      cardBg: t.ui.bg,
      infoBg: t.ui.bg_p1,
    },
  };
}
