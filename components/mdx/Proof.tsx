import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CATEGORY, type TheoremCategory } from "./categories";

/**
 * Mathematical proof block. Ends with a Halmos tombstone (∎).
 */
export function Proof({
  children,
  className,
  of,
  category,
}: {
  children: ReactNode;
  className?: string;
  of?: string;
  /** Verification status of the proven claim — same vocabulary as `<Theorem>`. */
  category?: TheoremCategory;
}) {
  const cat = category ? CATEGORY[category] : null;
  return (
    <section
      className={cn("my-8 text-[var(--color-ink)]/90 leading-relaxed", className)}
    >
      <p className="mb-2 flex flex-wrap items-baseline gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        <span>
          Proof{of && <span className="ml-2 normal-case italic">of {of}</span>}.
        </span>
        {cat && (
          <span
            title={cat.tooltip}
            className={cn(
              "ml-auto inline-flex items-center border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] normal-case",
              cat.className,
            )}
          >
            {cat.label}
          </span>
        )}
      </p>
      <div className="relative pr-8">
        {children}
        <span
          aria-label="end of proof"
          className="absolute bottom-0 right-0 text-[var(--color-muted)]"
        >
          ∎
        </span>
      </div>
    </section>
  );
}
