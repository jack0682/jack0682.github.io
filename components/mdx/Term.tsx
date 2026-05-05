"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";
import { glossary } from "@/lib/content";
import { cn } from "@/lib/cn";

type Props = {
  /** Formal ID — e.g. "D-0014", "S-0003", "A-0012". */
  id: string;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Inline glossary term. On hover/focus shows a Radix HoverCard with
 * the plain-English definition extracted at build time from
 * `scc-glossary.mdx`. Falls back to a plain dotted span when the ID
 * has no glossary entry — so this component is safe to use even on
 * IDs that have not yet been registered.
 *
 * Visually the trigger looks like a dotted underline; the popover
 * carries the entry name as a heading and the Plain-English blurb
 * as body, plus a "see full entry" link to the glossary anchor.
 */
export function Term({ id, children, className }: Props) {
  const entry = glossary[id];
  const label = children ?? id;

  // Lower-cased id used both as a fragment target (for cross-page
   // navigation back to the glossary) and as the anchor name on the
   // rendered span. Document-order first occurrence wins for hash
   // navigation, which on the glossary page is right next to the
   // term's heading — exactly where readers should land.
  const anchor = id.toLowerCase();

  if (!entry) {
    return (
      <span
        id={anchor}
        className={cn(
          "underline decoration-dotted decoration-[var(--color-subtle)] underline-offset-[3px]",
          className,
        )}
        title={`${id} (not registered in glossary)`}
      >
        {label}
      </span>
    );
  }

  return (
    <HoverCard.Root openDelay={200} closeDelay={120}>
      <HoverCard.Trigger asChild>
        <Link
          id={anchor}
          href={`/notes/part-0/scc-glossary/#${anchor}`}
          className={cn(
            "underline decoration-dotted decoration-[var(--color-accent)] underline-offset-[3px]",
            "transition-colors hover:text-[var(--color-accent)]",
            className,
          )}
        >
          {label}
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align="start"
          sideOffset={6}
          collisionPadding={16}
          className={cn(
            "liquid-glass z-[1200] max-w-[22rem] rounded-sm",
            "px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)]",
          )}
        >
          <p className="mb-1 flex items-baseline gap-2">
            <span className="font-display text-[15px] tracking-tight">
              {entry.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {id}
            </span>
          </p>
          <p className="text-[13px] text-[var(--color-muted)]">{entry.plain}</p>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
