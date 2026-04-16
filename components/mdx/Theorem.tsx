import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Kind = "theorem" | "lemma" | "proposition" | "corollary" | "definition";

const kindLabel: Record<Kind, string> = {
  theorem: "Theorem",
  lemma: "Lemma",
  proposition: "Proposition",
  corollary: "Corollary",
  definition: "Definition",
};

type Props = {
  kind?: Kind;
  number?: string;
  name?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Classical mathematical block: label + optional number + optional name,
 * followed by italicised body. Kept intentionally spare — no background
 * surface, only a left rule and small-caps label.
 */
export function Theorem({
  kind = "theorem",
  number,
  name,
  children,
  className,
}: Props) {
  return (
    <aside
      className={cn(
        "my-8 border-l-2 border-[var(--color-accent)] pl-5",
        className,
      )}
    >
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
        {kindLabel[kind]}
        {number && <span className="ml-2 font-mono normal-case">{number}</span>}
        {name && (
          <span className="ml-2 normal-case italic text-[var(--color-muted)]">
            ({name})
          </span>
        )}
      </p>
      <div className="text-[var(--color-ink)] italic leading-relaxed [&_strong]:not-italic">
        {children}
      </div>
    </aside>
  );
}
