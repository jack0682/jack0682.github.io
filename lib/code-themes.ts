/**
 * Custom shiki themes whose token colours all meet WCAG AA (>= 4.6:1) on the
 * site's code surfaces (light #ffffff, dark #19233b). Colours were auto-tuned
 * per hue until each cleared the threshold. Any scope not listed here falls
 * back to `editor.foreground` (ink), which is also AA — so nothing renders
 * invisibly, unlike off-the-shelf high-contrast themes.
 */

type Palette = {
  fg: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  type: string;
  variable: string;
};

function buildTheme(
  name: string,
  type: "light" | "dark",
  bg: string,
  c: Palette,
) {
  return {
    name,
    type,
    colors: { "editor.foreground": c.fg, "editor.background": bg },
    settings: [
      { settings: { foreground: c.fg, background: bg } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: c.comment },
      },
      {
        scope: [
          "keyword",
          "keyword.control",
          "keyword.other",
          "storage",
          "storage.type",
          "storage.modifier",
          "variable.language",
        ],
        settings: { foreground: c.keyword },
      },
      {
        scope: [
          "string",
          "string.quoted",
          "string.template",
          "constant.other.symbol",
        ],
        settings: { foreground: c.string },
      },
      {
        scope: [
          "constant.numeric",
          "constant.language",
          "constant.character",
          "constant.other",
          "support.constant",
        ],
        settings: { foreground: c.number },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "meta.function-call",
          "meta.function-call.generic",
        ],
        settings: { foreground: c.function },
      },
      {
        scope: [
          "entity.name.type",
          "entity.name.class",
          "entity.name.namespace",
          "support.type",
          "support.class",
          "entity.other.inherited-class",
          "storage.type.class",
        ],
        settings: { foreground: c.type },
      },
      {
        scope: [
          "variable",
          "variable.parameter",
          "variable.other",
          "meta.definition.variable",
          "meta.object-literal.key",
        ],
        settings: { foreground: c.variable },
      },
      { scope: ["entity.name.tag"], settings: { foreground: c.type } },
      {
        scope: ["entity.other.attribute-name"],
        settings: { foreground: c.function },
      },
    ],
  };
}

export const codeThemeLight = buildTheme("jack-light", "light", "#ffffff", {
  fg: "#1a1814",
  // tuned against the composited code surface (#f6f3ef), not pure white
  comment: "#656c76",
  keyword: "#cf222e",
  string: "#0a7d33",
  number: "#9a5300",
  function: "#6639ba",
  type: "#0550ae",
  variable: "#1f2328",
});

export const codeThemeDark = buildTheme("jack-dark", "dark", "#19233b", {
  fg: "#e2e9f5",
  comment: "#8593b5",
  keyword: "#ff8fa3",
  string: "#8dd18d",
  number: "#ffb072",
  function: "#d2a8ff",
  type: "#84c7ff",
  variable: "#e2e9f5",
});
