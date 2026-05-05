"use client";

import { useReadingState } from "@/lib/reading";
import { cn } from "@/lib/cn";

/**
 * Tiny visited-checkmark shown next to a slug-keyed reference card
 * (cross-refs in `RelatedDocs`, theorem index entries, etc.). Lets
 * a returning reader see at a glance which adjacent notes they've
 * already opened. Renders nothing if the slug hasn't been visited.
 */
export function VisitedMark({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { visited } = useReadingState();
  if (!visited.includes(slug)) return null;
  return (
    <span
      aria-hidden
      title="You've visited this"
      className={cn(
        "inline-flex h-3 w-3 shrink-0 items-center justify-center text-[10px] leading-none text-[var(--color-accent)]/70",
        className,
      )}
    >
      ✓
    </span>
  );
}
