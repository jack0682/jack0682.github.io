"use client";

import { useEffect, useState } from "react";
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
 * Floating table-of-contents rail. Visible only on xl+ viewports,
 * where the prose container leaves room on the right. Highlights the
 * currently-intersecting heading using IntersectionObserver.
 */
export function TOC({ toc }: { toc: TocItem[] }) {
  const flat = flatten(toc).filter((x) => x.depth < 2);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (flat.length === 0) return;
    const ids = flat.map((i) => i.url.replace(/^#/, ""));
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer entries that are intersecting; otherwise keep the last.
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

  if (flat.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed right-10 top-32 w-[15rem] text-sm"
    >
      <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
        Contents
      </p>
      <ul className="space-y-2 border-l border-[var(--color-rule)]">
        {flat.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
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
    </nav>
  );
}
