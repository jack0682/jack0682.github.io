"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Route-change progress indicator.
 *
 * NProgress-style thin accent bar at the very top of the viewport.
 * Starts when the user clicks a same-origin `<a>` (internal route),
 * asymptotically climbs toward 90 %, then snaps to 100 % and fades
 * out once `usePathname()` reports the new path.
 *
 * Sits above `ScrollProgress` so it can mask it during the brief
 * navigation window.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const trickleRef = useRef<number | null>(null);
  const fadeRef = useRef<number | null>(null);

  // Click interceptor — start progress on same-origin link clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // allow modifier-clicks & non-primary buttons to open in new tab
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;
      if (a.target === "_blank") return;
      // external
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname) return;
      } catch {
        return;
      }

      // begin
      if (fadeRef.current) window.clearTimeout(fadeRef.current);
      if (trickleRef.current) window.clearInterval(trickleRef.current);
      setActive(true);
      setProgress(0.08);
      let p = 0.08;
      trickleRef.current = window.setInterval(() => {
        p = p + (0.9 - p) * 0.08;
        setProgress(p);
      }, 180);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Pathname changed → finish and fade.
  useEffect(() => {
    if (!active) return;
    if (trickleRef.current) window.clearInterval(trickleRef.current);
    setProgress(1);
    fadeRef.current = window.setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 260);
    return () => {
      if (fadeRef.current) window.clearTimeout(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[55] h-[2px] origin-left bg-[var(--color-accent)]"
      style={{ transformOrigin: "0% 50%" }}
      animate={{
        scaleX: progress,
        opacity: active ? 1 : 0,
      }}
      transition={{
        scaleX: { duration: progress === 1 ? 0.12 : 0.3, ease: "easeOut" },
        opacity: { duration: 0.2, ease: "easeOut" },
      }}
    />
  );
}
