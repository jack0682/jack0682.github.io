import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { TOC } from "@/components/layout/TOC";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { PageEnter } from "@/components/motion/PageEnter";
import { allNotes } from "@/lib/content";

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

  return (
    <>
      <TOC toc={note.toc} />
      <PageEnter>
        <Container width="prose">
          <header className="pt-20 pb-10 md:pt-28">
            <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Part {note.part}
              {note.section && (
                <span className="ml-2 text-[var(--color-muted)] normal-case tracking-normal">
                  · {note.section}
                </span>
              )}
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.01em] text-[var(--color-ink)]">
              {note.title}
            </h1>
          </header>

          <Prose essay className="border-t border-[var(--color-rule)] pt-10">
            <MDXContent code={note.body} />
          </Prose>
        </Container>
      </PageEnter>
    </>
  );
}
