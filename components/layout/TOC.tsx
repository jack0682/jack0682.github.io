"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

type TocItem = {
  title: string;
  url: string;
  items?: TocItem[];
};

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

  /* ── Close drawer on ESC ─────────────────────────────────── */
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
        className="hidden xl:block fixed right-10 top-32 w-[15rem] text-sm"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Contents
        </p>
        {tocList}
      </nav>

      {/* ── Mobile/Tablet: floating button + drawer (< xl) ──── */}
      <div className="xl:hidden">
        {/* floating trigger */}
        <button
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label="Toggle table of contents"
          aria-expanded={drawerOpen}
          className={cn(
            "fixed bottom-6 left-6 z-50 flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium shadow-md transition-colors",
            drawerOpen
              ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
              : "border-[var(--color-rule)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-ink)]",
          )}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
            Contents
          </span>
        </button>

        {/* backdrop */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* drawer */}
        <nav
          aria-label="Table of contents"
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 max-h-[60vh] overflow-y-auto rounded-t-2xl border-t bg-[var(--color-bg)] px-6 pb-8 pt-6 text-sm shadow-xl transition-transform duration-300 ease-out",
            "border-[var(--color-rule)]",
            drawerOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
              Contents
            </p>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              Close
            </button>
          </div>
          {tocList}
        </nav>
      </div>
    </>
  );
}
