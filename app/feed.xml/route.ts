import { recentWriting, papers } from "@/lib/content";
import { SITE_URL as BASE } from "@/lib/site";

export const dynamic = "force-static";

/* ── XML helpers ──────────────────────────────────────────────── */

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toRFC3339(iso: string): string {
  // dates from Velite are ISO-date strings (YYYY-MM-DD or full ISO)
  return iso.includes("T") ? iso : `${iso}T00:00:00Z`;
}

/* ── Build Atom feed ──────────────────────────────────────────── */

interface FeedEntry {
  id: string;
  title: string;
  link: string;
  updated: string;
  summary: string;
}

function buildAtomFeed(entries: FeedEntry[]): string {
  const feedUpdated =
    entries.length > 0 ? entries[0].updated : new Date().toISOString();

  const entryXml = entries
    .map(
      (e) => `  <entry>
    <id>${esc(e.id)}</id>
    <title>${esc(e.title)}</title>
    <link href="${esc(e.link)}" rel="alternate" />
    <updated>${e.updated}</updated>
    <summary>${esc(e.summary)}</summary>
  </entry>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Jaehong Oh</title>
  <subtitle>Research notes, papers, and journal entries</subtitle>
  <link href="${BASE}/" rel="alternate" />
  <link href="${BASE}/feed.xml" rel="self" />
  <id>${BASE}/</id>
  <author>
    <name>Jaehong Oh</name>
  </author>
  <updated>${feedUpdated}</updated>
${entryXml}
</feed>
`;
}

/* ── Route handler (statically rendered at build time) ────────── */

export function GET() {
  // Published papers (status = "published")
  const publishedPapers: FeedEntry[] = papers
    .filter((p) => p.status === "published")
    .map((p) => ({
      id: `${BASE}${p.permalink}`,
      title: p.title,
      link: `${BASE}${p.permalink}`,
      updated: toRFC3339(p.date),
      summary: p.abstract.slice(0, 280),
    }));

  // Recent writing (journal + posts)
  const writing: FeedEntry[] = recentWriting.map((w) => ({
    id: `${BASE}${w.permalink}`,
    title: w.title,
    link: `${BASE}${w.permalink}`,
    updated: toRFC3339(w.date),
    summary: w.summary ?? "",
  }));

  // Merge, sort by date descending, take the 20 most recent
  const entries = [...writing, ...publishedPapers]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, 20);

  const xml = buildAtomFeed(entries);

  return new Response(xml, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
