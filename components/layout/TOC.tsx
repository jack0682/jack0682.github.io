"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/cn";

type TocItem = {
  title: string;
  url: string;
  items?: TocItem[];
};

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
 * Flatten Velite's nested TOC into a single ordered list, up to
 * depth 2, for a compact right-margin rail.
 */
function flatten(items: TocItem[], depth = 0): Array<TocItem & { depth: number }> {
  return items.flatMap((item) => [
    { ...item, depth },
    ...flatten(item.items ?? [], depth + 1),
  ]);
}

/**
 * Table-of-contents component.
 *
 * - **xl+**: Fixed right-margin rail (unchanged behaviour).
 * - **below xl**: Floating "Contents" button at bottom-left that
 *   opens a slide-up drawer with the same TOC items.
 */
export function TOC({ toc }: { toc: TocItem[] }) {
  const flat = flatten(toc).filter((x) => x.depth < 2);
  const [active, setActive] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* ── IntersectionObserver for active heading ──────────────── */
  useEffect(() => {
    if (flat.length === 0) return;
    const ids = flat.map((i) => i.url.replace(/^#/, ""));
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 1] },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [flat]);

  /* ── Modal keyboard handling + scroll lock ───────────────── */
  useEffect(() => {
    if (!drawerOpen) return;

    const previouslyFocused =
      triggerRef.current ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setDrawerOpen(false);
        return;
      }
      if (drawerRef.current) trapTabKey(e, drawerRef.current);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    const focusFrame = window.requestAnimationFrame(() => {
      const drawer = drawerRef.current;
      if (!drawer) return;
      (getFocusableElements(drawer)[0] ?? drawer).focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(focusFrame);
      window.requestAnimationFrame(() => {
        if (previouslyFocused?.isConnected) {
          previouslyFocused.focus({ preventScroll: true });
        }
      });
    };
  }, [drawerOpen]);

  const handleItemClick = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  if (flat.length < 2) return null;

  const tocList = (
    <ul className="space-y-2 border-l border-[var(--color-rule)]">
      {flat.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            onClick={handleItemClick}
            className={cn(
              "-ml-px block border-l pl-4 py-0.5 transition-colors",
              item.depth === 1 && "pl-6",
              active === item.url
                ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]",
            )}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* ── Desktop: fixed sidebar (xl+) ────────────────────── */}
      <nav
        aria-label="Table of contents"
        className="hidden xl:block fixed right-10 top-32 max-h-[calc(100vh-9rem)] w-[15rem] overflow-y-auto overscroll-contain pr-1 text-sm"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Contents
        </p>
        {tocList}
      </nav>

      {/* ── Mobile/Tablet: floating button + drawer (< xl) ──── */}
      <div className="xl:hidden">
        {/* floating trigger — flat rectangle with left accent tick,
            matching the FloatingChip geometry. */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label="Toggle table of contents"
          aria-expanded={drawerOpen}
          aria-controls="mobile-toc-dialog"
          aria-haspopup="dialog"
          className={cn(
            "liquid-glass",
            "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-40",
            "group inline-flex h-11 items-stretch overflow-hidden rounded-sm transition-colors",
          )}
        >
          <span
            aria-hidden
            className="flex w-11 shrink-0 items-center justify-center bg-[var(--color-accent)] text-[var(--color-surface)] transition-colors"
          >
            <span className="sci-section-mark text-base italic leading-none">
              ☰
            </span>
          </span>
          <span
            className={cn(
              "hidden items-center px-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors sm:flex",
              drawerOpen
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-muted)] group-hover:text-[var(--color-accent)]",
            )}
          >
            Contents
          </span>
        </button>

        {/* backdrop */}
        {drawerOpen && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close table of contents"
            className="fixed inset-0 z-50 bg-black/30"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* drawer */}
        <div
          ref={drawerRef}
          id="mobile-toc-dialog"
          role="dialog"
          aria-modal={drawerOpen || undefined}
          aria-labelledby="mobile-toc-title"
          aria-hidden={!drawerOpen}
          inert={!drawerOpen}
          tabIndex={-1}
          className={cn(
            "liquid-glass",
            "fixed bottom-0 left-0 right-0 z-[60] max-h-[70dvh] overflow-y-auto overscroll-contain px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 text-sm transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)]",
            drawerOpen
              ? "translate-y-0"
              : "pointer-events-none translate-y-full",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <p
              id="mobile-toc-title"
              className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]"
            >
              Contents
            </p>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex h-11 items-center px-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              Close
            </button>
          </div>
          <nav aria-label="Table of contents">{tocList}</nav>
        </div>
      </div>
    </>
  );
}
