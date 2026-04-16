import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { TOC } from "@/components/layout/TOC";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { PageEnter } from "@/components/motion/PageEnter";
import { papers } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = papers.find((p) => p.slug === slug);
  if (!paper) return {};
  return {
    title: paper.title,
    description: paper.abstract.slice(0, 200),
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

  return (
    <>
      <TOC toc={paper.toc} />
      <PageEnter>
        <Container width="prose">
          <header className="pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-28">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-accent)] sm:mb-5">
              {statusLabel[paper.status]} · {paper.year}
              {paper.venue && (
                <span className="ml-2 inline-block break-words text-[var(--color-muted)] normal-case tracking-normal">
                  · {paper.venue}
                </span>
              )}
            </p>
            <h1 className="font-display text-[clamp(1.75rem,5.5vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)]">
              {paper.title}
            </h1>
            <p className="mt-6 text-base text-[var(--color-muted)]">
              {paper.authors.join(", ")}
            </p>
            <time
              dateTime={paper.date}
              className="mt-2 block font-mono text-xs text-[var(--color-subtle)]"
            >
              {formatDate(paper.date)}
            </time>

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

          <section className="border-t border-[var(--color-rule)] pt-10">
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
        </Container>
      </PageEnter>
    </>
  );
}
