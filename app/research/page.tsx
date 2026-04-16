import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { researchTracks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research threads on Ontology Neural Networks, perception theory, mathematical foundations, delay-robust control, and robotics.",
};

export default function ResearchPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Research"
        title="Threads in progress."
        lead="A small number of long-running research threads, each building on a shared foundation: that perception, representation, and control are best understood as one continuous mathematical object."
      />

      <Link
        href="/notes/part-0/integrated-architecture/"
        className="group -mt-2 mb-14 flex max-w-[44rem] items-start gap-4 border-l-2 border-[var(--color-accent)] py-3 pl-5 transition-colors hover:bg-[var(--color-surface)]/40"
      >
        <span className="mt-[3px] font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          North star
        </span>
        <span className="flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
          All five threads below serve one ultimate target: a single{" "}
          <span className="text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
            cognitive-reasoning architecture unifying SCC and ONN
          </span>
          . Read the integration plan →
        </span>
      </Link>

      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {researchTracks.map((track, i) => (
          <li key={track.slug}>
            <Link
              href={track.permalink}
              className="group block py-8 transition-colors sm:py-10"
            >
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-mono text-xs text-[var(--color-subtle)] shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-2xl leading-tight tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-3xl">
                    {track.title}
                  </h2>
                  <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:mt-3 sm:text-base">
                    {track.summary}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="hidden shrink-0 font-mono text-xs text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)] sm:inline"
                >
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
