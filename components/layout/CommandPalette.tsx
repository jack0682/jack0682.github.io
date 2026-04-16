"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SearchItem } from "@/lib/content";

/**
 * Global command palette — opens with ⌘K / Ctrl+K from anywhere.
 *
 * Fuzzy search across notes, papers, journal entries, and research
 * tracks; grouped by source. Keyboard-first (arrow keys navigate,
 * Enter routes); on mobile it renders as a bottom sheet.
 *
 * The `items` are precomputed at build time in `lib/content.ts` so
 * there is no client-side fetch.
 */
export function CommandPalette({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // Keyboard shortcut: ⌘K or Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Body-scroll lock while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Group items by `group` field
  const groups = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const it of items) {
      const bucket = map.get(it.group) ?? [];
      bucket.push(it);
      map.set(it.group, bucket);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-[1100]"
          style={{ isolation: "isolate" }}
        >
          <motion.button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
          <motion.div
            className={cn(
              "absolute left-1/2 top-[12vh] w-[min(40rem,92vw)] -translate-x-1/2",
              "bg-[#ffffff] text-[#1a1814] dark:bg-[#171411] dark:text-[#ede7db]",
              "border border-[var(--color-rule)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)]",
              "overflow-hidden rounded-sm",
            )}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Command label="Global search" loop>
              <div className="flex items-center gap-3 border-b border-[var(--color-rule)] px-5 py-4">
                <Search
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--color-subtle)]"
                />
                <Command.Input
                  autoFocus
                  placeholder="Search notes, papers, journal, tracks…"
                  className={cn(
                    "flex-1 bg-transparent text-base outline-none",
                    "placeholder:text-[var(--color-subtle)]",
                  )}
                />
                <kbd className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)] sm:inline-block">
                  Esc
                </kbd>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="sm:hidden text-[var(--color-subtle)]"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto px-2 py-2">
                <Command.Empty className="px-4 py-8 text-center text-sm italic text-[var(--color-subtle)]">
                  Nothing matches.
                </Command.Empty>

                {groups.map(([group, entries]) => (
                  <Command.Group
                    key={group}
                    heading={group}
                    className={cn(
                      "[&_[cmdk-group-heading]]:sci-eyebrow",
                      "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2",
                      "[&_[cmdk-group-heading]]:text-[10px]",
                      "[&_[cmdk-group-heading]]:text-[var(--color-subtle)]",
                    )}
                  >
                    {entries.map((e) => (
                      <Command.Item
                        key={e.permalink}
                        value={`${e.title} ${e.keywords.join(" ")} ${e.summary ?? ""}`}
                        onSelect={() => navigate(e.permalink)}
                        className={cn(
                          "group flex cursor-pointer flex-col gap-0.5 rounded-[2px] px-3 py-2.5",
                          "data-[selected=true]:bg-[var(--color-rule)]/50",
                          "transition-colors",
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="flex-1 truncate font-display text-[15px] leading-tight text-[var(--color-ink)] group-data-[selected=true]:text-[var(--color-accent)]">
                            {e.title}
                          </span>
                          <KindBadge kind={e.kind} />
                        </span>
                        {e.summary && (
                          <span className="truncate text-[12px] text-[var(--color-muted)]">
                            {e.summary}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="flex items-center justify-between border-t border-[var(--color-rule)] px-4 py-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  ↑↓ navigate · ↵ open · esc close
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  {items.length} entries
                </p>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function KindBadge({ kind }: { kind: SearchItem["kind"] }) {
  const label = { note: "note", paper: "paper", journal: "journal", track: "track" }[kind];
  return (
    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
      {label}
    </span>
  );
}
