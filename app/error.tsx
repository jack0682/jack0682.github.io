"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";

/**
 * Branded runtime error boundary. Mirrors the not-found page so an
 * unexpected client render error lands on the site's visual vocabulary
 * (the χ mark) instead of the framework's default error screen.
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container width="prose">
      <section className="flex min-h-[60vh] flex-col justify-center py-20">
        <div className="flex items-baseline gap-5">
          <span
            aria-hidden
            className="font-display text-[clamp(5rem,18vw,9rem)] italic leading-none text-[var(--color-accent)]/40"
          >
            χ
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            500 · exception
          </p>
        </div>
        <h1 className="mt-8 font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.05] tracking-[-0.01em] text-[var(--color-ink)]">
          A discontinuity interrupted this computation.
        </h1>
        <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-[var(--color-muted)]">
          An unexpected error occurred while rendering this page. You can retry
          the render, or return to a stable region of the site.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <button
            type="button"
            onClick={reset}
            className="min-h-11 border-b border-[var(--color-ink)] pb-0.5 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            Home
          </Link>
          <Link
            href="/notes/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            Notes index
          </Link>
        </div>
      </section>
    </Container>
  );
}
