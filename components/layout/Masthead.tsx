import Link from "next/link";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const nav = [
  { href: "/research/", label: "Research" },
  { href: "/papers/", label: "Papers" },
  { href: "/journal/", label: "Journal" },
  { href: "/notes/", label: "Notes" },
  { href: "/about/", label: "About" },
];

/**
 * Site-wide top bar. Deliberately unornamented — the design language
 * is carried by typography and the accent colour, not by surfaces.
 *
 * Below `md` the nav list is collapsed into a hamburger drawer
 * (`MobileNav`). At or above `md` the inline nav is shown.
 */
export function Masthead() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-rule)]/60 bg-[var(--color-bg)]/80 pt-[env(safe-area-inset-top)] backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between sm:h-16">
          <Link
            href="/"
            className="font-display text-base tracking-tight text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
          >
            Jaehong&nbsp;Oh
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 sm:gap-2 md:flex"
          >
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

          {/* Mobile nav */}
          <MobileNav items={nav} />
        </div>
      </Container>
    </header>
  );
}
