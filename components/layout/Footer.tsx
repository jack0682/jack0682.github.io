import Link from "next/link";
import { Container } from "./Container";
import { papers, allNotes, journalEntries, onnAllDocs } from "@/lib/content";
import { IDENTITY_LINKS } from "@/lib/identity";

const cols = [
  {
    heading: "Research",
    links: [
      { href: "/research/onn/", label: "Ontology Neural Network" },
      { href: "/research/perception/", label: "Perception" },
      { href: "/research/theory/", label: "Mathematical theory" },
      { href: "/research/control/", label: "Delay-robust control" },
      { href: "/research/robotics/", label: "Robotics" },
    ],
  },
  {
    heading: "Writing",
    links: [
      { href: "/scc/", label: "SCC · hub" },
      { href: "/onn/", label: "ONN · hub" },
      { href: "/papers/", label: "Papers" },
      { href: "/journal/", label: "Journal" },
      { href: "/notes/", label: "Notes" },
      { href: "/refs/", label: "Reference indexes" },
      { href: "/tags/", label: "Tags" },
      { href: "/bookmarks/", label: "Bookmarks" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      ...IDENTITY_LINKS.map((l) => ({ href: l.href, label: l.label })),
      { href: "/feed.xml", label: "RSS Feed" },
      { href: "/about/", label: "About & CV" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  // Build-time counts so the footer reads as a living status line.
  const stats = [
    { label: "papers", n: papers.length },
    { label: "notes", n: allNotes.length + onnAllDocs.length },
    { label: "journal", n: journalEntries.length },
  ];

  return (
    <footer className="mt-40 border-t border-[var(--color-rule)]">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-3">
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
                {col.heading}
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-muted)]">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-[var(--color-ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── live status line — build-time counts ─────────── */}
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-[var(--color-rule)] pb-5 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
          <span className="flex items-center gap-2 text-[var(--color-accent)]">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 animate-pulse bg-[var(--color-accent)]"
            />
            ∮ ongoing
          </span>
          {stats.map((s) => (
            <span key={s.label}>
              <span className="tabular-nums text-[var(--color-ink)]">{s.n}</span>{" "}
              {s.label}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--color-rule)] py-6 text-xs text-[var(--color-subtle)] sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <span>© {year} Jaehong Oh.</span>
          <div className="flex items-center gap-5 font-mono">
            <a
              href="/feed.xml"
              className="transition-colors hover:text-[var(--color-accent)]"
              aria-label="Subscribe via Atom feed"
            >
              <span aria-hidden>∿</span> atom
            </a>
            <span>jack0682.github.io</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
