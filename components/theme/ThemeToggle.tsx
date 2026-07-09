"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/cn";
import { useHydrated } from "@/lib/motion";

/**
 * Three-state theme cycle: system → light → dark → system.
 * The icon reflects the *resolved* theme so users in `system` mode
 * still see a meaningful state cue.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (!hydrated) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center text-[var(--color-muted)]",
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
    theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  const label =
    theme === "system"
      ? "Theme: system (click for light)"
      : theme === "light"
        ? "Theme: light (click for dark)"
        : "Theme: dark (click for system)";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full",
        "text-[var(--color-muted)] transition-colors",
        "hover:text-[var(--color-ink)] hover:bg-[var(--color-rule)]/40",
        className,
      )}
    >
      <Icon size={16} strokeWidth={1.5} />
    </button>
  );
}
