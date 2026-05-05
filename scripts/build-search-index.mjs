#!/usr/bin/env node
/**
 * Build two derived indexes from raw MDX content:
 *
 * 1. `.velite/body-index.json` — slug → stripped body text. Powers
 *    full-text search in the global ⌘K palette via MiniSearch.
 * 2. `.velite/id-index.json` — categorised list of formal IDs
 *    (theorems, open problems, definitions, structures, axioms,
 *    claims) with the docs they appear in. Powers the
 *    `/index/theorems/` and `/index/open-problems/` jump-index pages.
 *
 * Velite compiles MDX bodies to a JS function string; neither full
 * text nor ID extraction is feasible on that output. We re-read the
 * raw `.mdx` sources here.
 *
 * Runs as part of `pnpm build` between Velite and Next.js.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const root = resolve(dirname(__filename), "..");

/** Recursively walk a directory yielding `.mdx` paths. */
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (s.isFile() && p.endsWith(".mdx")) yield p;
  }
}

/** Minimal frontmatter parser. */
function parseFrontmatter(raw) {
  if (!raw.startsWith("---\n")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 4);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(4, end);
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");
  const data = {};
  for (const line of fm.split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[m[1]] = val;
  }
  return { data, body };
}

function stripBody(s) {
  return s
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`\n]+`/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$\n]+\$/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_~>|]/g, " ")
    .replace(/\\([a-zA-Z]+)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ── ID extraction ────────────────────────────────────────────
   Categorised regexes for the SCC/ONN formal-ID conventions.
   Anchored at word boundaries; allow a Unicode middle segment so
   hyphenated Greek-letter names like `T-σ-Lemma-2` are caught. */

const ID_PATTERNS = [
  {
    kind: "theorem",
    // T-PreObj-1, T-σ-Lemma-2, T-Bind-Proj, T-L1-F, T-A2, etc.
    re: /\bT-[\p{L}\p{N}][\p{L}\p{N}_-]*[\p{L}\p{N}]\b/gu,
  },
  {
    kind: "openProblem",
    // OP-0001, OP-0009-K
    re: /\bOP-\d{4}(?:-[A-Za-z]+)?\b/g,
  },
  {
    kind: "definition",
    // D-0001, D-6a (with trailing letter variant)
    re: /\bD-\d{1,4}[a-z]?\b/g,
  },
  {
    kind: "structure",
    re: /\bS-\d{4}\b/g,
  },
  {
    kind: "axiom",
    re: /\bA-\d{4}\b/g,
  },
  {
    kind: "claim",
    re: /\bC-\d{4}\b/g,
  },
];

/** ±100-char window around the first occurrence in a body. */
function snippetAround(body, idx, idLen) {
  const start = Math.max(0, idx - 80);
  const end = Math.min(body.length, idx + idLen + 80);
  return (
    (start > 0 ? "… " : "") +
    body.slice(start, end).replace(/\s+/g, " ").trim() +
    (end < body.length ? " …" : "")
  );
}

const collections = ["notes", "onn", "papers", "journal"];
const MAX_PER_DOC = 12000;

/** body-index.json: slug → stripped body */
const bodyIndex = {};
/** id-index.json: kind → id → [{ slug, permalink, snippet }] */
const idIndex = Object.fromEntries(ID_PATTERNS.map((p) => [p.kind, {}]));

let kept = 0;
let skipped = 0;
let totalIds = 0;

for (const c of collections) {
  const dir = resolve(root, "content", c);
  for (const file of walk(dir)) {
    const raw = readFileSync(file, "utf8");
    const { data, body } = parseFrontmatter(raw);
    if (!data.slug) {
      skipped++;
      continue;
    }
    if (data.draft === "true" || data.draft === true) {
      skipped++;
      continue;
    }

    const stripped = stripBody(body);
    bodyIndex[data.slug] = stripped.slice(0, MAX_PER_DOC);

    // Permalink reconstruction matches `computeFields` in velite.config.ts.
    const collectionKey = c === "onn" ? "onn" : c;
    const permalink = `/${collectionKey}/${data.slug}/`;

    // Track first occurrence per (kind, id) within this doc.
    for (const { kind, re } of ID_PATTERNS) {
      const seen = new Set();
      for (const m of body.matchAll(re)) {
        const id = m[0];
        if (seen.has(id)) continue;
        seen.add(id);
        const snippet = snippetAround(body, m.index ?? 0, id.length);
        const bucket = idIndex[kind][id] ?? [];
        bucket.push({
          slug: data.slug,
          title: data.title ?? data.slug,
          permalink,
          collection: c,
          snippet,
        });
        idIndex[kind][id] = bucket;
        totalIds++;
      }
    }

    kept++;
  }
}

/* ── equation extraction ──────────────────────────────────────
   Pulls every `<Equation expr="..." />` JSX block + every
   `$$ ... $$` display-math span out of the raw MDX. Inline `$..$`
   is intentionally skipped — too noisy at index scale. Output:
   `.velite/equations.json` consumed by `/index/equations/`. */

function parseJsxProps(s) {
  const props = {};
  const re = /(\w+)\s*=\s*(?:"([^"]*)"|\{`([^`]*)`\}|\{"([^"]*)"\}|\{([^}]*)\})/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const value = m[2] ?? m[3] ?? m[4] ?? m[5];
    if (value !== undefined) props[m[1]] = value;
  }
  return props;
}

/** Pull the most-recent prose paragraph immediately before the
 *  equation block so we can show it as a description on the index.
 *  Walks backward from `pos`, gathering whitespace-separated
 *  sentences until we hit a hard break (blank line) or another
 *  equation / heading / list marker. Stripped of inline markdown. */
function contextBefore(body, pos, max = 280) {
  // Walk back to the previous paragraph break.
  let end = pos;
  // Skip leading blank lines just before pos.
  while (end > 0 && body[end - 1] === "\n") end--;
  if (end === 0) return undefined;
  let start = body.lastIndexOf("\n\n", end - 1);
  if (start === -1) start = 0;
  let chunk = body.slice(start, end).trim();
  // Reject if the chunk itself starts with a marker that means it
  // isn't a sentence (heading, bullet, fenced code).
  if (/^(#{1,6}\s|>\s|-\s|\*\s|\d+\.\s|```)/.test(chunk)) return undefined;
  // Strip inline math/code/jsx so the description is plain prose.
  chunk = chunk
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$\n]+\$/g, " ")
    .replace(/`[^`\n]+`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (chunk.length === 0) return undefined;
  if (chunk.length <= max) return chunk;
  // Prefer ending at a sentence boundary near `max`.
  const slice = chunk.slice(0, max);
  const lastPeriod = slice.lastIndexOf(". ");
  return (lastPeriod > max * 0.5 ? slice.slice(0, lastPeriod + 1) : slice + "…");
}

function extractEquations() {
  const eqs = [];
  for (const c of collections) {
    const dir = resolve(root, "content", c);
    let it;
    try {
      it = walk(dir);
    } catch {
      continue;
    }
    for (const file of it) {
      const raw = readFileSync(file, "utf8");
      const { data, body } = parseFrontmatter(raw);
      if (!data.slug) continue;
      if (data.draft === true || data.draft === "true") continue;
      const permalink = `/${c}/${data.slug}/`;
      const fromTitle = data.title ?? data.slug;

      // Track fenced-code regions once so each match check is O(1).
      const fenceRanges = [];
      {
        const fenceRe = /```/g;
        let prev = -1;
        for (const m of body.matchAll(fenceRe)) {
          if (prev === -1) prev = m.index;
          else {
            fenceRanges.push([prev, m.index + m[0].length]);
            prev = -1;
          }
        }
      }
      const inFence = (i) =>
        fenceRanges.some(([a, b]) => i >= a && i < b);

      // <Equation ... /> components — self-closing JSX
      const eqRe = /<Equation\b([^/>]*?)\/>/g;
      for (const m of body.matchAll(eqRe)) {
        const idx = m.index ?? 0;
        if (inFence(idx)) continue;
        const props = parseJsxProps(m[1]);
        if (!props.expr) continue;
        eqs.push({
          kind: "Equation",
          expr: props.expr,
          number: props.number,
          label: props.label,
          note: props.note,
          description: props.note ? undefined : contextBefore(body, idx),
          fromSlug: data.slug,
          fromTitle,
          permalink,
          collection: c,
        });
      }

      // $$ ... $$ display math — anchored to start-of-line so a
      // stray inline `$$` in prose can't pair across paragraphs.
      // Also requires the closing `$$` to be on its own line.
      const ddRe = /(?:^|\n)\$\$\s*\n([\s\S]+?)\n\s*\$\$(?:\n|$)/g;
      for (const m of body.matchAll(ddRe)) {
        const idx = m.index ?? 0;
        if (inFence(idx)) continue;
        const expr = m[1].trim();
        if (!expr) continue;
        // Reject obvious junk: pure prose blocks accidentally caught.
        if (!/[\\{}=+\-^_]/.test(expr)) continue;
        // Reject Markdown-looking content (bullets, headings, bold) —
        // signals a false match between two adjacent $$ blocks.
        if (/(?:^|\n)#{1,6}\s|(?:^|\n)[-*]\s|\*\*/.test(expr)) continue;
        eqs.push({
          kind: "display",
          expr,
          description: contextBefore(body, idx),
          fromSlug: data.slug,
          fromTitle,
          permalink,
          collection: c,
        });
      }
    }
  }
  return eqs;
}

/* ── glossary extraction ──────────────────────────────────────
   Drives the `<Term id="D-0014">…</Term>` HoverCard popups.
   Reads `content/notes/part-0/scc-glossary.mdx` and bins each
   `### <name>` section's "Plain English:" paragraph by every
   formal ID listed on the section's "Formal:" line.
   Output: `.velite/glossary.json` keyed by ID. */

function extractGlossary() {
  const file = resolve(root, "content/notes/part-0/scc-glossary.mdx");
  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    return {};
  }
  const { body } = parseFrontmatter(raw);
  const out = {};
  // Split on "### " headings (level-3) — preserve heading text.
  const sections = body.split(/^### /m).slice(1);
  for (const section of sections) {
    const nl = section.indexOf("\n");
    if (nl === -1) continue;
    const heading = section.slice(0, nl).trim().replace(/`([^`]+)`/g, "$1");
    const rest = section.slice(nl + 1);

    const formalMatch = rest.match(/\*\*Formal:\*\*\s*([^\n]+)/);
    if (!formalMatch) continue;
    const ids = [];
    for (const re of [
      /D-\d{1,4}[a-z]?/g,
      /S-\d{4}/g,
      /A-\d{4}/g,
    ]) {
      for (const m of formalMatch[1].matchAll(re)) ids.push(m[0]);
    }
    if (ids.length === 0) continue;

    const plainMatch = rest.match(/\*\*Plain English:\*\*\s*([^\n]+(?:\n(?!\n|\*\*)[^\n]+)*)/);
    const plain = plainMatch
      ? plainMatch[1].replace(/\s+/g, " ").trim()
      : "";

    const entry = {
      name: heading,
      plain: plain.slice(0, 360),
    };
    for (const id of ids) {
      // Don't overwrite a richer entry if the same ID reappears.
      if (!out[id] || out[id].plain.length < entry.plain.length) {
        out[id] = entry;
      }
    }
  }
  return out;
}

const glossary = extractGlossary();
const equations = extractEquations();

const bodyOut = resolve(root, ".velite/body-index.json");
const idOut = resolve(root, ".velite/id-index.json");
const glossaryOut = resolve(root, ".velite/glossary.json");
const equationsOut = resolve(root, ".velite/equations.json");
mkdirSync(dirname(bodyOut), { recursive: true });
writeFileSync(bodyOut, JSON.stringify(bodyIndex));
writeFileSync(idOut, JSON.stringify(idIndex));
writeFileSync(glossaryOut, JSON.stringify(glossary));
writeFileSync(equationsOut, JSON.stringify(equations));

const idCounts = Object.entries(idIndex)
  .map(([kind, ids]) => `${kind}=${Object.keys(ids).length}`)
  .join(" · ");
console.log(
  `[search-index] indexed ${kept} docs · skipped ${skipped} · ${
    Object.values(bodyIndex).reduce((s, v) => s + v.length, 0)
  } chars · ids: ${idCounts} (${totalIds} occurrences) · glossary: ${
    Object.keys(glossary).length
  } entries · equations: ${equations.length}`,
);
