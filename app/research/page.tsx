import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CollaborationCTA } from "@/components/layout/CollaborationCTA";
import { researchTracks } from "@/lib/content";
import { ONN_STATUS, SCC_STATUS, ULR_STATUS } from "@/lib/research-status";

export const metadata: Metadata = {
  alternates: { canonical: "/research/" },
  title: "Research",
  description:
    "ULR is the current main research programme, alongside archived SCC and ONN records, mathematical foundations, control, and robotics.",
  openGraph: {
    title: "Research",
    description: "ULR is the current main research programme, alongside archived SCC and ONN records, mathematical foundations, control, and robotics.",
    url: "/research/",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Jaehong Oh · Research" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
};

export default function ResearchPage() {
  return (
    <Container>
      <PageHeader
        mark="∮"
        eyebrow="Research"
        title="Programmes, evidence, and archives."
        lead="A small number of long-running research threads, organized around typed questions of sharing, identity, observer-relative role, formation, and embodied testing — without assuming in advance that one universal object unifies them."
      />

      <Link
        href="/ulr/current-status/"
        className="group -mt-2 mb-14 flex max-w-[44rem] items-start gap-4 border-l-2 border-[var(--color-accent)] py-3 pl-5 transition-colors hover:bg-[var(--color-surface)]/40"
      >
        <span className="mt-[3px] font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          North star
        </span>
        <span className="flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
          The current main programme is ULR, marked{" "}
          <span className="text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
            {ULR_STATUS.label.toLowerCase()}
          </span>
          . Its Canon 24 result is a disciplined negative ontology verdict,
          while SCC is {SCC_STATUS.label.toLowerCase()} and ONN is{" "}
          <span className="text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
            {ONN_STATUS.label.toLowerCase()}
          </span>
          . Read the canonical boundary, evidence hierarchy, and reopening gate →
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
                  {track.statusLabel ? (
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      {track.statusLabel}
                    </p>
                  ) : null}
                  <h2 className="font-display text-2xl leading-tight tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-3xl">
                    {track.title}
                  </h2>
                  <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:mt-3 sm:text-base">
                    {track.statusSummary ?? track.summary}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="hidden shrink-0 font-mono text-xs text-[var(--color-subtle)] transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)] sm:inline"
                >
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <CollaborationCTA context="research" />
    </Container>
  );
}
