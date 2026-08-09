import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CollaborationCTA } from "@/components/layout/CollaborationCTA";
import { papers } from "@/lib/content";
import {
  paperClaimLabel,
  paperPublicSummary,
  paperStatusLabel,
} from "@/lib/publication-status";

export const metadata: Metadata = {
  alternates: { canonical: "/papers/" },
  title: "Papers",
  description:
    "Published and in-progress papers, with abstracts, status, and links to preprints and supporting artefacts.",
};

export default function PapersPage() {
  return (
    <Container>
      <PageHeader
        mark="χ"
        eyebrow="Papers"
        title="Manuscripts."
        lead="Publication state and research-claim state are shown separately. Audited manuscripts remain part of the record, with current findings placed before their historical abstracts."
      />

      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <li key={paper.slug}>
            <Link
              href={paper.permalink}
              className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-accent)]"
            >
              <div className="relative aspect-[1200/630] overflow-hidden rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)] transition-colors group-hover:border-[var(--color-accent)]">
                <Image
                  src={`/og/papers/${paper.slug}.png`}
                  alt=""
                  width={1200}
                  height={630}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015] motion-reduce:group-hover:scale-100"
                />
                {/* Publication state and claim state are independent. */}
                <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
                  <span className="inline-flex items-center bg-[var(--color-bg)]/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] backdrop-blur-sm">
                    {paperStatusLabel(paper.status)}
                  </span>
                  {paper.claimStatus !== "current" && (
                    <span className="inline-flex items-center bg-[var(--color-ink)]/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-bg)] backdrop-blur-sm">
                      {paperClaimLabel(paper.claimStatus)}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-1 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  <span>{paper.year}</span>
                  {paper.venue && (
                    <>
                      <span aria-hidden>·</span>
                      <span className="text-[var(--color-muted)] normal-case tracking-normal">
                        {paper.venue}
                      </span>
                    </>
                  )}
                </p>
                <h2 className="font-display text-lg leading-[1.2] tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-xl">
                  {paper.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-subtle)]">
                  {paper.authors.join(", ")}
                </p>
                {paper.claimStatus !== "current" && (
                  <p className="mt-3 line-clamp-3 border-l border-[var(--color-accent)]/50 pl-3 text-xs leading-relaxed text-[var(--color-muted)]">
                    {paperPublicSummary(paper)}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <CollaborationCTA context="papers" />
    </Container>
  );
}
