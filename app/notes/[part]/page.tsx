import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { allNotes, notesForPart } from "@/lib/content";

/* ── Part metadata ─────────────────────────────────────────────── */

const partMeta: Record<
  number,
  { title: string; lead: string }
> = {
  0: {
    title: "Part 0 · Soft Cognitive Cohesion",
    lead: "The canonical specification, research status, integrated architecture, and foundational claims of the SCC programme.",
  },
  1: {
    title: "Part I · Foundations of RelationWorld",
    lead: "Eight chapters building the core formalism — relations, relational fields, fruits, stems, doors, existence, and the notion of a world.",
  },
  2: {
    title: "Part II · Main Theorems & Examples",
    lead: "Complete proofs of Theorems A–H and worked examples in U(1) gauge theory.",
  },
  3: {
    title: "Part III · Cohomology",
    lead: "The Cech cohomology framework and three computational axes for topological readout.",
  },
  4: {
    title: "Part IV · Dynamics",
    lead: "Yang–Mills gradient flow on the discrete gauge configuration and time evolution of world snapshots.",
  },
  5: {
    title: "Part V · Applications",
    lead: "Connections to physics (topological order, Chern–Simons), topology (graph classification), and combinatorics.",
  },
  6: {
    title: "Part VI · Frontiers & Open Problems",
    lead: "Conjectures, remaining questions, and directions for future work.",
  },
  7: {
    title: "Part VII · Robotics",
    lead: "End-to-end mobile manipulator pipeline grounded in the RelationWorld formalism.",
  },
  8: {
    title: "Appendices",
    lead: "Unified notation, mathematical prerequisites, the discrete–continuous correspondence dictionary, and hybrid dynamics.",
  },
};

/* ── Static params ─────────────────────────────────────────────── */

const PART_RE = /^part-(\d+)$/;

export function generateStaticParams() {
  // Part index pages — canonical
  const parts = Array.from(new Set(allNotes.map((n) => n.part))).map((p) => ({
    part: `part-${p}`,
  }));
  // Slug aliases (legacy `/notes/<slug>/` → `/notes/part-N/<slug>/`).
  // Drop any slug that collides with the `part-N` index pattern, otherwise
  // generateStaticParams emits duplicate route entries and the build fails
  // (or, worse, the alias silently shadows the index page).
  const reserved = new Set(parts.map((p) => p.part));
  const slugParams = allNotes
    .filter((n) => !PART_RE.test(n.slug) && !reserved.has(n.slug))
    .map((n) => ({ part: n.slug }));
  return [...parts, ...slugParams];
}

export const dynamicParams = false;

type Props = { params: Promise<{ part: string }> };

function parsePart(seg: string): number | null {
  const m = seg.match(PART_RE);
  return m ? Number(m[1]) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { part } = await params;
  const partNum = parsePart(part);
  if (partNum !== null) {
    const meta = partMeta[partNum];
    return {
      title: meta?.title ?? `Part ${partNum}`,
      description: meta?.lead,
    };
  }
  // Slug alias
  const note = allNotes.find((n) => n.slug === part);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/notes/part-${note.part}/${note.slug}/` },
  };
}

export default async function PartIndexOrAlias({ params }: Props) {
  const { part } = await params;
  const partNum = parsePart(part);

  /* ── slug alias: redirect /notes/<slug>/ → /notes/part-N/<slug>/ ──
   * Under output: 'export' the redirect() call materialises as a static
   * HTML page with a meta-refresh tag at build time — fine for legacy
   * inbound links but the canonical URL is always /notes/part-N/<slug>/. */
  if (partNum === null) {
    const note = allNotes.find((n) => n.slug === part);
    if (!note) notFound();
    redirect(`/notes/part-${note.part}/${note.slug}/`);
  }

  const items = notesForPart(partNum);
  const meta = partMeta[partNum] ?? {
    title: `Part ${partNum}`,
    lead: "",
  };

  const crumbs = [
    { href: "/notes/", label: "Notes" },
    { label: meta.title },
  ];

  return (
    <Container>
      <div className="pt-16 sm:pt-20 md:pt-28">
        <Breadcrumb items={crumbs} />
      </div>
      <PageHeader
        mark="ℓ"
        eyebrow={`Part ${partNum}`}
        title={meta.title}
        lead={meta.lead}
        className="pt-4 md:pt-6"
      />

      {items.length === 0 ? (
        <p className="text-[var(--color-muted)]">
          No published notes in this part yet.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
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
      )}

      {/* footer — back to all notes */}
      <div className="mt-16 flex flex-wrap gap-6 border-t border-[var(--color-rule)] pt-8 text-sm">
        <Link
          href="/notes/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← All notes
        </Link>
        {partNum === 0 && (
          <Link
            href="/scc/"
            className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            SCC hub →
          </Link>
        )}
      </div>
    </Container>
  );
}
