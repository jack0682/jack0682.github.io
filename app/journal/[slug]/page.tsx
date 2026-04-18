import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RelatedDocs } from "@/components/layout/RelatedDocs";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { allNotes, journalEntries, papers } from "@/lib/content";
import { formatDate, toIsoDate } from "@/lib/format";

export function generateStaticParams() {
  return journalEntries.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) return {};
  const ogImage = `/og/journal/${entry.slug}.png`;
  return {
    title: entry.title,
    description: entry.summary,
    openGraph: {
      title: entry.title,
      description: entry.summary,
      type: "article",
      publishedTime: entry.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: entry.title }],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
  };
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) notFound();

  const crumbs = [
    { href: "/journal/", label: "Journal" },
    { label: entry.date.slice(0, 7) },
    { label: entry.title.length > 60 ? entry.title.slice(0, 58) + "…" : entry.title },
  ];

  const referencedNotes = allNotes.filter((n) => entry.refs?.includes(n.slug));
  const referencedPapers = papers.filter((p) => entry.refs?.includes(p.slug));

  return (
    <Container width="prose">
      <header className="pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-28">
        <Breadcrumb items={crumbs} />
        <p className="mb-4 sci-eyebrow text-xs text-[var(--color-accent)] sm:mb-5">
          <span className="sci-section-mark mr-2 not-italic text-[0.95em]">
            ∂
          </span>
          Journal
          {entry.track && (
            <span className="ml-2 text-[var(--color-muted)] normal-case tracking-normal">
              · {entry.track}
            </span>
          )}
        </p>
        <h1 className="font-display text-[clamp(1.75rem,5.5vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)]">
          {entry.title}
        </h1>
        <time
          dateTime={toIsoDate(entry.date)}
          className="mt-6 block font-mono text-xs text-[var(--color-subtle)]"
        >
          {formatDate(entry.date)}
        </time>
      </header>

      <Prose className="border-t border-[var(--color-rule)] pt-10">
        <MDXContent code={entry.body} />
      </Prose>

      <RelatedDocs
        relatedNotes={referencedNotes}
        relatedPapers={referencedPapers}
      />
    </Container>
  );
}
