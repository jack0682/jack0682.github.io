import type { Metadata } from "next";
import Link from "next/link";
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
        lead="Published, submitted, and in-progress manuscripts. Each entry links to the abstract page and, where available, to the preprint PDF and supporting artefacts."
      />

      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {papers.map((paper) => (
          <li key={paper.slug}>
            <Link
              href={paper.permalink}
              className="group block py-8 transition-colors sm:py-10"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                <span className="order-1 font-mono text-xs text-[var(--color-subtle)] sm:order-none sm:pt-2">
                  {paper.year}
                </span>
                <div className="order-3 flex-1 sm:order-none">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)] sm:mb-3">
                    {statusLabel[paper.status] ?? paper.status}
                    {paper.venue && (
                      <span className="ml-2 text-[var(--color-muted)] normal-case tracking-normal">
                        · {paper.venue}
                      </span>
                    )}
                  </p>
                  <h2 className="font-display text-xl leading-[1.15] tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-2xl">
                    {paper.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-muted)] sm:mt-3">
                    {paper.authors.join(", ")}
                  </p>
                  {paper.abstract && (
                    <p className="mt-3 line-clamp-2 max-w-[52rem] text-sm leading-relaxed text-[var(--color-subtle)] sm:mt-4">
                      {paper.abstract}
                    </p>
                  )}
                </div>
                <span
                  aria-hidden
                  className="hidden font-mono text-xs text-[var(--color-subtle)] transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)] sm:inline sm:pt-2"
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
