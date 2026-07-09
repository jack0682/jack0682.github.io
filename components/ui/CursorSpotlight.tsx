"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useHydrated, useReducedMotionSafe } from "@/lib/motion";

export function CursorSpotlight() {
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const reduce = useReducedMotionSafe();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || resolvedTheme !== "dark") return;
    const el = divRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.045) 0%, transparent 65%)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, resolvedTheme]);

  // Ambient, mouse-driven glow — pointless (and unwanted) for motion-sensitive
  // users and on touch; only render for hydrated dark-theme, motion-OK sessions.
  if (!hydrated || reduce || resolvedTheme !== "dark") return null;

  return (
    <div
      ref={divRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] transition-opacity duration-500"
    />
  );
}
