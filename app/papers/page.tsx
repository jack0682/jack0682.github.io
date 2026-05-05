import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { papers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Papers",
  description:
    "Published and in-progress papers, with abstracts, status, and links to preprints and supporting artefacts.",
};

const statusLabel: Record<string, string> = {
  published: "Published",
  accepted: "Accepted",
  submitted: "Submitted",
  preprint: "Preprint",
  "in-progress": "In progress",
};

export default function PapersPage() {
  return (
    <Container>
      <PageHeader
        mark="χ"
        eyebrow="Papers"
        title="Manuscripts."
        lead="Published, submitted, and in-progress manuscripts. Each card opens the abstract page; status, year, and venue are surfaced inline."
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
                {/* status chip — overlaid on the cover */}
                <span className="absolute left-3 top-3 inline-flex items-center bg-[var(--color-bg)]/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] backdrop-blur-sm">
                  {statusLabel[paper.status] ?? paper.status}
                </span>
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
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
