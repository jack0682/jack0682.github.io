"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/cn";

type Item = { href: string; label: string };

/**
 * Mobile hamburger drawer — shown only below `md`. Handles ESC to
 * close, backdrop click to close, body-scroll lock while open, and
 * auto-close on route change (via pathname effect at mount).
 */
export function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close on ESC; restore body scroll.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    // focus first link after open animation begins
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 80);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full",
          "text-[var(--color-muted)] transition-colors",
          "hover:bg-[var(--color-rule)]/40 hover:text-[var(--color-ink)]",
        )}
      >
        <Menu size={20} strokeWidth={1.75} />
      </button>

      <AnimatePresence>
        {open && (
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-50"
          >
            {/* backdrop — independently animated, no backdrop-filter so
                it doesn't create a stacking context that bleeds into
                the panel */}
            <motion.button
              key="mobile-nav-backdrop"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* sliding panel — explicit z-index, opaque surface colour
                via inline style so it is guaranteed independent of any
                CSS-variable resolution weirdness from Tailwind v4's
                arbitrary-value syntax */}
            <motion.aside
              key="mobile-nav-panel"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-ink)",
              }}
              className={cn(
                "absolute right-0 top-0 z-10 flex h-full w-[min(22rem,85vw)] flex-col",
                "border-l border-[var(--color-rule)]",
                "shadow-[-24px_0_48px_-12px_rgba(0,0,0,0.25)]",
                "pt-[max(1.25rem,env(safe-area-inset-top))]",
                "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
                "pl-7 pr-6",
              )}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base text-[var(--color-ink)]">
                  Jaehong&nbsp;Oh
                </span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-full",
                    "text-[var(--color-muted)] transition-colors",
                    "hover:bg-[var(--color-rule)]/40 hover:text-[var(--color-ink)]",
                  )}
                >
                  <X size={20} strokeWidth={1.75} />
                </button>
              </div>

              <nav aria-label="Primary" className="mt-12 flex flex-col">
                <ul className="flex flex-col">
                  {items.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block border-b border-[var(--color-rule)]/50 py-4",
                          "font-display text-2xl tracking-tight text-[var(--color-ink)]",
                          "transition-colors hover:text-[var(--color-accent)]",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex items-center justify-between pt-8">
                <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
