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
  className?: string;
};

/**
 * Numbered display equation. Lays out as a three-column grid:
 *
 *   [label?]   [equation, centered]            [(number)?]
 *
 * All three rails collapse gracefully on narrow viewports.
 */
export function Equation({ expr, number, label, className }: Props) {
  return (
    <div
      className={cn(
        "my-8 grid grid-cols-[auto_1fr_auto] items-center gap-4",
        className,
      )}
    >
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
        {label ?? ""}
      </span>
      <div className="min-w-0 overflow-x-auto text-center">
        <TeX expr={expr} display />
      </div>
      <span className="font-mono text-xs tabular-nums text-[var(--color-subtle)]">
        {number ? `(${number})` : ""}
      </span>
    </div>
  );
}
