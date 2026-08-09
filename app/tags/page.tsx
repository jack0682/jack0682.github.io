import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { tagIndex } from "@/lib/content";
import {
  TAG_CATEGORY_META,
  TAG_CATEGORY_ORDER,
  classifyTag,
  coreTagRank,
  isCoreTag,
  type TagCategory,
} from "@/lib/tag-taxonomy";

export const metadata: Metadata = {
  alternates: { canonical: "/tags/" },
  title: "Tags",
  description:
    "Browse the research corpus by programme, topic, document type, evidence status, and archive state.",
};

type TagEntry = (typeof tagIndex)[number] & {
  category: TagCategory;
  core: boolean;
};

function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(tag)}/`;
}

function TagLink({ entry }: { entry: TagEntry }) {
  return (
    <Link
      href={tagHref(entry.tag)}
      className="group inline-flex items-baseline gap-2 border-l border-[var(--color-rule)] py-1 pl-3 transition-[border-color,padding-left] hover:border-[var(--color-accent)] hover:pl-4"
    >
      <span className="text-sm text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)] sm:text-base">
        {entry.tag}
      </span>
      <span className="font-mono text-[10px] tabular-nums text-[var(--color-subtle)]">
        {entry.count}
      </span>
    </Link>
  );
}

export default function TagsPage() {
  const entries: TagEntry[] = tagIndex.map((entry) => ({
    ...entry,
    category: classifyTag(entry.tag),
    core: isCoreTag(entry.tag),
  }));

  const core = entries
    .filter((entry) => entry.core)
    .sort((a, b) => coreTagRank(a.tag) - coreTagRank(b.tag));
  const repeated = entries.filter((entry) => !entry.core && entry.count >= 2);
  const specific = entries.filter((entry) => !entry.core && entry.count === 1);
  const singletonCount = entries.filter((entry) => entry.count === 1).length;

  const byCategory = (source: TagEntry[]) =>
    TAG_CATEGORY_ORDER.map((category) => ({
      category,
      entries: source
        .filter((entry) => entry.category === category)
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag)),
    }));

  return (
    <Container>
      <PageHeader
        mark="∮"
        eyebrow="Reference · Tags"
        title="Research index."
        lead="A structured route through the public corpus. Start with the main programmes, then browse concepts, document types, research status, or historical material without treating every one-off term as equally prominent."
      />

      <div className="mb-14 grid gap-px border-y border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-3">
        {[
          [entries.length, "indexed terms"],
          [core.length, "starting points"],
          [singletonCount, "single-use terms"],
        ].map(([value, label]) => (
          <div key={label} className="bg-[var(--color-bg)] px-4 py-4 sm:px-5">
            <span className="font-display text-2xl text-[var(--color-ink)]">
              {value}
            </span>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              {label}
            </span>
          </div>
        ))}
      </div>

      <section aria-labelledby="core-tags-heading">
        <div className="mb-6 max-w-[44rem]">
          <p className="sci-eyebrow text-[11px] text-[var(--color-accent)]">
            Start here
          </p>
          <h2
            id="core-tags-heading"
            className="mt-2 font-display text-2xl tracking-tight text-[var(--color-ink)] sm:text-3xl"
          >
            Core map
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            A small set of conceptual entrances. This is a navigation aid, not
            a ranking of the work.
          </p>
        </div>

        <ul className="grid border-y border-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4">
          {core.map((entry) => {
            const meta = TAG_CATEGORY_META[entry.category];
            return (
              <li
                key={entry.tag}
                className="border-b border-[var(--color-rule)] last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+4)]:border-b-0"
              >
                <Link
                  href={tagHref(entry.tag)}
                  className="group block h-full px-4 py-5 transition-colors hover:bg-[var(--color-surface)]/45 sm:px-5"
                >
                  <span className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                    <span>
                      <span className="mr-1.5 text-[var(--color-accent)]">
                        {meta.mark}
                      </span>
                      {meta.shortLabel}
                    </span>
                    <span className="tabular-nums">{entry.count}</span>
                  </span>
                  <h3 className="mt-3 font-display text-xl leading-tight tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                    {entry.tag}
                  </h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-20 space-y-16">
        {byCategory(repeated).map(({ category, entries: group }) => {
          if (group.length === 0) return null;
          const meta = TAG_CATEGORY_META[category];
          return (
            <section
              key={category}
              id={category}
              aria-labelledby={`${category}-heading`}
              className="scroll-mt-24 border-t border-[var(--color-rule)] pt-8"
            >
              <div className="grid gap-4 md:grid-cols-[13rem_1fr] md:gap-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {meta.mark} {meta.shortLabel}
                  </p>
                  <h2
                    id={`${category}-heading`}
                    className="mt-2 font-display text-xl tracking-tight text-[var(--color-ink)]"
                  >
                    {meta.label}
                  </h2>
                </div>
                <div>
                  <p className="mb-6 max-w-[38rem] text-sm leading-relaxed text-[var(--color-muted)]">
                    {meta.description}
                  </p>
                  <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {group.map((entry) => (
                      <li key={entry.tag}>
                        <TagLink entry={entry} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {specific.length > 0 && (
        <details className="group mt-20 border-y border-[var(--color-rule)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left marker:hidden">
            <span>
              <span className="block font-display text-xl text-[var(--color-ink)]">
                Specific terms
              </span>
              <span className="mt-1 block text-sm text-[var(--color-muted)]">
                Precise terms currently used by one document. Kept searchable,
                but out of the primary browsing path.
              </span>
            </span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)] group-open:text-[var(--color-accent)]">
              {specific.length} terms · open
            </span>
          </summary>
          <div className="space-y-10 border-t border-[var(--color-rule)] py-8">
            {byCategory(specific).map(({ category, entries: group }) => {
              if (group.length === 0) return null;
              const meta = TAG_CATEGORY_META[category];
              return (
                <section key={category}>
                  <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
                    {meta.mark} {meta.label} · {group.length}
                  </h2>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {group.map((entry) => (
                      <li key={entry.tag}>
                        <Link
                          href={tagHref(entry.tag)}
                          className="text-sm text-[var(--color-subtle)] transition-colors hover:text-[var(--color-accent)]"
                        >
                          {entry.tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </details>
      )}
    </Container>
  );
}
