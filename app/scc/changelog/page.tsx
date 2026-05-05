import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { sccChangelog } from "@/lib/content";
import { formatDate, toIsoDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "SCC · Changelog",
  description:
    "Canonical version history for the Soft Cognitive Cohesion programme — every entry that bumps or patches the canonical specification, sourced from the journal.",
};

const impactLabel: Record<NonNullable<typeof sccChangelog[number]["impact"]>, string> = {
  bumped: "bump",
  patch: "patch",
  "no-op": "no-op",
};

export default function SccChangelogPage() {
  const crumbs = [
    { href: "/scc/", label: "SCC · Hub" },
    { label: "Changelog" },
  ];

  return (
    <Container width="prose">
      <div className="pt-10 md:pt-20">
        <Breadcrumb items={crumbs} />
      </div>
      <PageHeader
        mark="§"
        eyebrow="SCC"
        title="Canonical changelog"
        lead="Every journal entry that names a canonical version, ordered newest first. Each row links to the originating weekly entry where the bump or patch was authored."
        className="pt-0 md:pt-0"
      />

      {sccChangelog.length === 0 ? (
        <p className="text-[var(--color-muted)]">No versions registered yet.</p>
      ) : (
        <ol className="border-l border-[var(--color-rule)] pl-6">
          {sccChangelog.map((entry) => (
            <li
              key={`${entry.version}:${entry.permalink}`}
              className="relative mb-10"
            >
              <span
                aria-hidden
                className="absolute -left-[1.6rem] top-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              />
              <div className="mb-1 flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-sm tabular-nums text-[var(--color-ink)]">
                  {entry.version}
                </span>
                {entry.impact && (
                  <span
                    title={`canonical ${impactLabel[entry.impact]}`}
                    className={cn(
                      "border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]",
                      entry.impact === "bumped"
                        ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                        : entry.impact === "patch"
                          ? "border-[var(--color-muted)] text-[var(--color-muted)]"
                          : "border-[var(--color-rule)] text-[var(--color-subtle)]",
                    )}
                  >
                    {impactLabel[entry.impact]}
                  </span>
                )}
                <time
                  dateTime={toIsoDate(entry.date)}
                  className="font-mono text-[11px] tabular-nums text-[var(--color-subtle)]"
                >
                  {formatDate(entry.date)}
                </time>
              </div>
              <Link
                href={entry.permalink}
                className="block text-base leading-snug text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
              >
                {entry.title}
              </Link>
              {(entry.notes || entry.summary) && (
                <p className="mt-2 max-w-[40rem] text-sm leading-relaxed text-[var(--color-muted)]">
                  {entry.notes ?? entry.summary}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </Container>
  );
}
