import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/mdx/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { PageEnter } from "@/components/motion/PageEnter";
import { journalEntries } from "@/lib/content";
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
  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) notFound();

  return (
    <PageEnter>
      <Container width="prose">
        <header className="pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-28">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-accent)] sm:mb-5">
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
      </Container>
    </PageEnter>
  );
}
