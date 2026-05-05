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
    "Every formal equation across the SCC, ONN, and ONN papers — extracted from `<Equation>` JSX blocks and `$$ ... $$` display math, grouped by source document.",
};

const collectionLabel: Record<string, string> = {
  notes: "Notes",
  onn: "ONN",
  papers: "Papers",
  journal: "Journal",
};

export default function EquationsIndexPage() {
  const groups = equationsBySource();

  return (
    <Container width="prose">
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/notes/", label: "Notes" },
            { label: "Equations" },
          ]}
        />
      </div>
      <PageHeader
        mark="∑"
        eyebrow="Index"
        title="Equation index"
        lead={`${equations.length} equations extracted across ${groups.length} documents — every \`<Equation>\` JSX block plus every \`$$ ... $$\` display math span. Each entry links back to its source.`}
        className="pt-0 md:pt-0"
      />

      {/* Quick-jump TOC across source documents. */}
      {groups.length > 0 && (
        <nav
          aria-label="Sources"
          className="mb-12 flex flex-wrap gap-x-4 gap-y-2 border-y border-[var(--color-rule)] py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]"
        >
          {groups.map((g) => (
            <a
              key={g.slug}
              href={`#src-${g.slug}`}
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              {g.title}{" "}
              <span className="tabular-nums text-[var(--color-muted)]">
                ({g.items.length})
              </span>
            </a>
          ))}
        </nav>
      )}

      {groups.length === 0 ? (
        <p className="text-[var(--color-muted)]">
          No equations extracted yet. Authors can add an{" "}
          <code>{"<Equation expr=\"...\" />"}</code> block or a{" "}
          <code>$$ ... $$</code> display math span to any MDX file.
        </p>
      ) : (
        <div className="space-y-16">
          {groups.map((group) => (
            <section
              key={group.slug}
              id={`src-${group.slug}`}
              className="scroll-mt-24"
            >
              <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-[var(--color-rule)] pb-3">
                <h2 className="font-display text-xl leading-tight tracking-tight text-[var(--color-ink)]">
                  <Link
                    href={group.permalink}
                    className="transition-colors hover:text-[var(--color-accent)]"
                  >
                    {group.title}
                  </Link>
                </h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  {collectionLabel[group.collection] ?? group.collection} ·{" "}
                  <span className="tabular-nums text-[var(--color-muted)]">
                    {group.items.length}{" "}
                    {group.items.length === 1 ? "equation" : "equations"}
                  </span>
                </p>
              </header>
              <ul className="space-y-7">
                {group.items.map((eq, i) => (
                  <li
                    key={`${group.slug}:${i}`}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                      {eq.label ?? (eq.kind === "Equation" ? "Eq." : "")}
                    </span>
                    <div className="min-w-0 overflow-x-auto">
                      <TeX expr={eq.expr} display />
                      {eq.note && (
                        <p className="mt-1 px-1 text-center text-xs italic leading-relaxed text-[var(--color-muted)]">
                          {eq.note}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-xs tabular-nums text-[var(--color-subtle)]">
                      {eq.number ? `(${eq.number})` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Container>
  );
}
