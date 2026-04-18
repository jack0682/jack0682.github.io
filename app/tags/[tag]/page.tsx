import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { allTags, itemsForTag } from "@/lib/content";

export function generateStaticParams() {
  return allTags.map((tag) => ({ tag }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `All content tagged "${tag}".`,
  };
}

const kindLabel: Record<string, string> = {
  note: "Note",
  paper: "Paper",
  journal: "Journal",
  onn: "ONN",
};

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const items = itemsForTag(tag);
  if (items.length === 0) notFound();

  const crumbs = [
    { href: "/tags/", label: "Tags" },
    { label: `#${tag}` },
  ];

  return (
    <Container>
      <div className="pt-16 sm:pt-20 md:pt-28">
        <Breadcrumb items={crumbs} />
      </div>
      <header className="pt-4 pb-10 md:pt-6 md:pb-14">
        <p className="mb-4 sci-eyebrow text-xs text-[var(--color-accent)]">
          <span className="sci-section-mark mr-2 not-italic text-[0.95em]">
            ∮
          </span>
          Tag
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)]">
          #{tag}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </header>

      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {items.map((item) => (
          <li key={item.permalink}>
            <Link
              href={item.permalink}
              className="group flex items-baseline gap-4 py-5 sm:gap-6"
            >
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)] sm:w-16">
                {kindLabel[item.kind] ?? item.kind}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-base leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-lg">
                  {item.title}
                </p>
                {item.summary && (
                  <p className="mt-1 max-w-[40rem] text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.summary}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

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
