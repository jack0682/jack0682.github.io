import {
  journal as _journal,
  papers as _papers,
  posts as _posts,
  research as _research,
  notes as _notes,
  onnDocs as _onnDocs,
} from "#content";
import idIndexJson from "../.velite/id-index.json";
import glossaryJson from "../.velite/glossary.json";
import equationsJson from "../.velite/equations.json";

/* Body texts are intentionally NOT imported here.
   They are loaded directly by `components/layout/CommandPalette.tsx`
   so the ~400KB stripped-body corpus stays out of the per-page RSC
   payload. The palette is a client component already; importing
   body-index.json there bundles it into the shared client chunk
   (cached once across the whole site). */

export type GlossaryEntry = { name: string; plain: string };
export const glossary = glossaryJson as Record<string, GlossaryEntry>;
export function glossaryEntry(id: string): GlossaryEntry | undefined {
  return glossary[id];
}

/* ──────────────────────────────────────────────────────────────
   Curated read-only views of the content collections.
   Drafts are filtered out; sort orders are the canonical ones
   used across the site.
   ────────────────────────────────────────────────────────────── */

const published = <T extends { draft?: boolean }>(items: readonly T[]) =>
  items.filter((x) => !x.draft);

const byDateDesc = <T extends { date: string }>(a: T, b: T) =>
  Date.parse(b.date) - Date.parse(a.date) || b.date.localeCompare(a.date);

export const journalEntries = published(_journal).sort((a, b) =>
  byDateDesc(a, b),
);

export const papers = published(_papers).sort((a, b) =>
  byDateDesc(a, b),
);

export const posts = published(_posts).sort((a, b) =>
  byDateDesc(a, b),
);

export const researchTracks = [..._research].sort(
  (a, b) => a.ordinal - b.ordinal,
);

export const notesByPart = (() => {
  const map = new Map<number, typeof _notes>();
  for (const note of published(_notes)) {
    const bucket = map.get(note.part) ?? [];
    bucket.push(note);
    map.set(note.part, bucket);
  }
  for (const [, list] of map) {
    list.sort(
      (a, b) => (a.chapter ?? 0) - (b.chapter ?? 0) || a.slug.localeCompare(b.slug),
    );
  }
  return [...map.entries()].sort(([a], [b]) => a - b);
})();

export const allNotes = published(_notes);

export const onnAllDocs = published(_onnDocs).sort(
  (a, b) =>
    (a.chapter ?? 0) - (b.chapter ?? 0) || a.slug.localeCompare(b.slug),
);

/** Recent items across journal + posts for the homepage feed. */
export const recentWriting = [
  ...journalEntries.map((e) => ({
    kind: "journal" as const,
    title: e.title,
    date: e.date,
    permalink: e.permalink,
    summary: e.summary,
  })),
  ...posts.map((p) => ({
    kind: "post" as const,
    title: p.title,
    date: p.date,
    permalink: p.permalink,
    summary: p.summary,
  })),
].sort((a, b) => byDateDesc(a, b));

/* ──────────────────────────────────────────────────────────────
   Cross-reference indexes.
   Built once at module load so every page/palette/hub can
   consume them without recomputing.
   ────────────────────────────────────────────────────────────── */

export type SearchItem = {
  /** Stable per-item key. Format: `kind:slug`. CommandPalette uses
   *  the suffix after `:` to look up body text from its own bundled
   *  body-index.json. */
  id: string;
  kind: "note" | "paper" | "journal" | "track";
  title: string;
  summary?: string;
  permalink: string;
  /** Human-readable section label — "Part 0 · SCC", "Papers", etc. */
  group: string;
  /** Keywords for fuzzy search on top of title. */
  keywords: string[];
  /** Slug used by CommandPalette to look up body text in its own
   *  client-side body index. Empty string for non-body items
   *  (research tracks). */
  slug: string;
};

/** Flat search index consumed by the ⌘K command palette. Slim by
 *  design — full body text is bundled into the palette's own client
 *  chunk, not into the per-page RSC payload. */
export const searchIndex: SearchItem[] = [
  ...allNotes.map((n) => ({
    id: `note:${n.slug}`,
    kind: "note" as const,
    title: n.title,
    summary: n.summary,
    permalink: n.permalink,
    group: `Part ${n.part}${n.section ? ` · ${n.section}` : ""}`,
    keywords: [...n.tags, n.kind ?? "", n.track ?? ""].filter(Boolean),
    slug: n.slug,
  })),
  ...onnAllDocs.map((d) => ({
    id: `onn:${d.slug}`,
    kind: "note" as const,
    title: d.title,
    summary: d.summary,
    permalink: d.permalink,
    group: `ONN${d.section ? ` · ${d.section}` : ""}`,
    keywords: [...d.tags, d.kind ?? "", "onn"].filter(Boolean),
    slug: d.slug,
  })),
  ...papers.map((p) => ({
    id: `paper:${p.slug}`,
    kind: "paper" as const,
    title: p.title,
    summary: p.abstract.slice(0, 160),
    permalink: p.permalink,
    group: `Papers · ${p.status}`,
    keywords: [...p.tags, p.track ?? "", p.venue ?? ""].filter(Boolean),
    slug: p.slug,
  })),
  ...journalEntries.map((e) => ({
    id: `journal:${e.slug}`,
    kind: "journal" as const,
    title: e.title,
    summary: e.summary,
    permalink: e.permalink,
    group: `Journal · ${e.date.slice(0, 7)}`,
    keywords: [...e.tags, e.track ?? ""].filter(Boolean),
    slug: e.slug,
  })),
  ...researchTracks.map((t) => ({
    id: `track:${t.slug}`,
    kind: "track" as const,
    title: t.title,
    summary: t.summary,
    permalink: t.permalink,
    group: "Research tracks",
    keywords: [t.track],
    slug: "",
  })),
];

/* ──────────────────────────────────────────────────────────────
   Slug-uniqueness assertion across keyable collections.

   `crossRefsFor`, `papers[].related`, and `journal[].refs` all
   look up references by raw slug. A slug shared between `notes`
   and `onnDocs` would silently conflate references at runtime —
   refuse to build instead of emitting a wrong cross-link.
   ────────────────────────────────────────────────────────────── */
{
  const seen = new Map<string, string>();
  const register = (collection: string, slug: string) => {
    const prev = seen.get(slug);
    if (prev && prev !== collection) {
      throw new Error(
        `[lib/content] Slug collision: "${slug}" exists in both "${prev}" and "${collection}". ` +
          `crossRefsFor() cannot disambiguate — rename one before building.`,
      );
    }
    seen.set(slug, collection);
  };
  for (const n of allNotes) register("notes", n.slug);
  for (const d of onnAllDocs) register("onnDocs", d.slug);
}

/** Notes belonging to a given part (already sorted). */
export function notesForPart(part: number) {
  return allNotes
    .filter((n) => n.part === part)
    .sort(
      (a, b) =>
        (a.chapter ?? 0) - (b.chapter ?? 0) || a.slug.localeCompare(b.slug),
    );
}

/** Previous and next notes within the same part. */
export function prevNextInPart(slug: string) {
  const note = allNotes.find((n) => n.slug === slug);
  if (!note) return { prev: null, next: null };
  const siblings = notesForPart(note.part);
  const idx = siblings.findIndex((n) => n.slug === slug);
  return {
    prev: idx > 0 ? siblings[idx - 1] : null,
    next: idx < siblings.length - 1 ? siblings[idx + 1] : null,
  };
}

/* ──────────────────────────────────────────────────────────────
   Inbound (cited-by) reverse index.

   `crossRefsFor` walks forward edges only. Inbound edges are
   computed once at module load by inverting every collection's
   reference fields (`notes.related`, `onnDocs.related`,
   `papers.related`, `journal.refs`).

   Slug uniqueness across `notes` ↔ `onnDocs` is asserted above,
   so the keyspace is unambiguous.

   This block is intentionally declared BEFORE `crossRefsFor` so
   the `inboundIndex` reference resolves at module evaluation order
   rather than relying on TDZ behaviour at first call site.
   ────────────────────────────────────────────────────────────── */

export type InboundEdge = {
  /** Source slug (the doc that names the target). */
  from: string;
  /** Source collection — drives the badge label in the rail. */
  collection: "notes" | "onn" | "papers" | "journal";
  /** Source title for display. */
  title: string;
  /** Source permalink. */
  permalink: string;
  /** Source date if the collection has one. */
  date?: string;
};

export const inboundIndex: Map<string, InboundEdge[]> = (() => {
  const m = new Map<string, InboundEdge[]>();
  const push = (target: string, e: InboundEdge) => {
    if (target === e.from) return; // skip self-loops
    const bucket = m.get(target) ?? [];
    bucket.push(e);
    m.set(target, bucket);
  };
  for (const n of allNotes) {
    for (const t of n.related)
      push(t, {
        from: n.slug,
        collection: "notes",
        title: n.title,
        permalink: n.permalink,
      });
  }
  for (const d of onnAllDocs) {
    for (const t of d.related)
      push(t, {
        from: d.slug,
        collection: "onn",
        title: d.title,
        permalink: d.permalink,
      });
  }
  for (const p of papers) {
    for (const t of p.related)
      push(t, {
        from: p.slug,
        collection: "papers",
        title: p.title,
        permalink: p.permalink,
        date: p.date,
      });
  }
  for (const j of journalEntries) {
    for (const t of j.refs)
      push(t, {
        from: j.slug,
        collection: "journal",
        title: j.title,
        permalink: j.permalink,
        date: j.date,
      });
  }
  return m;
})();

/** Direct accessor for inbound edges into a slug. */
export function citedBy(slug: string): InboundEdge[] {
  return inboundIndex.get(slug) ?? [];
}

/**
 * Look up cross-references for a given note/paper/journal slug.
 *
 *   - `relatedNotes`   — notes explicitly listed in `related:`
 *                       (forward edges — what this doc points to)
 *   - `relatedPapers`  — papers that list this slug in their `related:`
 *   - `citingJournal`  — journal entries that list this slug in `refs:`
 *   - `citedByNotes`   — notes/onn docs whose `related:` points back here
 *                       (inbound edges — what points to this doc),
 *                       deduplicated against `relatedNotes` so symmetric
 *                       pairs only show in the forward column.
 */
export function crossRefsFor(slug: string) {
  const note = allNotes.find((n) => n.slug === slug);
  const onnDoc = onnAllDocs.find((d) => d.slug === slug);
  const relatedNotes = note
    ? note.related
        .map((s) => allNotes.find((n) => n.slug === s))
        .filter((n): n is (typeof allNotes)[number] => Boolean(n))
    : onnDoc
      ? onnDoc.related
          .map((s) => allNotes.find((n) => n.slug === s))
          .filter((n): n is (typeof allNotes)[number] => Boolean(n))
      : [];

  const relatedPapers = papers.filter((p) => p.related?.includes(slug));
  const citingJournal = journalEntries.filter((j) => j.refs?.includes(slug));

  // Inbound — exclude the doc itself and anything already in the forward rail.
  const forwardSet = new Set(relatedNotes.map((n) => n.slug));
  const citedByNotes = (inboundIndex.get(slug) ?? []).filter(
    (e) => e.from !== slug && !forwardSet.has(e.from),
  );

  return { relatedNotes, relatedPapers, citingJournal, citedByNotes };
}

/* ──────────────────────────────────────────────────────────────
   SCC canonical changelog timeline.

   Driven by journal entries that author `canonicalVersion` in
   their frontmatter. Promotion of these fields into the schema
   was added 2026-05-05; existing entries that already had the
   prose-level `canonicalVersion` light up automatically.
   ────────────────────────────────────────────────────────────── */

export type ChangelogEntry = {
  version: string;
  impact?: "bumped" | "patch" | "no-op";
  notes?: string;
  date: string;
  title: string;
  permalink: string;
  summary?: string;
};

export const sccChangelog: ChangelogEntry[] = journalEntries
  .filter((e) => Boolean(e.canonicalVersion))
  .map((e) => ({
    version: e.canonicalVersion!,
    impact: e.canonicalImpact,
    notes: e.canonicalNotes,
    date: e.date,
    title: e.title,
    permalink: e.permalink,
    summary: e.summary,
  }))
  .sort((a, b) =>
    b.version.localeCompare(a.version, undefined, { numeric: true }),
  );

/* ──────────────────────────────────────────────────────────────
   SCC hub — Part 0 categorised view.
   Organises Part-0 notes by their `kind` frontmatter, then
   attaches related papers (flagged with track=onn/perception) and
   a pointer to the Part-II theorem summary as a placeholder for
   future per-theorem pages.
   ────────────────────────────────────────────────────────────── */
export const sccHub = (() => {
  const part0 = notesForPart(0);
  const canonical = part0.filter((n) => n.kind === "canonical");
  const roadmapNotes = part0
    .filter((n) => n.kind === "roadmap")
    .map((n) => ({ ...n, roadmapKind: "status" as const }));
  const weeklyRoadmap = journalEntries
    .filter((e) => e.track === "perception" && e.kind === "weekly")
    .map((e) => ({ ...e, roadmapKind: "weekly" as const }));
  const roadmap = [...roadmapNotes, ...weeklyRoadmap].sort((a, b) => {
    const aDate = a.roadmapKind === "weekly" ? a.date : (a.updated ?? "");
    const bDate = b.roadmapKind === "weekly" ? b.date : (b.updated ?? "");
    return bDate.localeCompare(aDate);
  });
  const overview = part0.filter((n) => n.kind === "overview");
  const theorems = allNotes.filter((n) => n.kind === "theorem");

  const relatedPapers = papers.filter(
    (p) =>
      p.track === "perception" ||
      p.track === "onn" ||
      p.related?.some((s) => part0.some((n) => n.slug === s)),
  );

  return { canonical, roadmap, overview, theorems, relatedPapers };
})();

/* ──────────────────────────────────────────────────────────────
   ONN hub — parallel to SCC hub but pivoted around the ONN
   research track. Aggregates notes tagged `track: onn`, all ONN
   papers, the ONN research-track overview, and exposes the
   integrated architecture note as a cross-link. Placeholder slots
   live in the page itself — the platform simply supplies the
   real content it can find today.
   ────────────────────────────────────────────────────────────── */
export const onnHub = (() => {
  const canonical = onnAllDocs.filter((n) => n.kind === "canonical");
  const roadmap = onnAllDocs.filter((n) => n.kind === "roadmap");
  const overview = onnAllDocs.filter((n) => n.kind === "overview");
  const theorems = onnAllDocs.filter(
    (n) => n.kind === "theorem" || n.kind === "proof",
  );
  const essays = onnAllDocs.filter(
    (n) =>
      n.kind === undefined ||
      n.kind === "essay",
  );

  const relatedPapers = papers.filter((p) => p.track === "onn");

  const trackOverview = researchTracks.find((t) => t.track === "onn") ?? null;
  const integrationNote =
    allNotes.find((n) => n.slug === "integrated-architecture") ?? null;

  return {
    canonical,
    roadmap,
    overview,
    theorems,
    essays,
    relatedPapers,
    trackOverview,
    integrationNote,
  };
})();

/* ──────────────────────────────────────────────────────────────
   Tag index.
   Collects every tag used across notes, papers, journal, and ONN
   docs into a sorted array of { tag, count, items }.
   ────────────────────────────────────────────────────────────── */

export type TaggedItem = {
  kind: "note" | "paper" | "journal" | "onn";
  title: string;
  permalink: string;
  date?: string;
  summary?: string;
};

export const tagIndex = (() => {
  const map = new Map<string, TaggedItem[]>();

  const push = (tag: string, item: TaggedItem) => {
    const bucket = map.get(tag) ?? [];
    bucket.push(item);
    map.set(tag, bucket);
  };

  for (const n of allNotes) {
    for (const t of n.tags) push(t, { kind: "note", title: n.title, permalink: n.permalink, summary: n.summary });
  }
  for (const p of papers) {
    for (const t of p.tags) push(t, { kind: "paper", title: p.title, permalink: p.permalink, date: p.date, summary: p.abstract.slice(0, 160) });
  }
  for (const j of journalEntries) {
    for (const t of j.tags) push(t, { kind: "journal", title: j.title, permalink: j.permalink, date: j.date, summary: j.summary });
  }
  for (const d of onnAllDocs) {
    for (const t of d.tags) push(t, { kind: "onn", title: d.title, permalink: d.permalink, summary: d.summary });
  }

  return [...map.entries()]
    .map(([tag, items]) => ({ tag, count: items.length, items }))
    .sort((a, b) => b.count - a.count);
})();

/** All unique tags sorted by count descending. */
export const allTags = tagIndex.map((t) => t.tag);

/** Items for a specific tag. */
export function itemsForTag(tag: string) {
  return tagIndex.find((t) => t.tag === tag)?.items ?? [];
}

/* ──────────────────────────────────────────────────────────────
   Formal-ID jump indexes.

   Built at `pnpm build` time by `scripts/build-search-index.mjs`,
   which parses raw MDX and bins IDs by kind. Used by
   `/refs/theorems/` and `/refs/open-problems/`.
   ────────────────────────────────────────────────────────────── */

export type IdOccurrence = {
  slug: string;
  title: string;
  permalink: string;
  collection: "notes" | "onn" | "papers" | "journal";
  snippet: string;
};

export type IdIndexKind =
  | "theorem"
  | "openProblem"
  | "definition"
  | "structure"
  | "axiom"
  | "claim";

type IdIndexShape = Record<IdIndexKind, Record<string, IdOccurrence[]>>;
const idIndex = idIndexJson as IdIndexShape;

/** Returns IDs of a given kind sorted alphabetically (numeric-aware). */
export function idsByKind(kind: IdIndexKind): { id: string; occurrences: IdOccurrence[] }[] {
  return Object.entries(idIndex[kind] ?? {})
    .map(([id, occurrences]) => ({ id, occurrences }))
    .sort((a, b) =>
      a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" }),
    );
}

/* ──────────────────────────────────────────────────────────────
   Equation index — all `<Equation expr=...>` JSX blocks plus
   `$$ ... $$` display math, surfaced together for the global
   equations page at `/refs/equations/`.
   ────────────────────────────────────────────────────────────── */

export type Equation = {
  /** Source: explicit `<Equation>` JSX vs raw `$$..$$` display math. */
  kind: "Equation" | "display";
  /** TeX source. */
  expr: string;
  /** Optional eq number from `<Equation number="2.1" />`. */
  number?: string;
  /** Optional left-rail label, e.g. "Def." */
  label?: string;
  /** Optional plain-language note from `<Equation note="..." />`. */
  note?: string;
  /**
   * Auto-extracted prose paragraph immediately preceding the
   * equation in the source MDX. Used as a description on the index
   * pages so each equation has surrounding context. Absent when no
   * suitable paragraph could be found, or when `note` is set
   * (the explicit author-written note takes precedence).
   */
  description?: string;
  /** Source doc slug. */
  fromSlug: string;
  /** Source doc title. */
  fromTitle: string;
  /** Source doc permalink. */
  permalink: string;
  /** Source collection — drives grouping in the index page. */
  collection: "notes" | "onn" | "papers" | "journal";
};

export const equations = equationsJson as Equation[];

/** Group equations by source slug, sorted by frequency desc then by title asc. */
export function equationsBySource(): {
  slug: string;
  title: string;
  permalink: string;
  collection: Equation["collection"];
  items: Equation[];
}[] {
  const map = new Map<string, ReturnType<typeof equationsBySource>[number]>();
  for (const eq of equations) {
    const bucket = map.get(eq.fromSlug);
    if (bucket) {
      bucket.items.push(eq);
    } else {
      map.set(eq.fromSlug, {
        slug: eq.fromSlug,
        title: eq.fromTitle,
        permalink: eq.permalink,
        collection: eq.collection,
        items: [eq],
      });
    }
  }
  return [...map.values()].sort(
    (a, b) =>
      b.items.length - a.items.length || a.title.localeCompare(b.title),
  );
}
