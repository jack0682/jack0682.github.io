"use client";

import { useEffect } from "react";
import { markVisited, setLast, setProgress } from "@/lib/reading";

/**
 * Invisible session-state tracker. Mounted on note / onn detail
 * pages — does three things on mount and continuously thereafter:
 *
 *   1. `markVisited(slug)` — flag the page as read for "Cited by"
 *      visited indicators.
 *   2. `setLast({ slug, permalink, title })` — record this as the
 *      "Continue reading" target.
 *   3. Throttled scroll listener writes per-slug `progress` (0..100)
 *      so the next visit can show how far the user got.
 *
 * Renders nothing.
 */
export function ReadingTracker({
  slug,
  permalink,
  title,
}: {
  slug: string;
  permalink: string;
  title: string;
}) {
  useEffect(() => {
    markVisited(slug);
    setLast({ slug, permalink, title, ts: Date.now() });

    let raf = 0;
    let lastWritten = -1;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const scrollH =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollH > 0 ? (window.scrollY / scrollH) * 100 : 0;
        const rounded = Math.round(pct);
        if (rounded !== lastWritten) {
          lastWritten = rounded;
          setProgress(slug, rounded);
        }
      });
    };

    // Initial sample so even non-scrollers get a 0% record.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [slug, permalink, title]);

  return null;
}
