"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate, toIsoDate } from "@/lib/format";

type Entry = {
  slug: string;
  title: string;
  date: string;
  permalink: string;
  summary?: string;
  track?: string;
};

export function JournalFilter({ entries }: { entries: Entry[] }) {
  const tracks = Array.from(
    new Set(entries.map((e) => e.track).filter(Boolean)),
  ).sort() as string[];

  const [active, setActive] = useState<string | null>(null);
  const filtered = active
    ? entries.filter((e) => e.track === active)
    : entries;

  return (
    <>
      {/* track tabs */}
      {tracks.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
              active === null
                ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
                : "text-[var(--color-subtle)] hover:text-[var(--color-ink)]"
            }`}
          >
            All
          </button>
          {tracks.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                active === t
                  ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "text-[var(--color-subtle)] hover:text-[var(--color-ink)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* entry list */}
      {filtered.length === 0 ? (
        <p className="py-8 text-sm text-[var(--color-muted)]">
          No entries for this track.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {filtered.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={entry.permalink}
                className="group block py-6 transition-colors sm:py-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <time
                    dateTime={toIsoDate(entry.date)}
                    className="font-mono text-xs text-[var(--color-subtle)] sm:w-24 sm:shrink-0"
                  >
                    {formatDate(entry.date)}
                  </time>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-xl leading-tight tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-2xl">
                      {entry.title}
                    </h2>
                    {entry.summary && (
                      <p className="mt-2 max-w-[40rem] text-sm leading-relaxed text-[var(--color-muted)]">
                        {entry.summary}
                      </p>
                    )}
                    {entry.track && (
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
                        {entry.track}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
