import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { notesByPart } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "The Mousse-notes — a long book on the algebraic and topological foundations underlying the rest of the research.",
};

const partTitles: Record<number, string> = {
  0: "Part 0 · Pre-ontology",
  1: "Part I · Foundations",
  2: "Part II · Theorems",
  3: "Part III · Cohomology",
  4: "Part IV · Dynamics",
  5: "Part V · Applications",
  6: "Part VI · Frontiers",
  7: "Part VII · Robotics",
};

export default function NotesPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Notes"
        title="Mousse-notes."
        lead="A long, chapter-by-chapter book on the algebraic and topological foundations underlying the rest of the research. Chapters appear here as they are cleaned for public reading."
      />

      <div className="space-y-16 border-t border-[var(--color-rule)] pt-14">
        {notesByPart.map(([part, items]) => (
          <section key={part}>
            <h2 className="font-display text-2xl tracking-tight text-[var(--color-ink)]">
              {partTitles[part] ?? `Part ${part}`}
            </h2>
            <ul className="mt-6 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {items.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/notes/part-${note.part}/${note.slug}/`}
                    className="group flex items-baseline gap-6 py-5"
                  >
                    <span className="font-mono text-xs text-[var(--color-subtle)] w-12 shrink-0">
                      {note.chapter !== undefined
                        ? `§${note.part}.${note.chapter}`
                        : `§${note.part}`}
                    </span>
                    <div className="flex-1">
                      <p className="text-lg text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
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
