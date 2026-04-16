import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type Crumb = {
  href?: string;
  label: string;
};

/**
 * Breadcrumb trail — shown at the top of detail pages to expose
 * the section hierarchy. Styled to sit just above the page title
 * without competing with it.
 *
 *   Notes › Part 0 · SCC › Canonical Spec
 *
 * The last item is rendered as static text (no href). Any crumb
 * with an `href` becomes a link; otherwise it is inert.
 */
export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "-mt-4 mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1",
        "font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-subtle)]",
        className,
      )}
    >
      {items.map((c, i) => {
        const last = i === items.length - 1;
        const content = c.href && !last ? (
          <Link
            href={c.href}
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            {c.label}
          </Link>
        ) : (
          <span className={last ? "text-[var(--color-muted)]" : ""}>
            {c.label}
          </span>
        );
        return (
          <span key={`${c.label}-${i}`} className="inline-flex items-center">
            {content}
            {!last && (
              <ChevronRight
                size={12}
                strokeWidth={1.5}
                aria-hidden
                className="mx-1.5 opacity-60"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}
