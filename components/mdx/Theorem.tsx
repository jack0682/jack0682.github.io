"use client";

import type { ReactNode } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { cn } from "@/lib/cn";
import { CATEGORY, type TheoremCategory } from "./categories";

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
  /**
   * Verification status. Renders a small chip in the eyebrow row.
   * See `categories.ts` for the visual vocabulary.
   */
  category?: TheoremCategory;
  /**
   * Optional plain-language paraphrase. Desktop: shown in a Radix
   * HoverCard triggered by the eyebrow row. Mobile: a collapsible
   * `<details>` line below the body. Hidden when undefined.
   */
  gloss?: string;
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
  category,
  gloss,
  children,
  className,
}: Props) {
  const cat = category ? CATEGORY[category] : null;
  const eyebrowChildren = (
    <>
      <span>{kindLabel[kind]}</span>
      {number && (
        <span className="font-mono normal-case tabular-nums">{number}</span>
      )}
      {name && (
        <span className="normal-case italic text-[var(--color-muted)]">
          ({name})
        </span>
      )}
      {gloss && (
        <span
          aria-hidden
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]"
        >
          gloss
        </span>
      )}
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
    </>
  );

  const eyebrow = gloss ? (
    <HoverCard.Root openDelay={200} closeDelay={120}>
      <HoverCard.Trigger asChild>
        <button
          type="button"
          className="mb-2 flex w-full flex-wrap items-baseline gap-2 sci-eyebrow text-xs text-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-accent)]"
        >
          {eyebrowChildren}
        </button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align="start"
          sideOffset={6}
          collisionPadding={16}
          className="liquid-glass z-[1200] hidden max-w-[24rem] rounded-sm px-4 py-3 text-sm leading-relaxed text-[var(--color-muted)] md:block"
        >
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Plain-language paraphrase
          </p>
          <p>{gloss}</p>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  ) : (
    <p className="mb-2 flex flex-wrap items-baseline gap-2 sci-eyebrow text-xs text-[var(--color-accent)]">
      {eyebrowChildren}
    </p>
  );

  return (
    <aside
      className={cn(
        "my-8 border-l-2 border-[var(--color-accent)] pl-5",
        className,
      )}
    >
      {eyebrow}
      <div className="text-[var(--color-ink)] italic leading-relaxed [&_strong]:not-italic">
        {children}
      </div>
      {gloss && (
        <details className="mt-3 text-sm text-[var(--color-muted)] md:hidden">
          <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Plain-language paraphrase
          </summary>
          <p className="mt-1">{gloss}</p>
        </details>
      )}
    </aside>
  );
}
