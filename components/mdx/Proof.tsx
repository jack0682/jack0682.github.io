import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Mathematical proof block. Ends with a Halmos tombstone (∎).
 */
export function Proof({
  children,
  className,
  of,
}: {
  children: ReactNode;
  className?: string;
  of?: string;
}) {
  return (
    <section
      className={cn("my-8 text-[var(--color-ink)]/90 leading-relaxed", className)}
    >
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        Proof{of && <span className="ml-2 normal-case italic">of {of}</span>}.
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
