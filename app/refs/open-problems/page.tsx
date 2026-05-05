import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { idsByKind } from "@/lib/content";

export const metadata: Metadata = {
  title: "Open problems index",
  description:
    "Every OP-XXXX open-problem ID extracted from the SCC and ONN notes — sorted, deduplicated, linked to the first document that registers the problem.",
};

export default function OpenProblemsIndexPage() {
  const items = idsByKind("openProblem");

  return (
    <Container width="prose">
      <div className="pt-10 md:pt-20">
        <Breadcrumb
          items={[
            { href: "/notes/", label: "Notes" },
            { label: "Open problems" },
          ]}
        />
      </div>
      <PageHeader
        mark="OP"
        eyebrow="Index"
        title="Open problems index"
        lead={`${items.length} unique OP-XXXX IDs surfaced across the notes. Each row links to the document that registers or last discusses the problem.`}
        className="pt-0 md:pt-0"
      />

      {items.length === 0 ? (
        <p className="text-[var(--color-muted)]">No open problems registered.</p>
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
