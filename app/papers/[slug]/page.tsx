import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RelatedDocs } from "@/components/layout/RelatedDocs";
import { CopyBibtexButton } from "@/components/layout/CopyBibtexButton";
import { TOC } from "@/components/layout/TOC";
import { DocMeta } from "@/components/layout/DocMeta";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { allNotes, journalEntries, papers } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { scholarlyArticleSchema, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = papers.find((p) => p.slug === slug);
  if (!paper) return {};
  const ogImage = `/og/papers/${paper.slug}.png`;
  return {
    title: paper.title,
    description: paper.abstract.slice(0, 200),
    openGraph: {
      title: paper.title,
      description: paper.abstract.slice(0, 200),
      type: "article",
      authors: paper.authors,
      images: [{ url: ogImage, width: 1200, height: 630, alt: paper.title }],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
    other: {
      "citation_title": paper.title,
      "citation_author": paper.authors.join("; "),
      "citation_publication_date": paper.date.slice(0, 10),
      ...(paper.doi && { "citation_doi": paper.doi }),
      ...(paper.pdf && { "citation_pdf_url": absoluteUrl(paper.pdf) }),
    },
  };
}

const statusLabel: Record<string, string> = {
  published: "Published",
  accepted: "Accepted",
  submitted: "Submitted",
  preprint: "Preprint",
  "in-progress": "In progress",
};

export default async function PaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = papers.find((p) => p.slug === slug);
  if (!paper) notFound();

  const crumbs = [
    { href: "/papers/", label: "Papers" },
    { label: paper.year.toString() },
    { label: paper.title.length > 60 ? paper.title.slice(0, 58) + "…" : paper.title },
  ];

  const relatedNotes = allNotes.filter((n) =>
    paper.related?.includes(n.slug),
  );
  const citingJournal = journalEntries.filter((j) =>
    j.refs?.includes(paper.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            scholarlyArticleSchema({
              title: paper.title,
              permalink: paper.permalink,
              abstract: paper.abstract,
              authors: paper.authors,
              datePublished: paper.date,
              dateModified: paper.updated,
              ogImage: `/og/papers/${paper.slug}.png`,
              doi: paper.doi,
              arxiv: paper.arxiv,
              pdf: paper.pdf,
              venue: paper.venue,
              keywords: paper.tags,
            }),
          ),
        }}
      />
      <TOC toc={paper.toc} />
      <Container width="prose">
        <header className="pt-10 pb-6 sm:pt-20 sm:pb-10 md:pt-28">
          <Breadcrumb items={crumbs} />
          <p className="mb-4 sci-eyebrow text-xs text-[var(--color-accent)] sm:mb-5">
            <span className="sci-section-mark mr-2 not-italic text-[0.95em]">
              χ
            </span>
            {statusLabel[paper.status]} · {paper.year}
            {paper.venue && (
              <span className="ml-2 inline-block break-words text-[var(--color-muted)] normal-case tracking-normal">
                · {paper.venue}
              </span>
            )}
          </p>
          <h1 className="font-display text-[clamp(1.5rem,6.5vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)]">
            {paper.title}
          </h1>
          <p className="mt-6 text-base text-[var(--color-muted)]">
            {paper.authors.join(", ")}
          </p>
          <DocMeta
            published={paper.date}
            updated={paper.updated}
            readingTime={paper.metadata.readingTime}
            wordCount={paper.metadata.wordCount}
            className="mt-2"
          />

          {(paper.pdf || paper.arxiv || paper.doi) && (
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              {paper.pdf && (
                <a
                  href={paper.pdf}
                  className="border-b border-[var(--color-ink)] pb-0.5 text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  PDF ↗
                </a>
              )}
              {paper.arxiv && (
                <a
                  href={paper.arxiv}
                  className="border-b border-[var(--color-ink)] pb-0.5 text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  arXiv ↗
                </a>
              )}
              {paper.doi && (
                <a
                  href={paper.doi}
                  className="border-b border-[var(--color-ink)] pb-0.5 text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  DOI ↗
                </a>
              )}
            </div>
          )}
        </header>

        <section className="border-t border-[var(--color-rule)] pt-10 pb-10 -mx-4 px-4 bg-[var(--color-surface)]/50 rounded">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Abstract
          </p>
          <p className="text-lg leading-relaxed text-[var(--color-ink)]/90">
            {paper.abstract}
          </p>
        </section>

        <Prose className="mt-14 border-t border-[var(--color-rule)] pt-10">
          <MDXContent code={paper.body} />
        </Prose>

        <RelatedDocs
          relatedNotes={relatedNotes}
          citingJournal={citingJournal}
        />

        {paper.bibtex && (
          <section className="mt-12 border-t border-[var(--color-rule)] pt-8">
            <div className="flex items-baseline justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
                BibTeX
              </p>
              <CopyBibtexButton bibtex={paper.bibtex} />
            </div>
            <pre className="mt-4 overflow-x-auto rounded border border-[var(--color-rule)] bg-[var(--color-surface)] p-4 font-mono text-xs leading-relaxed text-[var(--color-muted)]">
              {paper.bibtex}
            </pre>
          </section>
        )}
      </Container>
    </>
  );
}
