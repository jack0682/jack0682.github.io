"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type NavRef = {
  permalink: string;
  title: string;
} | null;

/**
 * Mobile-only fixed bottom bar with prev / next navigation between
 * sibling notes. Hidden on lg+ (desktop has the inline prev/next at
 * the page bottom and a sidebar TOC) and inside focus mode (the
 * page-level CSS rule under `:root[data-focus="on"]` covers it via
 * the `aside.fixed` selector).
 *
 * Sits below the existing TOC drawer trigger / FloatingChip — the
 * three are arranged left/centre/right at the bottom edge so they
 * don't overlap on the smallest viewports.
 */
export function MobileDocBar({
  prev,
  next,
}: {
  prev: NavRef;
  next: NavRef;
}) {
  if (!prev && !next) return null;
  return (
    <aside
      aria-label="Adjacent documents"
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 lg:hidden",
        "liquid-glass",
        "inline-flex items-stretch overflow-hidden rounded-sm",
      )}
    >
      {prev ? (
        <Link
          href={prev.permalink}
          aria-label={`Previous: ${prev.title}`}
          className={cn(
            "group inline-flex items-center gap-2 px-3 py-2",
            "text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]",
          )}
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
          <span className="hidden max-w-[10rem] truncate font-mono text-[10px] uppercase tracking-[0.18em] sm:inline">
            Prev
          </span>
        </Link>
      ) : (
        <span className="inline-flex items-center px-3 py-2 text-[var(--color-subtle)] opacity-40">
          <ChevronLeft size={14} strokeWidth={1.5} aria-hidden />
        </span>
      )}
      <span aria-hidden className="my-1 w-px bg-[var(--color-rule)]" />
      {next ? (
        <Link
          href={next.permalink}
          aria-label={`Next: ${next.title}`}
          className={cn(
            "group inline-flex items-center gap-2 px-3 py-2",
            "text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]",
          )}
        >
          <span className="hidden max-w-[10rem] truncate font-mono text-[10px] uppercase tracking-[0.18em] sm:inline">
            Next
          </span>
          <ChevronRight size={14} strokeWidth={1.5} />
        </Link>
      ) : (
        <span className="inline-flex items-center px-3 py-2 text-[var(--color-subtle)] opacity-40">
          <ChevronRight size={14} strokeWidth={1.5} aria-hidden />
        </span>
      )}
    </aside>
  );
}
