import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TOC } from "@/components/layout/TOC";
import { DocMeta } from "@/components/layout/DocMeta";
import { FocusToggle } from "@/components/layout/FocusToggle";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { allNotes, crossRefsFor, prevNextInPart } from "@/lib/content";
import { RelatedDocs } from "@/components/layout/RelatedDocs";
import { articleSchema, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return allNotes.map((note) => ({
    part: `part-${note.part}`,
    slug: note.slug,
  }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ part: string; slug: string }> };

function parsePart(seg: string): number | null {
  const m = seg.match(/^part-(\d+)$/);
  return m ? Number(m[1]) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { part, slug } = await params;
  const partNum = parsePart(part);
  if (partNum === null) return {};
  const note = allNotes.find((n) => n.part === partNum && n.slug === slug);
  if (!note) return {};
  const ogImage = `/og/notes/${note.slug}.png`;
  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      title: note.title,
      description: note.summary,
      images: [{ url: ogImage, width: 1200, height: 630, alt: note.title }],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
  };
}

export default async function NotePage({ params }: Props) {
  const { part, slug } = await params;
  const partNum = parsePart(part);
  if (partNum === null) notFound();
  const note = allNotes.find((n) => n.part === partNum && n.slug === slug);
  if (!note) notFound();

  const isSccPart0 = note.part === 0;
  const crumbs = [
    { href: "/notes/", label: "Notes" },
    isSccPart0
      ? { href: "/scc/", label: `Part ${note.part} · SCC` }
      : { href: `/notes/part-${note.part}/`, label: `Part ${note.part}` },
    { label: note.section ?? note.title },
  ];

  const refs = crossRefsFor(note.slug);
  const { prev, next } = prevNextInPart(note.slug);

  return (
    <>
      <FocusToggle />
      <TOC toc={note.toc} />
      <Container width="prose" data-track={note.track}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(
              articleSchema({
                title: note.title,
                permalink: note.permalink,
                description: note.summary,
                ogImage: `/og/notes/${note.slug}.png`,
                datePublished: note.date,
                dateModified: note.updated,
                wordCount: note.metadata.wordCount,
                keywords: note.tags,
              }),
            ),
          }}
        />
        <header className="pt-10 pb-6 sm:pt-20 sm:pb-10 md:pt-28">
          <Breadcrumb items={crumbs} />
          <p className="mb-4 sci-eyebrow text-xs text-[var(--color-accent)] sm:mb-5">
            <span className="sci-section-mark mr-2 not-italic text-[0.95em]">
              ℓ
            </span>
            Part {note.part}
            {note.section && (
              <span className="ml-2 text-[var(--color-muted)] normal-case tracking-normal">
                · {note.section}
              </span>
            )}
          </p>
          <h1 className="font-display text-[clamp(1.5rem,6.5vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)]">
            {note.title}
          </h1>
          <DocMeta
            published={note.date}
            updated={note.updated}
            readingTime={note.metadata.readingTime}
            wordCount={note.metadata.wordCount}
          />
        </header>

        <Prose essay className="border-t border-[var(--color-rule)] pt-10">
          <MDXContent code={note.body} />
        </Prose>

        {/* prev / next navigation within the same part */}
        {(prev || next) && (
          <nav className="mt-16 grid gap-4 border-t border-[var(--color-rule)] pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={prev.permalink}
                className="group flex flex-col gap-1 pr-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
                  ← Previous
                </span>
                <span className="text-sm leading-snug text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={next.permalink}
                className="group flex flex-col gap-1 pl-4 text-right sm:items-end"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
                  Next →
                </span>
                <span className="text-sm leading-snug text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}

        <RelatedDocs
          relatedNotes={refs.relatedNotes}
          relatedPapers={refs.relatedPapers}
          citingJournal={refs.citingJournal}
          citedBy={refs.citedByNotes}
        />
      </Container>
    </>
  );
}
