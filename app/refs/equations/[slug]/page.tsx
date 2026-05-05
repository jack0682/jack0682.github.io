import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeX } from "@/components/mdx/TeX";
import { equationsBySource } from "@/lib/content";

const collectionLabel: Record<string, string> = {
  notes: "Notes",
  onn: "ONN",
  papers: "Papers",
  journal: "Journal",
};

const allEquationGroups = equationsBySource();

export function generateStaticParams() {
  return allEquationGroups.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = allEquationGroups.find((g) => g.slug === slug);
  if (!group) return { title: "Equations · not found" };
  return {
    title: `Equations · ${group.title}`,
    description: `${group.items.length} equations extracted from ${group.title}, with the prose paragraph immediately before each as a description.`,
  };
}

export default async function EquationsDetailPage({ params }: Props) {
  const { slug } = await params;
  const group = allEquationGroups.find((g) => g.slug === slug);
  if (!group) notFound();

  return (
    <Container>
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/refs/", label: "Reference" },
            { href: "/refs/equations/", label: "Equations" },
            { label: group.title },
          ]}
        />
      </div>
      <PageHeader
        mark="∑"
        eyebrow={collectionLabel[group.collection] ?? group.collection}
        title={group.title}
        lead={`${group.items.length} ${group.items.length === 1 ? "equation" : "equations"} extracted from this document. Each equation pairs with the prose paragraph that immediately precedes it in the source — clicking the title above opens the full document.`}
        className="pt-0 md:pt-0"
      />

      <p className="mb-10 -mt-2">
        <Link
          href={group.permalink}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)] transition-colors hover:text-[var(--color-accent)]"
        >
          Open source document →
        </Link>
      </p>

      <ol className="space-y-12 border-t border-[var(--color-rule)] pt-10">
        {group.items.map((eq, i) => (
          <li
            key={`${group.slug}:${i}`}
            id={`eq-${i + 1}`}
            className="scroll-mt-24"
          >
            <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)] tabular-nums">
                {eq.number ?? `#${i + 1}`}
              </span>
              <div className="min-w-0">
                {eq.label && (
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    {eq.label}
                  </p>
                )}
                {eq.description && (
                  <p className="mb-4 max-w-[44rem] text-sm italic leading-relaxed text-[var(--color-muted)]">
                    {eq.description}
                  </p>
                )}
                <div className="overflow-x-auto rounded-sm border border-[var(--color-rule)]/60 bg-[var(--color-surface)]/50 px-4 py-5">
                  <TeX expr={eq.expr} display />
                </div>
                {eq.note && (
                  <p className="mt-3 max-w-[44rem] text-xs italic leading-relaxed text-[var(--color-muted)]">
                    {eq.note}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
