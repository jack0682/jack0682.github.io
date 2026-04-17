import Link from "next/link";
import { Container } from "./Container";

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
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { href: "https://github.com/jack0682", label: "GitHub" },
      { href: "/about/", label: "About & CV" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
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
        <div className="flex flex-col gap-2 border-t border-[var(--color-rule)] py-6 text-xs text-[var(--color-subtle)] sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <span>© {year} Jaehong Oh.</span>
          <span className="font-mono">jack0682.github.io</span>
        </div>
      </Container>
    </footer>
  );
}
