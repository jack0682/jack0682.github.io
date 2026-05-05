"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { glossary } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Auto-dismiss popups after this many ms of inactivity on touch. */
const TOUCH_AUTO_CLOSE_MS = 6000;

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
 * Touch devices follow a tap-to-open / second-tap-to-navigate
 * convention so the popup is actually reachable without a mouse.
 * Inside the popup an explicit "View full entry" link gives a
 * single-tap path to the glossary anchor regardless of mode.
 */
export function Term({ id, children, className }: Props) {
  const entry = glossary[id];
  const label = children ?? id;
  const [open, setOpen] = useState(false);

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

  const onTriggerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Touch devices: first tap opens the popup (no navigation);
    // second tap on the same trigger (popup already open) is allowed
    // to navigate to the full glossary entry.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches &&
      !open
    ) {
      e.preventDefault();
      setOpen(true);
    }
  };

  // Outside-click + auto-dismiss on touch. HoverCard's built-in
  // close-on-leave behaviour doesn't fire on touch (no mouseleave),
  // so the popup would otherwise linger until the next interaction.
  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: none)").matches) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(`[data-term-scope="${anchor}"]`)) return;
      setOpen(false);
    };
    const timeout = window.setTimeout(
      () => setOpen(false),
      TOUCH_AUTO_CLOSE_MS,
    );
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.clearTimeout(timeout);
    };
  }, [open, anchor]);

  return (
    <HoverCard.Root
      open={open}
      onOpenChange={setOpen}
      openDelay={200}
      closeDelay={120}
    >
      <HoverCard.Trigger asChild>
        <Link
          id={anchor}
          data-term-scope={anchor}
          href={`/notes/part-0/scc-glossary/#${anchor}`}
          onClick={onTriggerClick}
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
          data-term-scope={anchor}
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
          <Link
            href={`/notes/part-0/scc-glossary/#${anchor}`}
            className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink)]"
          >
            View full entry →
          </Link>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
