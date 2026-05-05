import Link from "next/link";
import { cn } from "@/lib/cn";
import { VisitedMark } from "./VisitedMark";

type NoteRef = {
  slug: string;
  title: string;
  permalink: string;
  section?: string;
  part?: number;
};
type PaperRef = {
  slug: string;
  title: string;
  permalink: string;
  year?: number;
  status?: string;
};
type JournalRef = {
  slug: string;
  title: string;
  permalink: string;
  date: string;
};
type CitedByRef = {
  from: string;
  title: string;
  permalink: string;
  collection: "notes" | "onn" | "papers" | "journal";
  date?: string;
};

const collectionLabel: Record<CitedByRef["collection"], string> = {
  notes: "note",
  onn: "ONN",
  papers: "paper",
  journal: "journal",
};

/**
 * Cross-reference rail at the bottom of detail pages. Up to four
 * columns: forward `relatedNotes`, `relatedPapers`, `citingJournal`,
 * and inbound `citedBy`. Columns are flow-laid; absent columns are
 * silently dropped.
 */
export function RelatedDocs({
  relatedNotes = [],
  relatedPapers = [],
  citingJournal = [],
  citedBy = [],
  className,
}: {
  relatedNotes?: NoteRef[];
  relatedPapers?: PaperRef[];
  citingJournal?: JournalRef[];
  citedBy?: CitedByRef[];
  className?: string;
}) {
  const columns = [
    relatedNotes.length > 0 && (
      <Column key="notes" label="Adjacent notes">
        {relatedNotes.map((n) => (
          <Row key={n.slug} slug={n.slug} href={n.permalink} title={n.title} meta={n.section} />
        ))}
      </Column>
    ),
    relatedPapers.length > 0 && (
      <Column key="papers" label="Related papers">
        {relatedPapers.map((p) => (
          <Row
            key={p.slug}
            slug={p.slug}
            href={p.permalink}
            title={p.title}
            meta={[p.status, p.year].filter(Boolean).join(" · ")}
          />
        ))}
      </Column>
    ),
    citingJournal.length > 0 && (
      <Column key="journal" label="Mentioned in journal">
        {citingJournal.map((j) => (
          <Row
            key={j.slug}
            slug={j.slug}
            href={j.permalink}
            title={j.title}
            meta={j.date}
          />
        ))}
      </Column>
    ),
    citedBy.length > 0 && (
      <Column key="cited" label="Cited by">
        {citedBy.map((e) => (
          <Row
            key={`${e.collection}:${e.from}`}
            slug={e.from}
            href={e.permalink}
            title={e.title}
            meta={[collectionLabel[e.collection], e.date].filter(Boolean).join(" · ")}
          />
        ))}
      </Column>
    ),
  ].filter(Boolean);

  if (columns.length === 0) return null;

  return (
    <aside
      aria-label="Related documents"
      className={cn(
        "mt-16 border-t border-[var(--color-rule)] pt-10",
        "grid gap-10 md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] md:gap-8",
        className,
      )}
    >
      {columns}
    </aside>
  );
}

function Column({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 sci-eyebrow text-[11px] text-[var(--color-subtle)]">
        {label}
      </p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function Row({
  href,
  title,
  meta,
  slug,
}: {
  href: string;
  title: string;
  meta?: string;
  slug?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group relative block border-l border-[var(--color-rule)] pl-3",
          "transition-[border-color,transform,padding-left] duration-200",
          "hover:border-[var(--color-accent)] hover:pl-4 motion-reduce:hover:pl-3 motion-reduce:hover:translate-x-0",
        )}
      >
        <span className="flex items-baseline gap-2">
          <span className="block flex-1 text-sm leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
            {title}
          </span>
          {slug && <VisitedMark slug={slug} />}
          <span
            aria-hidden
            className="font-mono text-[11px] text-[var(--color-subtle)] opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)] group-hover:opacity-100"
          >
            →
          </span>
        </span>
        {meta && (
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
            {meta}
          </span>
        )}
      </Link>
    </li>
  );
}
