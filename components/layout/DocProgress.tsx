"use client";

import { useReadingState } from "@/lib/reading";
import { cn } from "@/lib/cn";

/**
 * Inline "X% read" indicator for `DocMeta`. Shows only when the
 * reader has scrolled past the threshold and has not yet completed
 * the page. Returns `null` otherwise so DocMeta stays compact for
 * first-time visitors.
 */
export function DocProgress({
  slug,
  threshold = 5,
  className,
}: {
  slug: string;
  /** Minimum percent required before the indicator appears. */
  threshold?: number;
  className?: string;
}) {
  const { progress } = useReadingState();
  const entry = progress[slug];
  if (!entry || entry.percent < threshold || entry.percent >= 100) return null;
  return (
    <span
      title="Reading progress on your last visit"
      className={cn("font-mono tabular-nums text-[var(--color-accent)]", className)}
    >
      {entry.percent}% read
    </span>
  );
}
