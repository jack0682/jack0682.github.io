"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import MiniSearch from "minisearch";
import { cn } from "@/lib/cn";
import type { SearchItem } from "@/lib/content";
import bodyIndexJson from "../../.velite/body-index.json";

/* Body text lives only in the palette's own client chunk — keeps
   the per-page RSC payload small. Loaded once, cached forever. */
const bodyIndex = bodyIndexJson as Record<string, string>;

/**
 * Global command palette — opens with ⌘K / Ctrl+K from anywhere.
 *
 * Two modes:
 *   • empty query → grouped browse view of every search item.
 *   • non-empty query → MiniSearch full-text ranking across title,
 *     keywords, summary, and stripped MDX body, with a snippet
 *     preview showing the first matching window.
 *
 * Items are precomputed at build time in `lib/content.ts`
 * (with `body` text from `.velite/body-index.json`).
 */
export function CommandPalette({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
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

  // Reset query when palette closes so reopening starts fresh.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // MiniSearch instance — built once per `items` reference.
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<SearchableDoc>({
      idField: "id",
      fields: ["title", "keywords", "summary", "body"],
      storeFields: ["id"],
      searchOptions: {
        boost: { title: 6, keywords: 3, summary: 2 },
        prefix: true,
        fuzzy: 0.15,
        combineWith: "AND",
      },
    });
    ms.addAll(
      items.map((it) => ({
        id: it.id,
        title: it.title,
        keywords: it.keywords.join(" "),
        summary: it.summary ?? "",
        body: it.slug ? (bodyIndex[it.slug] ?? "") : "",
      })),
    );
    return ms;
  }, [items]);

  const itemsById = useMemo(
    () => new Map(items.map((it) => [it.id, it])),
    [items],
  );

  // Grouped browse view (empty query).
  const groups = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const it of items) {
      const bucket = map.get(it.group) ?? [];
      bucket.push(it);
      map.set(it.group, bucket);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  // Ranked search view (non-empty query). MiniSearch returns best-first.
  const ranked = useMemo<RankedMatch[]>(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    const results = miniSearch.search(trimmed);
    const tokens = trimmed
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length >= 2);
    return results
      .map((r) => {
        const it = itemsById.get(String(r.id));
        if (!it) return null;
        const body = it.slug ? (bodyIndex[it.slug] ?? "") : "";
        return { item: it, snippet: makeSnippet(body, tokens) };
      })
      .filter((r): r is RankedMatch => r !== null);
  }, [query, miniSearch, itemsById]);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!mounted) return null;

  const isSearching = query.trim().length > 0;

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
              "liquid-glass",
              // Mobile: panel anchors near the top so the input stays
              //   above the on-screen keyboard. `dvh` accounts for the
              //   browser chrome on iOS Safari.
              // Desktop (sm+): centred ~12vh from the top.
              "absolute left-1/2 top-[max(0.5rem,env(safe-area-inset-top))] sm:top-[12vh]",
              "w-[min(40rem,96vw)] -translate-x-1/2",
              "text-[var(--color-ink)]",
              "overflow-hidden rounded-sm",
            )}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Command label="Global search" loop shouldFilter={false}>
              <div className="flex items-center gap-3 border-b border-[var(--color-rule)] px-5 py-4">
                <Search
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--color-subtle)]"
                />
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search notes, papers, journal, body text…"
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

              <Command.List className="max-h-[55dvh] overflow-y-auto overscroll-contain px-2 py-2 sm:max-h-[60vh]">
                {isSearching && ranked.length === 0 && (
                  <Command.Empty className="px-4 py-8 text-center text-sm italic text-[var(--color-subtle)]">
                    Nothing matches.
                  </Command.Empty>
                )}

                {!isSearching &&
                  groups.map(([group, entries]) => (
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
                        <ItemRow
                          key={e.id}
                          item={e}
                          onSelect={() => navigate(e.permalink)}
                        />
                      ))}
                    </Command.Group>
                  ))}

                {isSearching &&
                  ranked.map(({ item, snippet }) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      snippet={snippet}
                      onSelect={() => navigate(item.permalink)}
                    />
                  ))}
              </Command.List>

              <div className="flex items-center justify-between border-t border-[var(--color-rule)] px-4 py-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  ↑↓ navigate · ↵ open · esc close
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  {isSearching
                    ? `${ranked.length} match${ranked.length === 1 ? "" : "es"}`
                    : `${items.length} entries`}
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

type SearchableDoc = {
  id: string;
  title: string;
  keywords: string;
  summary: string;
  body: string;
};

type RankedMatch = { item: SearchItem; snippet: string | null };

/**
 * Build a ~140-char snippet centred on the first body token that
 * matches any query token. Returns null when no match window
 * exists in the body (e.g. when the hit is purely on title).
 */
function makeSnippet(body: string, tokens: string[]): string | null {
  if (!body || tokens.length === 0) return null;
  const lower = body.toLowerCase();
  let earliest = -1;
  for (const t of tokens) {
    const i = lower.indexOf(t);
    if (i !== -1 && (earliest === -1 || i < earliest)) earliest = i;
  }
  if (earliest === -1) return null;
  const start = Math.max(0, earliest - 60);
  const end = Math.min(body.length, earliest + 80);
  const slice = body.slice(start, end).trim();
  return (start > 0 ? "… " : "") + slice + (end < body.length ? " …" : "");
}

function ItemRow({
  item,
  snippet,
  onSelect,
}: {
  item: SearchItem;
  snippet?: string | null;
  onSelect: () => void;
}) {
  const secondary = snippet ?? item.summary;
  return (
    <Command.Item
      value={item.id}
      onSelect={onSelect}
      className={cn(
        "group flex cursor-pointer flex-col gap-0.5 rounded-[2px] px-3 py-2.5",
        "data-[selected=true]:bg-[var(--color-rule)]/50",
        "transition-colors",
      )}
    >
      <span className="flex items-baseline gap-3">
        <span className="flex-1 truncate font-display text-[15px] leading-tight text-[var(--color-ink)] group-data-[selected=true]:text-[var(--color-accent)]">
          {item.title}
        </span>
        <KindBadge kind={item.kind} />
      </span>
      {secondary && (
        <span className="line-clamp-2 text-[12px] leading-snug text-[var(--color-muted)]">
          {secondary}
        </span>
      )}
    </Command.Item>
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
