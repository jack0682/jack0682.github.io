import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeX } from "@/components/mdx/TeX";
import { equations, equationsBySource } from "@/lib/content";

export const metadata: Metadata = {
  title: "Equation index",
  description:
    "Every formal equation across the SCC, ONN, and ONN papers — extracted from `<Equation>` JSX blocks and `$$ ... $$` display math, indexed by source document. Click a source to see all of its equations with surrounding prose.",
};

const collectionLabel: Record<string, string> = {
  notes: "Notes",
  onn: "ONN",
  papers: "Papers",
  journal: "Journal",
};

/**
 * Overview page — lists every source document that contains
 * equations, with a count + the first equation as a preview.
 * Per-source detail lives at `/refs/equations/[slug]/`.
 */
export default function EquationsIndexPage() {
  const groups = equationsBySource();

  return (
    <Container>
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/refs/", label: "Reference" },
            { label: "Equations" },
          ]}
        />
      </div>
      <PageHeader
        mark="∑"
        eyebrow="Index"
        title="Equation index"
        lead={`${equations.length} equations across ${groups.length} documents. Each entry is automatically paired with the prose paragraph immediately preceding it, so the index reads as a brief catalogue rather than a wall of TeX. Click any document to see its full equation list.`}
        className="pt-0 md:pt-0"
      />

      {groups.length === 0 ? (
        <p className="text-[var(--color-muted)]">
          No equations extracted yet.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {groups.map((group) => {
            const first = group.items[0];
            return (
              <li key={group.slug} className="py-7 sm:py-8">
                <Link
                  href={`/refs/equations/${group.slug}/`}
                  className="group block"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] md:w-44 md:shrink-0">
                      <span className="tabular-nums text-[var(--color-ink)]">
                        {group.items.length}
                      </span>{" "}
                      {group.items.length === 1 ? "equation" : "equations"}
                      <span className="ml-2 text-[var(--color-subtle)]">
                        · {collectionLabel[group.collection] ?? group.collection}
                      </span>
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-xl leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-2xl">
                        {group.title}
                      </h2>
                      {first && (
                        <div className="mt-3 overflow-x-auto rounded-sm border border-[var(--color-rule)]/60 bg-[var(--color-surface)]/50 p-3">
                          <TeX expr={first.expr} display />
                          {first.description && (
                            <p className="mt-2 line-clamp-2 text-xs italic leading-relaxed text-[var(--color-muted)]">
                              {first.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <span
                      aria-hidden
                      className="hidden font-mono text-xs text-[var(--color-subtle)] transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)] md:inline"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
