import { TeX } from "./TeX";
import { cn } from "@/lib/cn";

type Props = {
  /** TeX source for the equation body (display-mode by default). */
  expr: string;
  /**
   * Equation number, right-aligned. Rendered as `(number)` to match the
   * mathematical-paper convention. Leave undefined for an unnumbered
   * block.
   */
  number?: string;
  /** Optional inline label rendered left of the equation (e.g. "Def."). */
  label?: string;
  /**
   * Optional plain-language note rendered as a small italic line
   * below the equation rail. Use sparingly — for hover-friendly
   * theorem-level paraphrase, use `<Theorem gloss>` instead.
   */
  note?: string;
  className?: string;
};

/**
 * Numbered display equation. Lays out as a three-column grid:
 *
 *   [label?]   [equation, centered]            [(number)?]
 *
 * All three rails collapse gracefully on narrow viewports.
 */
export function Equation({ expr, number, label, note, className }: Props) {
  return (
    <div
      id={number ? `eq-${number}` : undefined}
      className={cn("my-8 scroll-mt-24", className)}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
          {label ?? ""}
        </span>
        <div className="min-w-0 overflow-x-auto text-center">
          <TeX expr={expr} display />
        </div>
        {number ? (
          <a
            href={`#eq-${number}`}
            aria-label={`Link to equation ${number}`}
            className="font-mono text-xs tabular-nums text-[var(--color-subtle)] transition-colors hover:text-[var(--color-accent)]"
          >
            ({number})
          </a>
        ) : (
          <span className="font-mono text-xs tabular-nums text-[var(--color-subtle)]" />
        )}
      </div>
      {note && (
        <p className="mt-2 px-4 text-center text-xs italic leading-relaxed text-[var(--color-muted)]">
          {note}
        </p>
      )}
    </div>
  );
}
