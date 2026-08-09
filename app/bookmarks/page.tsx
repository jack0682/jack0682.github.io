"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { useReadingState, toggleBookmark } from "@/lib/reading";
import type { SearchItem } from "@/lib/content";
import searchMetaJson from "../../.velite/search-meta.json";

const bookmarkIndex = (searchMetaJson as SearchItem[]).filter(
  (item) => item.kind !== "track" && item.slug,
);

type Resolved = {
  slug: string;
  title: string;
  permalink: string;
  group: string;
  summary?: string;
};

/**
 * Personal reading list. Lists every slug currently in the reader's
 * `bookmarks` localStorage entry, resolved against the live content
 * collections (notes / onn / papers). Hidden from anyone who hasn't
 * bookmarked anything — first-time visitor sees an empty-state hint.
 */
export default function BookmarksPage() {
  const { bookmarks } = useReadingState();

  const resolved: Resolved[] = bookmarks
    .map((slug): Resolved | null => {
      const item = bookmarkIndex.find((candidate) => candidate.slug === slug);
      return item
        ? {
            slug,
            title: item.title,
            permalink: item.permalink,
            group: item.group,
            summary: item.summary,
          }
        : null;
    })
    .filter((r): r is Resolved => r !== null);

  return (
    <Container width="prose">
      <div className="pt-10 md:pt-20">
        <Breadcrumb items={[{ label: "Bookmarks" }]} />
      </div>
      <PageHeader
        mark="★"
        eyebrow="Bookmarks"
        title="Your reading list."
        lead="Pages you've starred while reading. Stored locally in this browser only — no account, no sync. Click the bookmark icon on any note to add or remove."
        className="pt-0 md:pt-0"
      />

      {bookmarks.length === 0 ? (
        <p className="text-[var(--color-muted)]">
          No bookmarks yet. The bookmark toggle sits at the top-right corner
          of every note.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {resolved.map((item) => (
            <li key={item.slug} className="flex items-baseline gap-3 py-5">
              <button
                type="button"
                onClick={() => toggleBookmark(item.slug)}
                aria-label={`Remove ${item.title} from bookmarks`}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)] transition-colors hover:text-[var(--color-accent)]"
              >
                remove
              </button>
              <div className="flex-1">
                <Link
                  href={item.permalink}
                  className="block text-base leading-snug text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)] sm:text-lg"
                >
                  {item.title}
                </Link>
                {item.summary && (
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.summary}
                  </p>
                )}
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  {item.group}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
