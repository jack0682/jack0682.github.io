import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { journalEntries } from "@/lib/content";
import { formatDate, toIsoDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "A dated journal of research in progress — conjectures, intermediate results, and the things that did not work.",
};

export default function JournalPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Journal"
        title="Research in motion."
        lead="A dated journal of work in progress — curated excerpts from the daily notebook, surfacing the open questions and intermediate results that shape the research."
      />

      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {journalEntries.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={entry.permalink}
              className="group block py-8 transition-colors"
            >
              <div className="flex items-baseline gap-6">
                <time
                  dateTime={toIsoDate(entry.date)}
                  className="font-mono text-xs text-[var(--color-subtle)] w-24 shrink-0"
                >
                  {formatDate(entry.date)}
                </time>
                <div className="flex-1">
                  <h2 className="font-display text-2xl leading-tight tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                    {entry.title}
                  </h2>
                  {entry.summary && (
                    <p className="mt-2 max-w-[40rem] text-sm leading-relaxed text-[var(--color-muted)]">
                      {entry.summary}
                    </p>
                  )}
                  {entry.track && (
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
                      {entry.track}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
