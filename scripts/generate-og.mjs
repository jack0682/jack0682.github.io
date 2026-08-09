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
import { createHash } from "node:crypto";
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
const SUBTLE = "#767068";
const ACCENT = "#7a3b2e";
const ULR_ACCENT = "#5a3f91";
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
const notoSansKrRegular = readFileSync(resolve(fontsDir, "NotoSansKR-Regular.ttf"));
const notoSansKrBold = readFileSync(resolve(fontsDir, "NotoSansKR-Bold.ttf"));

const fonts = [
  { name: "Inter", data: interRegular, weight: 400, style: "normal" },
  { name: "Inter", data: interSemi, weight: 600, style: "normal" },
  { name: "Fraunces", data: frauncesBold, weight: 700, style: "normal" },
  { name: "Noto Sans KR", data: notoSansKrRegular, weight: 400, style: "normal" },
  { name: "Noto Sans KR", data: notoSansKrBold, weight: 700, style: "normal" },
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
function card({
  eyebrow,
  title,
  subtitle,
  footer,
  fontFamily = "Inter",
  titleFontFamily = "Fraunces",
  accent = ACCENT,
  titleMaxSize = 80,
  subtitleFontSize = 26,
}) {
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
        padding: 0,
        fontFamily,
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
        background: accent,
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
          position: "absolute",
          top: 72,
          left: 80,
          right: 80,
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: accent,
          fontWeight: 600,
          flexShrink: 0,
        },
      },
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 14 } },
        h("span", {
          style: {
            width: 14,
            height: 14,
            background: accent,
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
          display: "flex",
          position: "absolute",
          top: 128,
          right: 80,
          bottom: 142,
          left: 80,
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: 60,
          minHeight: 0,
          overflow: "hidden",
        },
      },
      h(
        "h1",
        {
          style: {
            fontFamily: titleFontFamily,
            fontWeight: 700,
            fontSize: Math.min(titleSize(title), titleMaxSize),
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
                fontSize: subtitleFontSize,
                lineHeight: 1.45,
                color: MUTED,
                fontFamily,
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
          position: "absolute",
          right: 80,
          bottom: 72,
          left: 80,
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${RULE}`,
          paddingTop: 22,
          fontSize: 18,
          color: MUTED,
          fontFamily,
          fontWeight: 400,
          flexShrink: 0,
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
    title: "Unified Latent Representation and learned organization.",
    subtitle:
      "Canon, mathematical flows, evidence ledgers, and a research journal by Jaehong Oh.",
    footer: "2026 · ULR main programme",
  });

const tplPaper = (p) => {
  const statusMap = {
    published: "Published",
    accepted: "Accepted",
    submitted: "Submitted",
    preprint: "Preprint",
    "in-progress": "In progress",
  };
  const claimMap = {
    "partially-superseded": "Partially superseded",
    withdrawn: "Claims withdrawn",
    historical: "Historical record",
  };
  const claim = claimMap[p.claimStatus];
  const meta = `${statusMap[p.status] ?? "Paper"} · ${p.year}${
    claim ? ` · ${claim}` : ""
  }${
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
    eyebrow: n.part === 0 ? "SCC · Historical Archive" : "Note",
    title: n.title,
    subtitle: n.summary,
    footer: n.part === 0 ? `${chapter} · archived` : chapter,
  });
};

const tplJournal = (j) => {
  const dateStr = new Date(j.date).toISOString().slice(0, 10);
  const archive = j.track === "perception" ? "SCC archive" : j.track === "onn" ? "ONN archive" : "";
  return card({
    eyebrow: archive ? `${archive} · Journal` : "Journal",
    title: j.title,
    subtitle: j.summary,
    footer: `${dateStr}${archive ? ` · ${archive}` : j.track ? ` · ${j.track}` : ""}`,
  });
};

const tplOnn = (d) =>
  card({
    eyebrow: "ONN · Historical Archive",
    title: d.title,
    subtitle: d.summary,
    footer:
      d.chapter !== undefined && d.chapter !== null
        ? `Chapter ${d.chapter}${d.kind ? ` · ${d.kind}` : ""} · archived`
        : `${d.kind ?? "Document"} · archived`,
  });

const ulrStatusLabel = {
  canonical: "정본",
  current: "현재",
  historical: "역사",
  noncanonical: "비정본",
};

const tplUlr = (d) =>
  card({
    eyebrow: "ULR · Main Research",
    title: d.title,
    subtitle: d.summary ?? d.description,
    footer: `${ulrStatusLabel[d.status] ?? d.status ?? "현재"}${d.canon ? ` · Canon ${d.canon}` : ` · ${d.kind}`}`,
    fontFamily: "Noto Sans KR",
    titleFontFamily: "Noto Sans KR",
    accent: ULR_ACCENT,
    titleMaxSize: 56,
    subtitleFontSize: 22,
  });

const tplUlrHub = () =>
  card({
    eyebrow: "ULR · Main Research",
    title: "Unified Latent Representation",
    subtitle:
      "한 latent의 불충분성에서 출발한 Motivation, Canon 24의 음성 판정, 전체 수학과 다음 검증 관문.",
    footer: "Main programme · Canon 24 · Motivation → evidence",
    fontFamily: "Noto Sans KR",
    titleFontFamily: "Noto Sans KR",
    accent: ULR_ACCENT,
    titleMaxSize: 56,
    subtitleFontSize: 22,
  });

const tplResearch = (r) =>
  card({
    eyebrow: "Research",
    title: r.title,
    subtitle: r.statusSummary ?? r.summary,
    footer: r.statusLabel ?? (r.track ? `Track · ${r.track}` : "Research programme"),
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

/* ── content-addressed cache ─────────────────────────────────
   Bake the layout tree (already a plain JSON-ish object) plus the
   font + template version into a SHA-256 hash. If the cache says
   the destination PNG was last rendered from the same hash, skip.
   Cache file lives in .velite/ (already gitignored). */
const CACHE_VERSION = "v4-compact-ulr"; // bump to force a full re-render
const CACHE_PATH = resolve(root, ".velite/og-cache.json");
const FONT_FINGERPRINT = createHash("sha256")
  .update(interRegular)
  .update(interSemi)
  .update(frauncesBold)
  .update(notoSansKrRegular)
  .update(notoSansKrBold)
  .digest("hex")
  .slice(0, 16);

function jobHash(tree) {
  return createHash("sha256")
    .update(CACHE_VERSION)
    .update(FONT_FINGERPRINT)
    .update(JSON.stringify(tree))
    .digest("hex");
}

function loadCache() {
  if (!existsSync(CACHE_PATH)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

/* ── concurrency-limited Promise.all ─────────────────────────
   resvg is CPU-bound; satori is JS-bound. A small pool keeps the
   event loop responsive without thrashing. */
async function pmap(items, limit, fn) {
  const out = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      out[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return out;
}

async function main() {
  const papers = loadJson(".velite/papers.json").filter((p) => !p.draft);
  const notes = loadJson(".velite/notes.json").filter((n) => !n.draft);
  const journal = loadJson(".velite/journal.json").filter((j) => !j.draft);
  const onn = loadJson(".velite/onnDocs.json").filter((d) => !d.draft);
  const ulr = loadJson(".velite/ulrDocs.json").filter((d) => !d.draft);
  const research = loadJson(".velite/research.json").filter((r) => !r.draft);

  const jobs = [
    { tree: tplDefault(), out: "public/og-default.png" },
    { tree: tplUlrHub(), out: "public/og/ulr/index.png" },
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
    ...ulr.map((d) => ({
      tree: tplUlr(d),
      out: `public/og/ulr/${d.slug}.png`,
    })),
    ...research.map((r) => ({
      tree: tplResearch(r),
      out: `public/og/research/${r.slug}.png`,
    })),
  ];

  const cache = loadCache();
  const nextCache = {};
  const work = [];
  let cached = 0;

  for (const job of jobs) {
    const hash = jobHash(job.tree);
    const absOut = resolve(root, job.out);
    nextCache[job.out] = hash;
    if (cache[job.out] === hash && existsSync(absOut)) {
      cached++;
      continue;
    }
    work.push({ ...job, hash, absOut });
  }

  // Satori shares parsed font state across renders. Concurrent Korean/Latin
  // jobs intermittently produced structurally incomplete cards (missing the
  // absolute header or footer) even though every individual render succeeded.
  // Serial rendering is slower but deterministic, which matters for deploy-time
  // social images far more than shaving a minute from the build.
  const concurrency = 1;
  console.log(
    `[og] ${jobs.length} jobs · ${cached} cached · rendering ${work.length} (concurrency=${concurrency})`,
  );
  const started = Date.now();
  await pmap(work, concurrency, (job) => render(job.tree, job.absOut));
  saveCache(nextCache);
  console.log(`[og] done in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

main().catch((err) => {
  console.error("[og] failed:", err);
  process.exit(1);
});
