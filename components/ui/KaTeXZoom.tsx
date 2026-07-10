"use client";
import { useEffect } from "react";
import { useHydrated } from "@/lib/motion";

/**
 * Subtle hover affordance for math: a small scale-up on display
 * equations and an accent wash behind inline math. No click-to-zoom
 * (the previous `cursor: zoom-in` promised an interaction that did not
 * exist), and the scale is disabled under prefers-reduced-motion.
 */
export function KaTeXZoom() {
  const mounted = useHydrated();

  useEffect(() => {
    if (!mounted) return;

    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (prefers-reduced-motion: no-preference) {
        .katex-display {
          transition: transform 0.2s var(--ease-out);
        }
        .katex-display:hover {
          transform: scale(1.04);
        }
      }
      .katex:not(.katex-display .katex) {
        transition: background 0.15s var(--ease-out);
        border-radius: 3px;
        padding: 0 1px;
      }
      .katex:not(.katex-display .katex):hover {
        background: color-mix(in srgb, var(--color-accent) 12%, transparent);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [mounted]);

  return null;
}
