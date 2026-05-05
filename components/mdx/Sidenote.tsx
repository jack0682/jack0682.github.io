import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tufte-style sidenote.
 *
 *   - xl+      floats into the right margin (true Tufte sidenote)
 *   - below xl collapses to a `<details>` accordion so a long note
 *              doesn't dominate the prose column on phones / tablets
 *
 * Two labelling modes:
 *   - `n`      → numbered footnote style, rendered as a superscript
 *                 numeral prefix. Pair with <SidenoteRef n={…}/> in the
 *                 body for a reference link.
 *   - `label`  → free-text prefix (legacy).
 *
 * Markup is rendered twice (mobile-collapsible + desktop-floating)
 * because `<details>` open/closed state isn't CSS-overridable. The
 * cost is one duplicated subtree per sidenote — negligible since
 * sidenote bodies are short by convention.
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
  const id = n !== undefined ? `sn-${n}` : undefined;
  const tag = n !== undefined ? (
    <sup className="mr-1 font-mono text-[0.7em] font-medium text-[var(--color-accent)]">
      {n}
    </sup>
  ) : label ? (
    <span className="mr-1 font-mono text-xs text-[var(--color-accent)]">
      {label}
    </span>
  ) : null;

  return (
    <>
      {/* Mobile / tablet: collapsible accordion */}
      <details
        id={id}
        className={cn(
          "my-4 xl:hidden",
          "rounded-sm border-l border-[var(--color-rule)] pl-4 text-sm leading-relaxed text-[var(--color-muted)]",
          "marker:hidden [&_summary::-webkit-details-marker]:hidden",
          className,
        )}
      >
        <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {n !== undefined
            ? `Sidenote ${n}`
            : label ?? "Sidenote"}
          <span aria-hidden className="ml-2 text-[var(--color-subtle)] [details[open]_&]:hidden">
            ▾
          </span>
        </summary>
        <div className="mt-2">{children}</div>
      </details>

      {/* xl+: floating Tufte sidenote */}
      <aside
        // duplicate id is fine because the mobile copy is hidden via
        // `xl:hidden` and the desktop copy uses `hidden xl:block`;
        // only one is in document flow at a time.
        id={id ? `${id}-xl` : undefined}
        className={cn(
          "hidden xl:block xl:float-right xl:clear-right xl:-mr-[16rem] xl:w-[14rem]",
          "text-sm leading-relaxed text-[var(--color-muted)]",
          className,
        )}
      >
        {tag}
        {children}
      </aside>
    </>
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
