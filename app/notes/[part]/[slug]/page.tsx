import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TOC } from "@/components/layout/TOC";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { allNotes, crossRefsFor } from "@/lib/content";
import { RelatedDocs } from "@/components/layout/RelatedDocs";

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
  return {
    title: note.title,
    description: note.summary,
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
      : { label: `Part ${note.part}` },
    { label: note.section ?? note.title },
  ];

  const refs = crossRefsFor(note.slug);

  return (
    <>
      <TOC toc={note.toc} />
      <Container width="prose">
        <header className="pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-28">
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
          <h1 className="font-display text-[clamp(1.75rem,5.5vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)]">
            {note.title}
          </h1>
        </header>

        <Prose essay className="border-t border-[var(--color-rule)] pt-10">
          <MDXContent code={note.body} />
        </Prose>

        <RelatedDocs
          relatedNotes={refs.relatedNotes}
          relatedPapers={refs.relatedPapers}
          citingJournal={refs.citingJournal}
        />
      </Container>
    </>
  );
}
