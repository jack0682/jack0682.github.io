import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { idsByKind } from "@/lib/content";

export const metadata: Metadata = {
  title: "Theorem index",
  description:
    "Every theorem, lemma, proposition, and corollary ID extracted from the SCC and ONN notes — sorted alphabetically with the document each ID first appears in.",
};

export default function TheoremIndexPage() {
  const items = idsByKind("theorem");

  return (
    <Container width="prose">
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/notes/", label: "Notes" },
            { label: "Theorem index" },
          ]}
        />
      </div>
      <PageHeader
        mark="T"
        eyebrow="Index"
        title="Theorem index"
        lead={`${items.length} unique theorem-class IDs (T-…) extracted from the SCC and ONN notes. Each row links to the first document that names the ID.`}
        className="pt-0 md:pt-0"
      />

      {items.length === 0 ? (
        <p className="text-[var(--color-muted)]">No IDs extracted yet.</p>
      ) : (
        <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {items.map(({ id, occurrences }) => {
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
      )}
    </Container>
  );
}
