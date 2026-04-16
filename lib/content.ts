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
