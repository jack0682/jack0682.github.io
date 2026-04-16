"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Three-state theme toggle: system → light → dark → system.
 * Icon reflects the resolved theme when in system mode so the user
 * still sees what's currently active.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch: render a neutral placeholder until mounted.
  if (!mounted) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center text-[var(--color-muted)]",
          className,
        )}
      >
        <Monitor size={16} strokeWidth={1.5} />
      </span>
    );
  }

  const cycle = () => {
    const next =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
  };

  const Icon =
    theme === "system"
      ? Monitor
      : resolvedTheme === "dark"
        ? Moon
        : Sun;

  const label =
    theme === "system"
      ? "Theme: system (click to switch to light)"
      : theme === "light"
        ? "Theme: light (click to switch to dark)"
        : "Theme: dark (click to switch to system)";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full",
        "text-[var(--color-muted)] transition-colors",
        "hover:text-[var(--color-ink)] hover:bg-[var(--color-rule)]/40",
        className,
      )}
    >
      <Icon size={16} strokeWidth={1.5} />
    </button>
  );
}
