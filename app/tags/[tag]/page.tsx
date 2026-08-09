import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { allTags, itemsForTag, tagIndex } from "@/lib/content";
import {
  TAG_CATEGORY_META,
  classifyTag,
  coreTagRank,
  isCoreTag,
} from "@/lib/tag-taxonomy";

export function generateStaticParams() {
  return allTags.map((tag) => ({ tag }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ tag: string }> };

function isArchivedProgrammeTag(tag: string) {
  return tag === "scc" || tag === "onn";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const category = TAG_CATEGORY_META[classifyTag(tag)];
  const isArchive = isArchivedProgrammeTag(tag);
  return {
    title: `#${tag}`,
    description: isArchive
      ? `Historical ${tag.toUpperCase()} archive: preserved public content indexed under "${tag}".`
      : `${category.shortLabel} tag: all public content indexed under "${tag}".`,
    alternates: { canonical: `/tags/${tag}/` },
  };
}

const kindMeta = {
  note: { label: "Notes", mark: "ℓ" },
  onn: { label: "ONN documents", mark: "χ" },
  ulr: { label: "ULR documents", mark: "Ω" },
  paper: { label: "Papers", mark: "¶" },
  journal: { label: "Journal", mark: "∂" },
} as const;

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const items = itemsForTag(tag);
  if (items.length === 0) notFound();

  const category = classifyTag(tag);
  const categoryMeta = TAG_CATEGORY_META[category];
  const isArchive = isArchivedProgrammeTag(tag);
  const relatedTags = tagIndex
    .filter(
      (entry) => entry.tag !== tag && classifyTag(entry.tag) === category,
    )
    .sort(
      (a, b) =>
        Number(isCoreTag(b.tag)) - Number(isCoreTag(a.tag)) ||
        coreTagRank(a.tag) - coreTagRank(b.tag) ||
        b.count - a.count ||
        a.tag.localeCompare(b.tag),
    )
    .slice(0, 10);

  const groups = (Object.keys(kindMeta) as Array<keyof typeof kindMeta>)
    .map((kind) => ({
      kind,
      items: items.filter((item) => item.kind === kind),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Container>
      <div className="pt-16 sm:pt-20 md:pt-28">
        <Breadcrumb
          items={[
            { href: "/tags/", label: "Tags" },
            { label: `#${tag}` },
          ]}
        />
      </div>
      <PageHeader
        mark={categoryMeta.mark}
        eyebrow={isArchive ? "Historical archive tag" : `${categoryMeta.shortLabel} tag`}
        title={`#${tag}`}
        lead={isArchive
          ? `${items.length} ${items.length === 1 ? "document" : "documents"} preserved from the archived ${tag.toUpperCase()} programme. These records are not the current Main research.`
          : `${items.length} ${items.length === 1 ? "document" : "documents"} indexed here. ${categoryMeta.description}`}
        className="pt-4 md:pt-6"
      />

      <div className="mb-14 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[var(--color-rule)] py-4 text-sm">
        <Link
          href={`/tags/#${category}`}
          className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink)]"
        >
          {categoryMeta.mark} Browse {categoryMeta.label.toLowerCase()}
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
          {isArchive ? "historical archive" : isCoreTag(tag) ? "core starting point" : categoryMeta.shortLabel}
        </span>
      </div>

      <div className="space-y-14">
        {groups.map((group) => {
          const meta = kindMeta[group.kind];
          return (
            <section key={group.kind} aria-labelledby={`${group.kind}-heading`}>
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2
                  id={`${group.kind}-heading`}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-subtle)]"
                >
                  <span className="mr-2 text-[var(--color-accent)]">
                    {meta.mark}
                  </span>
                  {meta.label}
                </h2>
                <span className="font-mono text-[10px] tabular-nums text-[var(--color-subtle)]">
                  {group.items.length}
                </span>
              </div>
              <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
                {group.items.map((item) => (
                  <li
                    key={item.permalink}
                    data-track={group.kind === "ulr" ? "ulr" : undefined}
                  >
                    <Link
                      href={item.permalink}
                      className="group grid gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                        {meta.label}
                        {item.date ? ` · ${item.date.slice(0, 4)}` : ""}
                      </span>
                      <div>
                        <h3 className="text-base leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-lg">
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)]">
                            {item.summary}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {relatedTags.length > 0 && (
        <aside className="mt-16 border-t border-[var(--color-rule)] pt-8">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
            More in {categoryMeta.label.toLowerCase()}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {relatedTags.map((entry) => (
              <li key={entry.tag}>
                <Link
                  href={`/tags/${encodeURIComponent(entry.tag)}/`}
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {entry.tag}
                  <span className="ml-1.5 font-mono text-[10px] text-[var(--color-subtle)]">
                    {entry.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mt-12 border-t border-[var(--color-rule)] pt-8 text-sm">
        <Link
          href="/tags/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← All tags
        </Link>
      </div>
    </Container>
  );
}
