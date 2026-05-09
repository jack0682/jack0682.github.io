import Link from "next/link";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { PaletteTrigger } from "./PaletteTrigger";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Full list for the mobile drawer — includes Tags. */
const mobileNav = [
  { href: "/research/", label: "Research" },
  { href: "/scc/",      label: "SCC" },
  { href: "/onn/",      label: "ONN" },
  { href: "/papers/",   label: "Papers" },
  { href: "/journal/",  label: "Journal" },
  { href: "/notes/",    label: "Notes" },
  { href: "/refs/",     label: "Refs" },
  { href: "/tags/",     label: "Tags" },
  { href: "/about/",    label: "About" },
];


/**
 * Site-wide top bar. Deliberately unornamented — the design language
 * is carried by typography and the accent colour, not by surfaces.
 *
 * Below `lg` the nav list is collapsed into a hamburger drawer
 * (`MobileNav`). At or above `lg` the inline nav is shown.
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

          {/* Desktop nav — inline only on lg+; md still uses hamburger
              to avoid a cramped 7-item bar between 768–1023px. */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 sm:gap-2 lg:flex"
          >
            <NavLinks />
            <span
              aria-hidden
              className="mx-3 hidden h-4 w-px bg-[var(--color-rule)] sm:inline-block"
            />
            <MagneticButton>
              <PaletteTrigger />
            </MagneticButton>
            <MagneticButton>
              <ThemeToggle />
            </MagneticButton>
          </nav>

          {/* Mobile nav */}
          <MobileNav items={mobileNav} />
        </div>
      </Container>
    </header>
  );
}
