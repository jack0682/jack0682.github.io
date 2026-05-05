"use client";

import Link from "next/link";
import { useReadingState } from "@/lib/reading";
import { cn } from "@/lib/cn";

/**
 * "Continue: <last-read title>" affordance, rendered above the home
 * page's recent-writing list. Hidden when no last-read entry exists
 * (first-time visitor) or when the visitor is currently on the same
 * page they were last reading.
 */
export function ContinueChip({ className }: { className?: string }) {
  const { last, progress } = useReadingState();
  if (!last) return null;
  const pct = progress[last.slug]?.percent ?? 0;
  return (
    <Link
      href={last.permalink}
      className={cn(
        "group inline-flex max-w-full items-baseline gap-3 border-l-2 border-[var(--color-accent)] py-1.5 pl-3 pr-4 text-sm",
        "transition-colors hover:bg-[var(--color-rule)]/30",
        className,
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
        Continue
      </span>
      <span className="flex-1 truncate text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
        {last.title}
      </span>
      {pct > 0 && pct < 100 && (
        <span className="font-mono text-[10px] tabular-nums text-[var(--color-subtle)]">
          {pct}%
        </span>
      )}
    </Link>
  );
}
