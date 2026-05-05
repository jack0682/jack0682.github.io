"use client";

import { useCallback, useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Long-form focus mode. Toggles `data-focus="on"` on the document
 * root, which CSS in globals.css uses to fade nav, footer, TOC, and
 * floating chrome out — leaving prose alone. ESC exits.
 *
 * Mounted only on note / onn document pages where reading is the
 * primary task; other surfaces don't need it.
 */
export function FocusToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);

  const apply = useCallback((next: boolean) => {
    setOn(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.focus = next ? "on" : "";
    }
  }, []);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.dataset.focus = "";
      }
    };
  }, []);

  // ESC exits focus mode.
  useEffect(() => {
    if (!on) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") apply(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [on, apply]);

  return (
    <button
      type="button"
      onClick={() => apply(!on)}
      aria-label={
        on
          ? "Exit focus mode — restore navigation"
          : "Enter focus mode — fade chrome, prose only"
      }
      title={on ? "Exit focus (Esc)" : "Focus mode"}
      className={cn(
        "fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(5rem,env(safe-area-inset-top))] z-30",
        "inline-flex h-8 w-8 items-center justify-center rounded-full",
        "border border-[var(--color-rule)] bg-[var(--color-bg)]/80 backdrop-blur-sm",
        "text-[var(--color-muted)] transition-colors",
        "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        className,
      )}
    >
      {on ? (
        <Minimize2 size={14} strokeWidth={1.5} />
      ) : (
        <Maximize2 size={14} strokeWidth={1.5} />
      )}
    </button>
  );
}
