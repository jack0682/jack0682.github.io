import Link from "next/link";
import { formatDate, toIsoDate } from "@/lib/format";
import { publicTags } from "@/lib/content";
import { cn } from "@/lib/cn";

type Props = {
  /** First-publication ISO date. */
  published?: string;
  /** Last-revision ISO date — only rendered when it differs from `published`. */
  updated?: string;
  /** Reading time in minutes (Velite's `metadata.readingTime`). */
  readingTime?: number;
  /** Word count (Velite's `metadata.wordCount`). */
  wordCount?: number;
  /** Document tags — rendered as links to the tag index. */
  tags?: string[];
  className?: string;
};

/**
 * Compact metadata row for long-form documents (notes, papers,
 * journal entries, ONN docs, research tracks). Surfaces publication
 * date, last revision, reading time, word count, and tag links when
 * available.
 *
 * Rendered immediately under the document `<h1>` and above the prose
 * border. Skips fields that are absent or that would duplicate
 * information already shown.
 */
export function DocMeta({
  published,
  updated,
  readingTime,
  wordCount,
  tags,
  className,
}: Props) {
  const showUpdated =
    updated && (!published || toIsoDate(updated) !== toIsoDate(published));

  const hasMeta =
    published ||
    showUpdated ||
    (typeof wordCount === "number" && wordCount > 0) ||
    (typeof readingTime === "number" && readingTime > 0);
  const cleanTags = Array.isArray(tags) ? publicTags(tags) : [];
  const hasTags = cleanTags.length > 0;

  if (!hasMeta && !hasTags) return null;

  return (
    <div className={cn("mt-4", className)}>
      {hasMeta && (
        <p className="sci-meta flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[var(--color-subtle)]">
          {published && (
            <time
              dateTime={toIsoDate(published)}
              className="font-mono tabular-nums"
            >
              {formatDate(published)}
            </time>
          )}
          {showUpdated && (
            <span className="font-mono tabular-nums">
              updated{" "}
              <time dateTime={toIsoDate(updated)}>{formatDate(updated)}</time>
            </span>
          )}
          {typeof wordCount === "number" && wordCount > 0 && (
            <span className="font-mono tabular-nums">
              {wordCount.toLocaleString()} words
            </span>
          )}
          {typeof readingTime === "number" && readingTime > 0 && (
            <span className="font-mono tabular-nums">
              {readingTime} min read
            </span>
          )}
        </p>
      )}
      {hasTags && (
        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
          {cleanTags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tags/${tag}/`}
                className="inline-block rounded-sm border border-[var(--color-rule)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-subtle)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
