/**
 * Static OG image generator.
 *
 * Reads velite output and renders 1200×630 PNGs with satori+resvg
 * for the default card plus every paper / note / journal / onn document.
 * Outputs to public/og/** and public/og-default.png.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const WIDTH = 1200;
const HEIGHT = 630;

// Mirrors app/globals.css light-mode tokens.
const BG = "#faf8f5";
const INK = "#1a1814";
const MUTED = "#6b655c";
const SUBTLE = "#a59f95";
const ACCENT = "#7a3b2e";
const ACCENT_SOFT = "#c67a5c";
const RULE = "#e8e2d6";

const SITE = "Jaehong Oh — Research";

/* ── font loading ───────────────────────────────────────────── */
// Static TTFs bundled with the repo. Fontsource subsets split latin /
// latin-ext into separate files and satori does not fall back across
// duplicates of the same name+weight+style, so diacritics (Č etc.) would
// render as tofu. These static un-subsetted files cover Latin + Latin-Ext.
const fontsDir = resolve(__dirname, "fonts");
const interRegular = readFileSync(resolve(fontsDir, "Inter-Regular.ttf"));
const interSemi = readFileSync(resolve(fontsDir, "Inter-SemiBold.ttf"));
const frauncesBold = readFileSync(resolve(fontsDir, "Fraunces-Bold.ttf"));

const fonts = [
  { name: "Inter", data: interRegular, weight: 400, style: "normal" },
  { name: "Inter", data: interSemi, weight: 600, style: "normal" },
  { name: "Fraunces", data: frauncesBold, weight: 700, style: "normal" },
];

/* ── JSX-less element helper ────────────────────────────────── */
function h(type, props, ...children) {
  const flat = children
    .flat(Infinity)
    .filter((c) => c !== null && c !== undefined && c !== false);
  return {
    type,
    props: {
      ...(props ?? {}),
      children: flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat,
    },
  };
}

/* ── shared frame ───────────────────────────────────────────── */
// Satori requires leaf flex containers to declare their axis, so each
// helper passes display:flex where children stack or span.
function card({ eyebrow, title, subtitle, footer }) {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        color: INK,
        padding: "72px 80px",
        fontFamily: "Inter",
        position: "relative",
      },
    },
    // top rule
    h("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        background: ACCENT,
      },
    }),
    // dot-grid decoration in the corner
    h("div", {
      style: {
        position: "absolute",
        bottom: 60,
        right: 60,
        width: 160,
        height: 160,
        opacity: 0.35,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${INK}22 1px, transparent 0)`,
        backgroundSize: "18px 18px",
      },
    }),
    // header: eyebrow + wordmark
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: ACCENT,
          fontWeight: 600,
        },
      },
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 14 } },
        h("span", {
          style: {
            width: 14,
            height: 14,
            background: ACCENT,
            display: "block",
          },
        }),
        h("span", {}, eyebrow ?? "Research"),
      ),
      h(
        "span",
        {
          style: {
            fontSize: 16,
            color: SUBTLE,
            letterSpacing: "0.18em",
          },
        },
        SITE.toUpperCase(),
      ),
    ),
    // title block
    h(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: 60,
        },
      },
      h(
        "h1",
        {
          style: {
            fontFamily: "Fraunces",
            fontWeight: 700,
            fontSize: titleSize(title),
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
            color: INK,
            margin: 0,
          },
        },
        title,
      ),
      subtitle
        ? h(
            "p",
            {
              style: {
                marginTop: 28,
                fontSize: 26,
                lineHeight: 1.45,
                color: MUTED,
                fontFamily: "Inter",
                fontWeight: 400,
                display: "flex",
              },
            },
            subtitle,
          )
        : null,
    ),
    // footer: domain + optional meta
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${RULE}`,
          paddingTop: 22,
          fontSize: 18,
          color: MUTED,
          fontFamily: "Inter",
          fontWeight: 400,
        },
      },
      h("span", {}, "jack0682.github.io"),
      footer ? h("span", { style: { color: SUBTLE } }, footer) : h("span", {}),
    ),
  );
}

function titleSize(title) {
  const len = title.length;
  if (len > 120) return 48;
  if (len > 80) return 56;
  if (len > 50) return 68;
  return 80;
}

/* ── templates ──────────────────────────────────────────────── */
const tplDefault = () =>
  card({
    eyebrow: "Research Blog",
    title: "Ontology Neural Networks, perception, and embodied cognition.",
    subtitle:
      "Papers, mathematical notes, and a research journal by Jaehong Oh.",
    footer: "2026 · ONN programme",
  });

const tplPaper = (p) => {
  const statusMap = {
    published: "Published",
    accepted: "Accepted",
    submitted: "Submitted",
    preprint: "Preprint",
    "in-progress": "In progress",
  };
  const meta = `${statusMap[p.status] ?? "Paper"} · ${p.year}${
    p.venue ? ` · ${p.venue}` : ""
  }`;
  return card({
    eyebrow: "Paper",
    title: p.title,
    subtitle: p.authors.join(", "),
    footer: meta,
  });
};

const tplNote = (n) => {
  const chapter =
    n.chapter !== undefined && n.chapter !== null
      ? `Part ${n.part} · Chapter ${n.chapter}`
      : `Part ${n.part}`;
  return card({
    eyebrow: "Note",
    title: n.title,
    subtitle: n.summary,
    footer: chapter,
  });
};

const tplJournal = (j) => {
  const dateStr = new Date(j.date).toISOString().slice(0, 10);
  return card({
    eyebrow: "Journal",
    title: j.title,
    subtitle: j.summary,
    footer: `${dateStr}${j.track ? ` · ${j.track}` : ""}`,
  });
};

const tplOnn = (d) =>
  card({
    eyebrow: "ONN",
    title: d.title,
    subtitle: d.summary,
    footer:
      d.chapter !== undefined && d.chapter !== null
        ? `Chapter ${d.chapter}${d.kind ? ` · ${d.kind}` : ""}`
        : d.kind ?? "",
  });

/* ── render pipeline ────────────────────────────────────────── */
async function render(tree, outPath) {
  const svg = await satori(tree, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
    .render()
    .asPng();
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, png);
}

function loadJson(rel) {
  const p = resolve(root, rel);
  if (!existsSync(p)) return [];
  return JSON.parse(readFileSync(p, "utf8"));
}

async function main() {
  const papers = loadJson(".velite/papers.json").filter((p) => !p.draft);
  const notes = loadJson(".velite/notes.json").filter((n) => !n.draft);
  const journal = loadJson(".velite/journal.json").filter((j) => !j.draft);
  const onn = loadJson(".velite/onnDocs.json").filter((d) => !d.draft);

  const jobs = [
    { tree: tplDefault(), out: "public/og-default.png" },
    ...papers.map((p) => ({
      tree: tplPaper(p),
      out: `public/og/papers/${p.slug}.png`,
    })),
    ...notes.map((n) => ({
      tree: tplNote(n),
      out: `public/og/notes/${n.slug}.png`,
    })),
    ...journal.map((j) => ({
      tree: tplJournal(j),
      out: `public/og/journal/${j.slug}.png`,
    })),
    ...onn.map((d) => ({
      tree: tplOnn(d),
      out: `public/og/onn/${d.slug}.png`,
    })),
  ];

  console.log(`[og] rendering ${jobs.length} images…`);
  const started = Date.now();
  for (const job of jobs) {
    await render(job.tree, resolve(root, job.out));
  }
  console.log(`[og] done in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

main().catch((err) => {
  console.error("[og] failed:", err);
  process.exit(1);
});
