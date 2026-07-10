import Link from "next/link";
import type { IdOccurrence } from "@/lib/content";

type Item = { id: string; occurrences: IdOccurrence[] };

// First character of the ID after its prefix; digits collapse to "#".
function groupKey(id: string, prefix: string): string {
  const rest = id.startsWith(prefix) ? id.slice(prefix.length) : id;
  const c = (rest[0] ?? "#").toUpperCase();
  return /[A-Z]/.test(c) ? c : "#";
}

/**
 * Formal-ID index (theorems, open problems, …) grouped by the first
 * character of the ID after its prefix, with a sticky A–Z/# jump bar so
 * the list stays navigable as it grows.
 */
export function IdIndexList({
  items,
  prefix,
}: {
  items: Item[];
  prefix: string;
}) {
  const groups = new Map<string, Item[]>();
  for (const it of items) {
    const k = groupKey(it.id, prefix);
    const bucket = groups.get(k) ?? [];
    bucket.push(it);
    groups.set(k, bucket);
  }
  // "#" (numeric) first, then A–Z.
  const keys = [...groups.keys()].sort((a, b) =>
    (a === "#" ? " " : a).localeCompare(b === "#" ? " " : b),
  );

  return (
    <>
      <nav
        aria-label="Jump to section"
        className="liquid-glass--bar sticky top-14 z-10 -mx-2 mb-8 flex flex-wrap gap-1 rounded-sm px-2 py-2 sm:top-16"
      >
        {keys.map((k) => (
          <a
            key={k}
            href={`#grp-${k}`}
            className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-sm px-1.5 font-mono text-xs text-[var(--color-subtle)] transition-colors hover:bg-[var(--color-rule)]/40 hover:text-[var(--color-accent)]"
          >
            {k}
          </a>
        ))}
      </nav>

      <div className="space-y-10">
        {keys.map((k) => (
          <section key={k} id={`grp-${k}`} className="scroll-mt-28">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
              {k}
            </h2>
            <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {groups.get(k)!.map(({ id, occurrences }) => {
                const first = occurrences[0];
                return (
                  <li key={id} className="py-4">
                    <div className="grid items-baseline gap-3 md:grid-cols-[10rem_1fr]">
                      <Link
                        href={first.permalink}
                        className="font-mono text-sm tabular-nums text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {id}
                      </Link>
                      <div>
                        <Link
                          href={first.permalink}
                          className="block text-sm leading-snug text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                        >
                          {first.title}
                        </Link>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--color-subtle)]">
                          {first.snippet}
                        </p>
                        {occurrences.length > 1 && (
                          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                            +{occurrences.length - 1} more
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
