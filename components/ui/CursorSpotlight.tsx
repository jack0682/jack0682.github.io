"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function CursorSpotlight() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.045) 0%, transparent 65%)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mounted]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div
      ref={divRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] transition-opacity duration-500"
    />
  );
}
