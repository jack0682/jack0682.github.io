import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { sccHub } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "SCC · Hub",
  description:
    "A single access point for the Soft Cognitive Cohesion programme — the canonical specification, the current research status, the integrated architecture with Ontology Neural Networks, and the mathematical results underpinning them.",
};

/**
 * `/scc/` — the Soft Cognitive Cohesion hub.
 *
 * Acts as the one-click entry point for everything in Part 0 plus
 * the mathematical results in Part II and any paper/journal entries
 * that explicitly reference the SCC thread. Every row is a link; no
 * scrolling through a generic Notes index.
 */
export default function SccHubPage() {
  const { canonical, roadmap, overview, theorems, relatedPapers } = sccHub;

  return (
    <Container>
      <PageHeader
        mark="§"
        eyebrow="SCC · Hub"
        title="Soft Cognitive Cohesion."
        lead="One entry point for the SCC programme — the canonical specification, the current research status, the unification plan with Ontology Neural Networks, and the mathematical results. A living hub rather than a chapter list."
      />

      {/* reading-order callout */}
      <div className="-mt-4 mb-14 border-l-2 border-[var(--color-accent)] py-3 pl-5 max-w-[44rem]">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Suggested reading order
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
          Canonical specification{"  →  "}Research status{"  →  "}
          Integrated architecture{"  →  "}theorem references as needed.
        </p>
      </div>

      {/* ── Canonical ───────────────────────────────── */}
      <HubSection
        label="Canonical specifications"
        description="The authoritative formal statement of the theory — primitives, axioms, the energy functional, and the proved-results registry."
      >
        {canonical.length === 0 ? (
          <Placeholder text="No canonical documents yet." />
        ) : (
          canonical.map((n) => (
            <DocCard
              key={n.slug}
              href={n.permalink}
              title={n.title}
              summary={n.summary}
              meta={n.updated ? `updated ${formatDate(n.updated)}` : undefined}
            />
          ))
        )}
      </HubSection>

      {/* ── Roadmap / status ─────────────────────────── */}
      <HubSection
        label="Research roadmap & status"
        description="Dated status reports — theorem ledger, implementation state, iteration history, and the open problems currently blocking consolidation."
      >
        {roadmap.length === 0 ? (
          <Placeholder text="No active status reports." />
        ) : (
          roadmap.map((n) => (
            <DocCard
              key={n.slug}
              href={n.permalink}
              title={n.title}
              summary={n.summary}
              meta={n.updated ? `updated ${formatDate(n.updated)}` : undefined}
            />
          ))
        )}
      </HubSection>

      {/* ── Overview / integration ───────────────────── */}
      <HubSection
        label="Integration & north-star"
        description="How SCC is positioned relative to Ontology Neural Networks and the broader research programme."
      >
        {overview.length === 0 ? (
          <Placeholder text="No overview documents yet." />
        ) : (
          overview.map((n) => (
            <DocCard
              key={n.slug}
              href={n.permalink}
              title={n.title}
              summary={n.summary}
              meta={n.updated ? `updated ${formatDate(n.updated)}` : undefined}
            />
          ))
        )}
      </HubSection>

      {/* ── Mathematical results (placeholder-friendly) ── */}
      <HubSection
        label="Mathematical results"
        description="Theorems and proofs. The Part II summary lists the eight main theorems; individual theorem pages will be detached from it as they are cleaned for public reading."
      >
        {theorems.length === 0 ? (
          <Placeholder text="Individual theorem pages will appear here as they are split out of Part II." />
        ) : (
          theorems.map((n) => (
            <DocCard
              key={n.slug}
              href={n.permalink}
              title={n.title}
              summary={n.summary}
              meta={`Part ${n.part}${n.section ? ` · ${n.section}` : ""}`}
            />
          ))
        )}
      </HubSection>

      {/* ── Related papers ───────────────────────────── */}
      <HubSection
        label="Related papers"
        description="Published and in-progress manuscripts that develop, cite, or depend on the SCC formalism."
      >
        {relatedPapers.length === 0 ? (
          <Placeholder text="No papers currently tagged to the SCC programme." />
        ) : (
          relatedPapers.map((p) => (
            <DocCard
              key={p.slug}
              href={p.permalink}
              title={p.title}
              summary={p.abstract.slice(0, 220)}
              meta={`${p.status} · ${p.year}`}
            />
          ))
        )}
      </HubSection>

      {/* footer — back to Notes index */}
      <div className="mt-20 flex flex-wrap gap-6 border-t border-[var(--color-rule)] pt-8 text-sm">
        <Link
          href="/notes/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← All notes
        </Link>
        <Link
          href="/research/perception/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          Perception track →
        </Link>
        <Link
          href="/research/onn/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ONN track →
        </Link>
      </div>
    </Container>
  );
}

/* ── local building blocks ─────────────────────────── */

function HubSection({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 border-t border-[var(--color-rule)] pt-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
        <p className="sci-eyebrow text-xs text-[var(--color-accent)]">
          {label}
        </p>
        {description && (
          <p className="max-w-[36rem] text-sm leading-relaxed text-[var(--color-muted)]">
            {description}
          </p>
        )}
      </div>
      <ul className="space-y-0 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {children}
      </ul>
    </section>
  );
}

function DocCard({
  href,
  title,
  summary,
  meta,
}: {
  href: string;
  title: string;
  summary?: string;
  meta?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group block py-6 transition-colors sm:py-7"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
          {meta && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)] md:w-48 md:shrink-0">
              {meta}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-2xl">
              {title}
            </h3>
            {summary && (
              <p className="mt-2 max-w-[44rem] text-sm leading-relaxed text-[var(--color-muted)]">
                {summary}
              </p>
            )}
          </div>
          <span
            aria-hidden
            className="hidden font-mono text-xs text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)] md:inline"
          >
            →
          </span>
        </div>
      </Link>
    </li>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <li className="py-6">
      <p className="text-sm italic text-[var(--color-subtle)]">{text}</p>
    </li>
  );
}

function FuturePlaceholder({
  label,
  note,
}: {
  label: string;
  note: string;
}) {
  return (
    <li className="py-5 opacity-70">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)] md:w-48 md:shrink-0">
          Draft
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg leading-snug tracking-tight text-[var(--color-subtle)] sm:text-xl">
            {label}
          </h3>
          <p className="mt-1 text-sm italic text-[var(--color-subtle)]">
            {note}
          </p>
        </div>
      </div>
    </li>
  );
}
