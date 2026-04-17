import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RelatedDocs } from "@/components/layout/RelatedDocs";
import { TOC } from "@/components/layout/TOC";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { allNotes, journalEntries, onnAllDocs, papers } from "@/lib/content";

export function generateStaticParams() {
  return onnAllDocs.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = onnAllDocs.find((d) => d.slug === slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.summary };
}

export default async function OnnDocPage({ params }: Props) {
  const { slug } = await params;
  const doc = onnAllDocs.find((d) => d.slug === slug);
  if (!doc) notFound();

  const crumbs = [
    { href: "/onn/", label: "ONN · Hub" },
    { label: doc.section ?? doc.title },
  ];

  // cross-refs: other ONN docs explicitly related + ONN-track papers + journal entries referencing this slug
  const relatedOnn = doc.related
    .map((s) => onnAllDocs.find((d) => d.slug === s))
    .filter((d): d is (typeof onnAllDocs)[number] => Boolean(d))
    .map((d) => ({ ...d, part: 0 }));
  const relatedNotes = allNotes.filter((n) => doc.related.includes(n.slug));
  const relatedPapers = papers.filter(
    (p) => p.track === "onn" || p.related?.includes(doc.slug),
  );
  const citingJournal = journalEntries.filter((j) => j.refs?.includes(doc.slug));

  return (
    <>
      <TOC toc={doc.toc} />
      <Container width="prose">
        <header className="pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-28">
          <Breadcrumb items={crumbs} />
          <p className="mb-4 sci-eyebrow text-xs text-[var(--color-accent)] sm:mb-5">
            <span className="sci-section-mark mr-2 not-italic text-[0.95em]">
              χ
            </span>
            ONN
            {doc.section && (
              <span className="ml-2 text-[var(--color-muted)] normal-case tracking-normal">
                · {doc.section}
              </span>
            )}
          </p>
          <h1 className="font-display text-[clamp(1.75rem,5.5vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)]">
            {doc.title}
          </h1>
          {doc.summary && (
            <p className="mt-6 max-w-[44rem] text-base leading-relaxed text-[var(--color-muted)]">
              {doc.summary}
            </p>
          )}
        </header>

        <Prose essay className="border-t border-[var(--color-rule)] pt-10">
          <MDXContent code={doc.body} />
        </Prose>

        <RelatedDocs
          relatedNotes={[...relatedOnn, ...relatedNotes]}
          relatedPapers={relatedPapers}
          citingJournal={citingJournal}
        />
      </Container>
    </>
  );
}
