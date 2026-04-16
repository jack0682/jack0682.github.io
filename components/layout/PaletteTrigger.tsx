"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Small button in the masthead that opens the command palette.
 * Implemented as a synthetic ⌘K keyboard event dispatched to
 * `document`, so it stays decoupled from the palette component.
 */
export function PaletteTrigger() {
  const open = () => {
    const isMac = navigator.platform.toLowerCase().includes("mac");
    const ev = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: isMac,
      ctrlKey: !isMac,
      bubbles: true,
    });
    document.dispatchEvent(ev);
  };

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open search palette (⌘K)"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)]",
        "bg-transparent px-3 py-1.5 text-[var(--color-muted)]",
        "transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
      )}
    >
      <Search size={13} strokeWidth={1.75} />
      <kbd className="font-mono text-[10px] uppercase tracking-[0.16em]">
        ⌘K
      </kbd>
    </button>
  );
}
