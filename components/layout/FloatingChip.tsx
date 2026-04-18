"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SearchItem } from "@/lib/content";

type Section = {
  mark: string;
  label: string;
  /** URL to jump back to the section index. */
  index: string;
  /** Items to display in the sheet (already scoped to this section). */
  siblings: SearchItem[];
};

/**
 * Persistent, bottom-right anchor chip. Displays the current
 * section in a small-caps academic form ("§ Part 0 · SCC") and,
 * when tapped, opens a sheet listing sibling documents plus a
 * shortcut that triggers ⌘K. Stays out of the way on desktop;
 * on mobile it is the primary cross-section jump control.
 */
export function FloatingChip({ items }: { items: SearchItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const section = useMemo<Section | null>(
    () => deriveSection(pathname, items),
    [pathname, items],
  );

  // Hide on home & not-found
  if (!section) return null;
  if (!mounted) return null;

  // Trigger ⌘K palette by dispatching the shortcut event.
  const openPalette = () => {
    setOpen(false);
    // microtask so the sheet closes first
    queueMicrotask(() => {
      const ev = new KeyboardEvent("keydown", {
        key: "k",
        metaKey: navigator.platform.toLowerCase().includes("mac"),
        ctrlKey: !navigator.platform.toLowerCase().includes("mac"),
        bubbles: true,
      });
      document.dispatchEvent(ev);
    });
  };

  return (
    <>
      {/* the chip itself — flat rectangle with a left accent tick,
          matching the site's sharp geometry (rounded-full removed). */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`${section.label} — open section menu`}
        className={cn(
          "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40",
          "group inline-flex items-stretch border border-[var(--color-rule)]",
          "bg-[var(--color-surface)] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.28)]",
          "text-[var(--color-ink)] transition-colors",
          "hover:border-[var(--color-accent)]",
        )}
      >
        <span
          aria-hidden
          className="flex w-8 items-center justify-center bg-[var(--color-accent)] text-[var(--color-surface)] transition-colors"
        >
          <span className="sci-section-mark text-base italic leading-none">
            {section.mark}
          </span>
        </span>
        <span className="flex items-center px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors group-hover:text-[var(--color-accent)]">
          {section.label}
        </span>
      </button>

      {/* sheet */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Section menu"
              className="fixed inset-0 z-[60]"
              style={{ isolation: "isolate" }}
            >
              <motion.button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute inset-0 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />
              <motion.div
                className={cn(
                  "absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto",
                  "sm:bottom-auto sm:left-auto sm:right-6 sm:top-auto",
                  "sm:bottom-[max(4.5rem,env(safe-area-inset-bottom))]",
                  "sm:w-[22rem] sm:rounded-sm sm:border sm:border-[var(--color-rule)]",
                  "bg-[#ffffff] text-[#1a1814] dark:bg-[#171411] dark:text-[#ede7db]",
                  "shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)]",
                  "px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
                )}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="sci-section-mark text-lg italic leading-none text-[var(--color-accent)]"
                    >
                      {section.mark}
                    </span>
                    <p className="sci-eyebrow text-xs text-[var(--color-accent)]">
                      {section.label}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="text-[var(--color-subtle)] hover:text-[var(--color-ink)]"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </div>

                {/* section index link */}
                <Link
                  href={section.index}
                  className="mt-4 block text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                >
                  ← Index of {section.label}
                </Link>

                {/* siblings */}
                {section.siblings.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-[var(--color-rule)] pt-4">
                    {section.siblings.slice(0, 8).map((s) => (
                      <li key={s.permalink}>
                        <Link
                          href={s.permalink}
                          className="block rounded-[2px] border-l border-[var(--color-rule)] pl-3 py-1.5 text-[13px] leading-snug text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {/* palette shortcut */}
                <button
                  type="button"
                  onClick={openPalette}
                  className={cn(
                    "mt-5 flex w-full items-center justify-between",
                    "border border-dashed border-[var(--color-rule)] px-3 py-2 text-left",
                    "text-[13px] text-[var(--color-muted)] transition-colors",
                    "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                  )}
                >
                  <span>Search everything</span>
                  <kbd className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                    ⌘ K
                  </kbd>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

/* ── section inference from pathname ─────────────────────── */

function deriveSection(
  pathname: string | null,
  items: SearchItem[],
): Section | null {
  if (!pathname || pathname === "/") return null;

  // Part 0 / SCC
  if (pathname.startsWith("/scc") || pathname.startsWith("/notes/part-0")) {
    const siblings = items.filter((i) =>
      i.permalink.startsWith("/notes/part-0/"),
    );
    return {
      mark: "§",
      label: "Part 0 · SCC",
      index: "/scc/",
      siblings,
    };
  }

  // ONN hub
  if (pathname.startsWith("/onn")) {
    const siblings = items.filter(
      (i) => i.kind === "paper" && i.group.toLowerCase().includes("papers"),
    );
    return {
      mark: "χ",
      label: "ONN · Hub",
      index: "/onn/",
      siblings,
    };
  }

  // Other notes parts
  const partMatch = pathname.match(/^\/notes\/part-(\d+)/);
  if (partMatch) {
    const partNum = Number(partMatch[1]);
    const siblings = items.filter((i) =>
      i.permalink.startsWith(`/notes/part-${partNum}/`),
    );
    return {
      mark: "ℓ",
      label: `Part ${partNum} · Notes`,
      index: "/notes/",
      siblings,
    };
  }

  if (pathname.startsWith("/notes")) {
    return {
      mark: "ℓ",
      label: "Notes",
      index: "/notes/",
      siblings: items.filter((i) => i.permalink.startsWith("/notes/")),
    };
  }

  if (pathname.startsWith("/papers")) {
    return {
      mark: "χ",
      label: "Papers",
      index: "/papers/",
      siblings: items.filter((i) => i.permalink.startsWith("/papers/")),
    };
  }

  if (pathname.startsWith("/journal")) {
    return {
      mark: "∂",
      label: "Journal",
      index: "/journal/",
      siblings: items.filter((i) => i.permalink.startsWith("/journal/")),
    };
  }

  if (pathname.startsWith("/research")) {
    return {
      mark: "∮",
      label: "Research",
      index: "/research/",
      siblings: items.filter((i) => i.permalink.startsWith("/research/")),
    };
  }

  if (pathname.startsWith("/about")) {
    return {
      mark: "α",
      label: "About",
      index: "/about/",
      siblings: [],
    };
  }

  return null;
}
