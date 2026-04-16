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
        eyebrow="Papers"
        title="Manuscripts."
        lead="Published, submitted, and in-progress manuscripts. Each entry links to the abstract page and, where available, to the preprint PDF and supporting artefacts."
      />

      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {papers.map((paper) => (
          <li key={paper.slug}>
            <Link
              href={paper.permalink}
              className="group block py-10 transition-colors"
            >
              <div className="flex items-start gap-6">
                <span className="font-mono text-xs text-[var(--color-subtle)] pt-2">
                  {paper.year}
                </span>
                <div className="flex-1">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    {statusLabel[paper.status] ?? paper.status}
                    {paper.venue && (
                      <span className="text-[var(--color-muted)] normal-case tracking-normal ml-2">
                        · {paper.venue}
                      </span>
                    )}
                  </p>
                  <h2 className="font-display text-2xl leading-[1.15] tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                    {paper.title}
                  </h2>
                  <p className="mt-3 text-sm text-[var(--color-muted)]">
                    {paper.authors.join(", ")}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="font-mono text-xs text-[var(--color-subtle)] pt-2 transition-colors group-hover:text-[var(--color-accent)]"
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
