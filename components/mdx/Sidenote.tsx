import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tufte-style sidenote. On wide viewports it floats into the right
 * margin; on narrow it collapses inline with subtle indentation.
 *
 * Two labelling modes:
 *   - `n`      → numbered footnote style, rendered as a superscript
 *                 numeral prefix. Pair with <SidenoteRef n={…}/> in the
 *                 body for a reference link.
 *   - `label`  → free-text prefix (legacy).
 */
export function Sidenote({
  children,
  className,
  label,
  n,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  n?: number | string;
}) {
  return (
    <aside
      id={n !== undefined ? `sn-${n}` : undefined}
      className={cn(
        "my-4 text-sm leading-relaxed text-[var(--color-muted)]",
        "border-l border-[var(--color-rule)] pl-4",
        "xl:float-right xl:clear-right xl:-mr-[16rem] xl:w-[14rem] xl:my-0",
        "xl:border-l-0 xl:border-none xl:pl-0",
        className,
      )}
    >
      {n !== undefined ? (
        <sup className="mr-1 font-mono text-[0.7em] font-medium text-[var(--color-accent)]">
          {n}
        </sup>
      ) : label ? (
        <span className="mr-1 font-mono text-xs text-[var(--color-accent)]">
          {label}
        </span>
      ) : null}
      {children}
    </aside>
  );
}

/**
 * Inline superscript reference marker. Place in prose at the point where
 * a sidenote is anchored; links to `#sn-{n}`.
 *
 *   This claim needs elaboration.<SidenoteRef n={1}/>
 *   <Sidenote n={1}>…</Sidenote>
 */
export function SidenoteRef({ n }: { n: number | string }) {
  return (
    <a
      href={`#sn-${n}`}
      className="sci-sidenote-ref no-underline"
      aria-label={`Sidenote ${n}`}
    >
      {n}
    </a>
  );
}
