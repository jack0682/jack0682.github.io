"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleBookmark, useReadingState } from "@/lib/reading";
import { cn } from "@/lib/cn";

/**
 * Star/bookmark toggle for note and onn-doc pages. Stores into
 * localStorage via `lib/reading`. Renders a neutral outline icon
 * before hydration so the first paint matches SSR.
 */
export function BookmarkToggle({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const state = useReadingState();
  const on = state.bookmarks.includes(slug);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(slug)}
      aria-pressed={on}
      aria-label={on ? "Remove bookmark" : "Bookmark this page"}
      title={on ? "Remove bookmark" : "Bookmark this page"}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-bg)]/80 backdrop-blur-sm transition-colors",
        on
          ? "border-[var(--color-accent)] text-[var(--color-accent)]"
          : "text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        className,
      )}
    >
      {on ? (
        <BookmarkCheck size={14} strokeWidth={1.6} />
      ) : (
        <Bookmark size={14} strokeWidth={1.5} />
      )}
    </button>
  );
}
