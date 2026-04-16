import Link from "next/link";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const nav = [
  { href: "/research/", label: "Research" },
  { href: "/papers/", label: "Papers" },
  { href: "/journal/", label: "Journal" },
  { href: "/about/", label: "About" },
];

/**
 * Site-wide top bar. Deliberately unornamented — the design language
 * is carried by typography and the accent colour, not by surfaces.
 */
export function Masthead() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-rule)]/60 bg-[var(--color-bg)]/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-base tracking-tight text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
          >
            Jaehong&nbsp;Oh
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <ul className="flex items-center gap-6 text-sm font-medium text-[var(--color-muted)]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[var(--color-accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span
              aria-hidden
              className="mx-3 hidden h-4 w-px bg-[var(--color-rule)] sm:inline-block"
            />
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  );
}
