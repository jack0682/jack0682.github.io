import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { NotesConstellation } from "@/components/layout/NotesConstellation";
import { notesByPart, PART_META } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/notes/" },
  title: "Notes",
  description:
    "The Mousse-notes — a long book on the algebraic and topological foundations underlying the rest of the research.",
};

export default function NotesPage() {
  return (
    <Container>
      <PageHeader
        mark="ℓ"
        eyebrow="Notes"
        title="Mousse-notes."
        lead="A long, chapter-by-chapter book on the algebraic and topological foundations underlying the rest of the research. The constellation below is the structure at a glance — each dot a note, edges drawn from explicit cross-references."
      />

      <NotesConstellation
        notesByPart={notesByPart.map(([p, items]) => [
          p,
          items.map((n) => ({
            slug: n.slug,
            title: n.title,
            part: n.part,
            chapter: n.chapter,
            kind: n.kind,
            related: n.related,
          })),
        ])}
        className="mb-14"
      />

      <div className="space-y-14 border-t border-[var(--color-rule)] pt-12 sm:space-y-16 sm:pt-14">
        {notesByPart.map(([part, items]) => (
          <section key={part}>
            <h2 className="font-display text-xl leading-snug tracking-tight text-[var(--color-ink)] sm:text-2xl">
              {PART_META[part]?.title ?? `Part ${part}`}
            </h2>
            <ul className="mt-5 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)] sm:mt-6">
              {items.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/notes/part-${note.part}/${note.slug}/`}
                    className="group flex items-baseline gap-4 py-5 sm:gap-6"
                  >
                    <span className="shrink-0 font-mono text-xs text-[var(--color-subtle)] sm:w-12">
                      {note.chapter !== undefined
                        ? `§${note.part}.${note.chapter}`
                        : `§${note.part}`}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-base leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-lg">
                        {note.title}
                      </p>
                      {note.summary && (
                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                          {note.summary}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
