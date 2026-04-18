import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { tagIndex } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all content by topic tag.",
};

export default function TagsPage() {
  return (
    <Container>
      <PageHeader
        mark="∮"
        eyebrow="Tags"
        title="Topics."
        lead="Browse notes, papers, and journal entries by topic."
      />

      <div className="flex flex-wrap gap-3 border-t border-[var(--color-rule)] pt-10">
        {tagIndex.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}/`}
            className="group inline-flex items-baseline gap-2 border border-[var(--color-rule)] px-3 py-2 text-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <span className="text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
              {tag}
            </span>
            <span className="font-mono text-[10px] text-[var(--color-subtle)]">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
