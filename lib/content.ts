import {
  journal as _journal,
  papers as _papers,
  posts as _posts,
  research as _research,
  notes as _notes,
  onnDocs as _onnDocs,
} from "#content";

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
  kind: "note" | "paper" | "journal" | "track";
  title: string;
  summary?: string;
  permalink: string;
  /** Human-readable section label — "Part 0 · SCC", "Papers", etc. */
  group: string;
  /** Keywords for fuzzy search on top of title. */
  keywords: string[];
};

/** Flat search index consumed by the ⌘K command palette. */
export const searchIndex: SearchItem[] = [
  ...allNotes.map((n) => ({
    kind: "note" as const,
    title: n.title,
    summary: n.summary,
    permalink: n.permalink,
    group: `Part ${n.part}${n.section ? ` · ${n.section}` : ""}`,
    keywords: [...n.tags, n.kind ?? "", n.track ?? ""].filter(Boolean),
  })),
  ...onnAllDocs.map((d) => ({
    kind: "note" as const,
    title: d.title,
    summary: d.summary,
    permalink: d.permalink,
    group: `ONN${d.section ? ` · ${d.section}` : ""}`,
    keywords: [...d.tags, d.kind ?? "", "onn"].filter(Boolean),
  })),
  ...papers.map((p) => ({
    kind: "paper" as const,
    title: p.title,
    summary: p.abstract.slice(0, 160),
    permalink: p.permalink,
    group: `Papers · ${p.status}`,
    keywords: [...p.tags, p.track ?? "", p.venue ?? ""].filter(Boolean),
  })),
  ...journalEntries.map((e) => ({
    kind: "journal" as const,
    title: e.title,
    summary: e.summary,
    permalink: e.permalink,
    group: `Journal · ${e.date.slice(0, 7)}`,
    keywords: [...e.tags, e.track ?? ""].filter(Boolean),
  })),
  ...researchTracks.map((t) => ({
    kind: "track" as const,
    title: t.title,
    summary: t.summary,
    permalink: t.permalink,
    group: "Research tracks",
    keywords: [t.track],
  })),
];

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

/**
 * Look up cross-references for a given note/paper/journal slug.
 *
 *   - `relatedNotes`   — notes explicitly listed in `related:`
 *   - `relatedPapers`  — papers that list this slug in their `related:`
 *   - `citingJournal`  — journal entries that list this slug in `refs:`
 */
export function crossRefsFor(slug: string) {
  const note = allNotes.find((n) => n.slug === slug);
  const relatedNotes = note
    ? note.related
        .map((s) => allNotes.find((n) => n.slug === s))
        .filter((n): n is (typeof allNotes)[number] => Boolean(n))
    : [];

  const relatedPapers = papers.filter((p) => p.related?.includes(slug));
  const citingJournal = journalEntries.filter((j) => j.refs?.includes(slug));

  return { relatedNotes, relatedPapers, citingJournal };
}

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
