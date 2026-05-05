import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Not found · χ undefined",
};

/**
 * Custom 404. The χ glyph is the site's recurring "intrinsic
 * cohomology" mark from the home page; using it here ties the
 * "missing route" affordance into the visual vocabulary instead
 * of generic generic-error chrome.
 */
export default function NotFound() {
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
            404 · undefined
          </p>
        </div>
        <h1 className="mt-8 font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.05] tracking-[-0.01em] text-[var(--color-ink)]">
          This region of the relational space has no entry.
        </h1>
        <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-[var(--color-muted)]">
          The URL you followed does not resolve to a registered
          document. It may have been renamed during a canonical
          consolidation, or the link itself may be malformed.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link
            href="/"
            className="border-b border-[var(--color-ink)] pb-0.5 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Home
          </Link>
          <Link
            href="/notes/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            Notes index
          </Link>
          <Link
            href="/papers/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            Papers
          </Link>
          <Link
            href="/journal/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            Journal
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            ⌘K to search
          </span>
        </div>
      </section>
    </Container>
  );
}
