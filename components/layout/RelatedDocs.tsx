import Link from "next/link";
import { cn } from "@/lib/cn";

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

/**
 * Three-column (desktop) / stacked (mobile) cross-reference rail.
 * Rendered at the bottom of detail pages; absent columns are
 * silently dropped so it never looks empty.
 */
export function RelatedDocs({
  relatedNotes = [],
  relatedPapers = [],
  citingJournal = [],
  className,
}: {
  relatedNotes?: NoteRef[];
  relatedPapers?: PaperRef[];
  citingJournal?: JournalRef[];
  className?: string;
}) {
  const columns = [
    relatedNotes.length > 0 && (
      <Column key="notes" label="Adjacent notes">
        {relatedNotes.map((n) => (
          <Row key={n.slug} href={n.permalink} title={n.title} meta={n.section} />
        ))}
      </Column>
    ),
    relatedPapers.length > 0 && (
      <Column key="papers" label="Related papers">
        {relatedPapers.map((p) => (
          <Row
            key={p.slug}
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
            href={j.permalink}
            title={j.title}
            meta={j.date}
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
}: {
  href: string;
  title: string;
  meta?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group block border-l border-[var(--color-rule)] pl-3 transition-colors hover:border-[var(--color-accent)]"
      >
        <span className="block text-sm leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
          {title}
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
