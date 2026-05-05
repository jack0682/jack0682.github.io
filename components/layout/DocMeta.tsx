import { formatDate, toIsoDate } from "@/lib/format";
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
  className?: string;
};

/**
 * Compact metadata row for long-form documents (notes, papers,
 * journal entries, ONN docs, research tracks). Surfaces publication
 * date, last revision, reading time, and word count when available.
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
  className,
}: Props) {
  const showUpdated =
    updated && (!published || toIsoDate(updated) !== toIsoDate(published));

  if (!published && !showUpdated && !readingTime && !wordCount) return null;

  return (
    <p
      className={cn(
        "sci-meta mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[var(--color-subtle)]",
        className,
      )}
    >
      {published && (
        <time dateTime={toIsoDate(published)} className="font-mono tabular-nums">
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
        <span className="font-mono tabular-nums">{readingTime} min read</span>
      )}
    </p>
  );
}
