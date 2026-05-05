"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Mobile / tablet sticky title bar. When the reader scrolls past
 * the document header, this bar slides in below the masthead so
 * the note title stays visible. Hidden on xl+ (desktop has the TOC
 * sidebar carrying the same context) and inside focus mode.
 */
export function StickyDocTitle({ title }: { title: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 220);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-sticky-doc-title
      aria-hidden={!visible}
      className={cn(
        "fixed left-0 right-0 top-14 z-20 sm:top-16 xl:hidden",
        "border-b border-[var(--color-rule)] bg-[var(--color-bg)]/85 backdrop-blur-sm",
        "transition-[opacity,transform] duration-200 motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0",
      )}
    >
      <div className="mx-auto w-full max-w-[44rem] px-6 py-2 sm:px-10">
        <p className="truncate font-display text-sm leading-tight tracking-tight text-[var(--color-ink)]">
          {title}
        </p>
      </div>
    </div>
  );
}
