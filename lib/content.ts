import {
  journal as _journal,
  papers as _papers,
  posts as _posts,
  research as _research,
  notes as _notes,
} from "#content";

/* ──────────────────────────────────────────────────────────────
   Curated read-only views of the content collections.
   Drafts are filtered out; sort orders are the canonical ones
   used across the site.
   ────────────────────────────────────────────────────────────── */

const published = <T extends { draft?: boolean }>(items: readonly T[]) =>
  items.filter((x) => !x.draft);

export const journalEntries = published(_journal).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const papers = published(_papers).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const posts = published(_posts).sort((a, b) =>
  b.date.localeCompare(a.date),
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
].sort((a, b) => b.date.localeCompare(a.date));

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
  const roadmap = part0.filter((n) => n.kind === "roadmap");
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
