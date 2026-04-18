import Link from "next/link";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { PaletteTrigger } from "./PaletteTrigger";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

/**
 * Primary nav. Tags is intentionally excluded here and kept in the
 * Footer only — the top bar is for the main reading surfaces, not
 * for every index. Notes sits in Writing alongside Papers/Journal.
 */
const nav = [
  { href: "/research/", label: "Research" },
  { href: "/scc/", label: "SCC" },
  { href: "/onn/", label: "ONN" },
  { href: "/papers/", label: "Papers" },
  { href: "/journal/", label: "Journal" },
  { href: "/notes/", label: "Notes" },
  { href: "/about/", label: "About" },
];

/** Full list for the mobile drawer — includes Tags. */
const mobileNav = [...nav.slice(0, -1), { href: "/tags/", label: "Tags" }, nav[nav.length - 1]];

/**
 * Site-wide top bar. Deliberately unornamented — the design language
 * is carried by typography and the accent colour, not by surfaces.
 *
 * Below `md` the nav list is collapsed into a hamburger drawer
 * (`MobileNav`). At or above `md` the inline nav is shown.
 */
export function Masthead() {
  return (
    <header className="liquid-glass--bar sticky top-0 z-30 pt-[env(safe-area-inset-top)]">
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
            <PaletteTrigger />
            <ThemeToggle />
          </nav>

          {/* Mobile nav */}
          <MobileNav items={mobileNav} />
        </div>
      </Container>
    </header>
  );
}
