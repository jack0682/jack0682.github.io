import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { tagIndex } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/tags/" },
  title: "Tags",
  description: "Browse all content by topic tag.",
};

/**
 * Map a tag's count to a visual weight class.
 * Weights are coarse (5 buckets) so the page reads as a topic map
 * rather than a linear list, yet keeps rhythm across all sizes.
 */
function weightFor(count: number, max: number) {
  const r = max > 0 ? count / max : 0;
  if (r >= 0.75) return "text-2xl font-semibold text-[var(--color-ink)]";
  if (r >= 0.5) return "text-xl font-medium text-[var(--color-ink)]";
  if (r >= 0.3) return "text-lg text-[var(--color-ink)]/90";
  if (r >= 0.15) return "text-base text-[var(--color-muted)]";
  return "text-sm text-[var(--color-subtle)]";
}

export default function TagsPage() {
  const max = tagIndex.reduce((m, t) => Math.max(m, t.count), 0);
  // Shared (count >= 2) tags form the weighted topic cloud; tags used
  // exactly once are collapsed into a compact alphabetical list so the
  // page stays browsable as the singleton tail grows.
  const shared = [...tagIndex]
    .filter((t) => t.count >= 2)
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  const singletons = [...tagIndex]
    .filter((t) => t.count === 1)
    .sort((a, b) => a.tag.localeCompare(b.tag));

  return (
    <Container>
      <PageHeader
        mark="∮"
        eyebrow="Tags"
        title="Topics."
        lead="Every tag across notes, papers, and journal entries. Size reflects how many documents share the tag."
      />

      {/* ── count scale legend ──────────────────────────────── */}
      <div className="mb-10 flex items-baseline gap-3 border-t border-[var(--color-rule)] pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
        <span>{tagIndex.length} tags</span>
        <span aria-hidden>·</span>
        <span>{shared.length} shared</span>
        <span aria-hidden>·</span>
        <span>max {max}</span>
      </div>

      <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-4 leading-snug">
        {shared.map(({ tag, count }) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}/`}
              className={`group inline-flex items-baseline gap-1.5 transition-colors hover:text-[var(--color-accent)] ${weightFor(count, max)}`}
            >
              <span className="font-display tracking-tight">{tag}</span>
              <span className="font-mono text-[0.55em] tabular-nums text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]">
                {count}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {singletons.length > 0 && (
        <section className="mt-16 border-t border-[var(--color-rule)] pt-8">
          <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Used once · {singletons.length}
          </h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 leading-snug">
            {singletons.map(({ tag }) => (
              <li key={tag}>
                <Link
                  href={`/tags/${tag}/`}
                  className="text-sm text-[var(--color-subtle)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
