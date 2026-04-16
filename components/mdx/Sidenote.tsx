import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tufte-style sidenote. On wide viewports it floats into the right
 * margin; on narrow it collapses inline with subtle indentation.
 */
export function Sidenote({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <aside
      className={cn(
        "my-4 text-sm leading-relaxed text-[var(--color-muted)]",
        "border-l border-[var(--color-rule)] pl-4",
        "xl:float-right xl:clear-right xl:-mr-[16rem] xl:w-[14rem] xl:my-0",
        "xl:border-l-0 xl:border-none xl:pl-0",
        className,
      )}
    >
      {label && (
        <span className="mr-1 font-mono text-xs text-[var(--color-accent)]">
          {label}
        </span>
      )}
      {children}
    </aside>
  );
}
