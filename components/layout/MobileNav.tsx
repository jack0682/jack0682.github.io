"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { tween, useHydrated } from "@/lib/motion";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/cn";

type Item = { href: string; label: string };

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      element.getAttribute("aria-hidden") !== "true" &&
      element.getClientRects().length > 0,
  );
}

function trapTabKey(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== "Tab") return;

  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const current = document.activeElement;

  if (!container.contains(current)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (event.shiftKey && current === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && current === last) {
    event.preventDefault();
    first.focus();
  }
}

/**
 * Mobile hamburger drawer — shown only below `md`. Handles ESC to
 * close, backdrop click to close, body-scroll lock while open, and
 * auto-close on route change (via pathname effect at mount).
 */
export function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const mounted = useHydrated();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const restoreFocusRef = useRef(true);

  // Keep keyboard focus inside the modal and restore it on close.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      triggerRef.current ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (panelRef.current) trapTabKey(e, panelRef.current);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    const focusFrame = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      (firstLinkRef.current ?? getFocusableElements(panel)[0] ?? panel).focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(focusFrame);

      const shouldRestoreFocus = restoreFocusRef.current;
      restoreFocusRef.current = true;
      if (shouldRestoreFocus) {
        window.requestAnimationFrame(() => {
          if (previouslyFocused?.isConnected) {
            previouslyFocused.focus({ preventScroll: true });
          }
        });
      }
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-haspopup="dialog"
        onClick={() => {
          restoreFocusRef.current = true;
          setOpen(true);
        }}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full",
          "text-[var(--color-muted)] transition-colors",
          "hover:bg-[var(--color-rule)]/40 hover:text-[var(--color-ink)]",
        )}
      >
        <Menu size={20} strokeWidth={1.75} />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className="fixed inset-0 z-[1000]"
                style={{ isolation: "isolate" }}
              >
                {/* backdrop — fully opaque-enough to kill any bleed-through.
                    No backdrop-filter: that would create a containing block
                    and cause the panel to blend weirdly. */}
                <motion.button
                  key="mobile-nav-backdrop"
                  type="button"
                  tabIndex={-1}
                  aria-label="Close navigation menu"
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-black/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={tween.quick}
                />

                {/* sliding panel */}
                <motion.aside
                  ref={panelRef}
                  tabIndex={-1}
                  key="mobile-nav-panel"
                  className={cn(
                    "absolute right-0 top-0 z-[1] flex h-[100dvh] max-h-[100dvh] w-[min(22rem,85vw)] flex-col overflow-y-auto overscroll-contain",
                    "bg-[var(--color-surface)] text-[var(--color-ink)]",
                    "border-l border-[var(--color-rule)]",
                    "shadow-[-24px_0_48px_-12px_rgba(0,0,0,0.25)]",
                    "pt-[max(1.25rem,env(safe-area-inset-top))]",
                    "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
                    "pl-7 pr-6",
                  )}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={tween.panel}
                >
              <div className="flex shrink-0 items-center justify-between">
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

              {/* Search trigger — first slot in the drawer because
                   this is the only mobile path to ⌘K. Closes the
                   drawer first, then dispatches the keyboard shortcut
                   to open the palette. */}
              <button
                type="button"
                onClick={() => {
                  restoreFocusRef.current = false;
                  setOpen(false);
                  // Wait one frame for the drawer to start collapsing
                  // so the palette mounts cleanly above the page.
                  requestAnimationFrame(() => {
                    const isMac = navigator.platform.toLowerCase().includes("mac");
                    document.dispatchEvent(
                      new KeyboardEvent("keydown", {
                        key: "k",
                        metaKey: isMac,
                        ctrlKey: !isMac,
                        bubbles: true,
                      }),
                    );
                  });
                }}
                aria-label="Open search"
                className={cn(
                  "mt-10 flex shrink-0 items-center gap-3 rounded-sm border border-[var(--color-rule)] px-4 py-3",
                  "text-left text-sm text-[var(--color-muted)] transition-colors",
                  "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                )}
              >
                <Search size={16} strokeWidth={1.5} className="shrink-0" />
                <span className="flex-1">Search research docs, notes, papers…</span>
                <kbd className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  ⌘K
                </kbd>
              </button>

              <nav aria-label="Primary" className="mt-8 flex shrink-0 flex-col">
                <ul className="flex flex-col">
                  {items.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={() => {
                          restoreFocusRef.current = false;
                          setOpen(false);
                        }}
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

              <div className="mt-auto flex shrink-0 items-center justify-between pt-8">
                <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
