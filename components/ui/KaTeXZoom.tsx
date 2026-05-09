"use client";
import { useEffect, useState } from "react";

export function KaTeXZoom() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    const style = document.createElement("style");
    style.textContent = `
      .katex-display {
        transition: transform 0.2s ease, opacity 0.2s ease;
        cursor: zoom-in;
      }
      .katex-display:hover {
        transform: scale(1.06);
        opacity: 0.9;
      }
      .katex:not(.katex-display .katex) {
        transition: background 0.15s ease;
        border-radius: 3px;
        padding: 0 1px;
      }
      .katex:not(.katex-display .katex):hover {
        background: color-mix(in srgb, var(--color-accent) 12%, transparent);
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, [mounted]);

  return null;
}
