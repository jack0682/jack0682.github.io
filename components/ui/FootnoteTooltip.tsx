"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

interface TooltipState {
  content: string;
  x: number;
  y: number;
}

export function FootnoteTooltip() {
  const [tip, setTip] = useState<TooltipState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const enter = (e: MouseEvent) => {
      const a = (e.target as Element).closest('sup a[href^="#fn"], a[href^="#fn-"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      const target = document.querySelector(href);
      if (!target) return;
      // Strip the back-link (↩) from footnote text
      const clone = target.cloneNode(true) as Element;
      clone.querySelectorAll('a[href^="#fnref"]').forEach((el) => el.remove());
      const text = clone.textContent?.trim() ?? "";
      if (!text) return;
      const rect = (a as HTMLElement).getBoundingClientRect();
      setTip({ content: text, x: rect.left + rect.width / 2, y: rect.top });
    };
    const leave = (e: MouseEvent) => {
      if ((e.target as Element).closest('sup a, a[href^="#fn-"]')) setTip(null);
    };
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {tip && (
        <motion.div
          key="footnote-tip"
          role="tooltip"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed z-[200] max-w-xs rounded-[3px] border border-[var(--color-rule)] bg-[var(--color-surface)] px-3 py-2 text-xs leading-relaxed text-[var(--color-ink)] shadow-lg"
          style={{
            left: tip.x,
            top: tip.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tip.content}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
