import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  equations,
  idsByKind,
  glossary,
  sccChangelog,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Cross-document indexes — every formal equation, theorem, open problem, glossary entry, and canonical version, extracted from the SCC and ONN notes and surfaced together.",
};

type Card = {
  href: string;
  label: string;
  description: string;
  count: number;
  unit: string;
};

export default function RefsHubPage() {
  const cards: Card[] = [
    {
      href: "/refs/equations/",
      label: "Equation index",
      description:
        "Every `<Equation>` JSX block plus every `$$ ... $$` display math span across the site, grouped by source document.",
      count: equations.length,
      unit: "equations",
    },
    {
      href: "/refs/theorems/",
      label: "Theorem index",
      description:
        "T-… IDs (theorems, lemmas, propositions, corollaries) extracted from raw MDX, sorted alphanumerically with the document each one first appears in.",
      count: idsByKind("theorem").length,
      unit: "IDs",
    },
    {
      href: "/refs/open-problems/",
      label: "Open problems",
      description:
        "OP-XXXX IDs surfaced across the notes — registered, partially resolved, retracted — each linking back to where the problem is most fully discussed.",
      count: idsByKind("openProblem").length,
      unit: "open problems",
    },
    {
      href: "/notes/part-0/scc-glossary/",
      label: "Glossary",
      description:
        "Plain-language definitions for D-XXXX / S-XXXX / A-XXXX formal IDs. Term hover-cards across the site pull from this entry.",
      count: Object.keys(glossary).length,
      unit: "entries",
    },
    {
      href: "/scc/changelog/",
      label: "Canonical changelog",
      description:
        "Every journal entry that named a canonical version, ordered newest first. Each row links to the originating weekly entry.",
      count: sccChangelog.length,
      unit: "versions",
    },
    {
      href: "/scc/dag/",
      label: "Dependency DAG",
      description:
        "Auto-laid-out directed graph of every theorem-kind note and the explicit `related` edges between them. Pan + pinch supported.",
      count: 0,
      unit: "graph",
    },
  ];

  return (
    <Container>
      <PageHeader
        mark="∴"
        eyebrow="Reference"
        title="Indexes."
        lead="Cross-document jump-tables. Every entry is auto-generated at build time from the underlying notes, so it stays in sync with the source."
      />

      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group block py-7 sm:py-8"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] md:w-44 md:shrink-0">
                  {c.count > 0 ? (
                    <>
                      <span className="tabular-nums text-[var(--color-ink)]">
                        {c.count}
                      </span>{" "}
                      {c.unit}
                    </>
                  ) : (
                    c.unit
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-xl leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-2xl">
                    {c.label}
                  </h2>
                  <p className="mt-2 max-w-[44rem] text-sm leading-relaxed text-[var(--color-muted)]">
                    {c.description}
                  </p>
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
        ))}
      </ul>
    </Container>
  );
}
