"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, BookOpen } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Four-state theme cycle: system → light → dark → sepia → system.
 * The icon reflects the *resolved* theme so users in `system` mode
 * still see a meaningful state cue. Sepia is a long-form reading
 * mode (warm paper background, sepia ink) — independent of OS pref.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

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
      theme === "system"
        ? "light"
        : theme === "light"
          ? "dark"
          : theme === "dark"
            ? "sepia"
            : "system";
    setTheme(next);
  };

  const Icon =
    theme === "system"
      ? Monitor
      : theme === "sepia"
        ? BookOpen
        : resolvedTheme === "dark"
          ? Moon
          : Sun;

  const label =
    theme === "system"
      ? "Theme: system (click for light)"
      : theme === "light"
        ? "Theme: light (click for dark)"
        : theme === "dark"
          ? "Theme: dark (click for sepia)"
          : "Theme: sepia (click for system)";

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
