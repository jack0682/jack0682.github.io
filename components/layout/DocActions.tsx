"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { toggleBookmark, useReadingState } from "@/lib/reading";
import { cn } from "@/lib/cn";

/**
 * Per-document action cluster — bookmark + focus mode in a single
 * fixed-position pill at the top-right of note / onn detail pages.
 *
 * Replaces what used to be two separate fixed buttons stacked
 * vertically; on mobile the stacked layout was eating into the
 * prose column. The cluster keeps the same individual affordances
 * but in a horizontal group with a shared backplate.
 *
 * Focus mode toggling is handled here too so the group stays
 * self-contained — `<FocusToggle />` no longer needs to be mounted
 * separately on detail pages.
 */
export function DocActions({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const state = useReadingState();
  const bookmarked = state.bookmarks.includes(slug);

  const [focus, setFocus] = useState(false);

  const applyFocus = useCallback((next: boolean) => {
    setFocus(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.focus = next ? "on" : "";
    }
  }, []);

  // Cleanup focus mode on unmount.
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.dataset.focus = "";
      }
    };
  }, []);

  // ESC exits focus mode.
  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") applyFocus(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [focus, applyFocus]);

  return (
    <div
      className={cn(
        "fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(5rem,env(safe-area-inset-top))] z-30",
        "inline-flex items-center gap-1 rounded-full border border-[var(--color-rule)] bg-[var(--color-bg)]/85 p-0.5 backdrop-blur-sm",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => toggleBookmark(slug)}
        aria-pressed={bookmarked}
        aria-label={
          bookmarked ? "Remove bookmark" : "Bookmark this page"
        }
        title={bookmarked ? "Remove bookmark" : "Bookmark this page"}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          bookmarked
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-accent)]",
        )}
      >
        {bookmarked ? (
          <BookmarkCheck size={14} strokeWidth={1.6} />
        ) : (
          <Bookmark size={14} strokeWidth={1.5} />
        )}
      </button>
      <span
        aria-hidden
        className="h-4 w-px bg-[var(--color-rule)]"
      />
      <button
        type="button"
        onClick={() => applyFocus(!focus)}
        aria-pressed={focus}
        aria-label={
          focus
            ? "Exit focus mode (Esc)"
            : "Enter focus mode — fade chrome, prose only"
        }
        title={focus ? "Exit focus (Esc)" : "Focus mode"}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          focus
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-accent)]",
        )}
      >
        {focus ? (
          <Minimize2 size={14} strokeWidth={1.5} />
        ) : (
          <Maximize2 size={14} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
