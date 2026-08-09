import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeX } from "@/components/mdx/TeX";
import { ResearchStatusBanner } from "@/components/research/ResearchStatusBanner";
import { sccHub } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { paperPublicSummary } from "@/lib/publication-status";
import { SCC_STATUS } from "@/lib/research-status";

const SCC_MARK = "§";
const READING_ORDER = [
  ["SCC → ULR transition", "/ulr/from-scc-to-ulr/"],
  ["Final sealed SCC status", "/notes/part-0/scc-status-2026-05/"],
  ["Canonical specification", "/notes/part-0/canonical-spec-scc/"],
  ["Theorem registry", "/notes/part-0/scc-theorem-registry/"],
] as const;

export const metadata: Metadata = {
  alternates: { canonical: "/scc/" },
  title: "SCC · Historical Archive",
  description: SCC_STATUS.summary,
  openGraph: {
    title: "SCC · Historical Archive",
    description: SCC_STATUS.summary,
    url: "/scc/",
    images: [{ url: "/og/research/perception.png", width: 1200, height: 630, alt: "SCC · Historical Archive" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/research/perception.png"] },
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
        mark={SCC_MARK}
        eyebrow="SCC · Historical archive"
        title="Soft Cognitive Cohesion — sealed."
        lead={SCC_STATUS.summary}
      />

      {/* identity stripe — mirrors the home hero's formula row */}
      <div
        aria-hidden
        className="-mt-6 mb-14 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-subtle)]"
      >
        <span className="h-px w-10 bg-[var(--color-accent)]" />
        <TeX expr="E_{\mathcal{S}} : \mathrm{Conf}(\mathcal{S}) \longrightarrow \mathbb{R}_{\geq 0}" />
      </div>

      <ResearchStatusBanner status={SCC_STATUS} className="-mt-6 mb-12" />

      {/* reading-order callout — numbered sequence, not prose */}
      <div className="mb-14 max-w-[44rem] border-l-2 border-[var(--color-accent)] py-3 pl-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Suggested reading order
        </p>
        <ol className="mt-3 space-y-1.5">
          {READING_ORDER.map(([step, href], i) => (
            <li
              key={step}
              className="flex items-baseline gap-4 text-sm leading-snug text-[var(--color-muted)]"
            >
              <span className="font-mono text-[11px] tabular-nums text-[var(--color-subtle)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Link
                href={href}
                className="text-[var(--color-ink)] underline decoration-[var(--color-rule)] underline-offset-4 transition hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
              >
                {step}
              </Link>
            </li>
          ))}
        </ol>
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
        label="Historical roadmap & final status"
        description="Frozen status reports, theorem ledger, implementation history, and the open problems that remained when SCC left the active programme."
        aside={
          <Link
            href="/scc/changelog/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)] transition-colors hover:text-[var(--color-accent)]"
          >
            Canonical changelog →
          </Link>
        }
      >
        {roadmap.length === 0 ? (
          <Placeholder text="No archived status reports." />
        ) : (
          roadmap.map((n) => (
            <DocCard
              key={n.slug}
              href={n.permalink}
              title={n.title}
              summary={n.summary}
              meta={
                n.roadmapKind === "weekly"
                  ? `weekly · ${formatDate(n.date)}`
                  : n.updated
                    ? `updated ${formatDate(n.updated)}`
                    : undefined
              }
            />
          ))
        )}
      </HubSection>

      {/* ── Overview / integration ───────────────────── */}
      <HubSection
        label="Historical integration target"
        description="The former SCC–ONN north-star, retained with explicit audit markings. It is not the current architecture or Main programme."
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
        aside={
          <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
            <Link
              href="/scc/dag/"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              Dependency DAG →
            </Link>
            <Link
              href="/refs/theorems/"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              Theorem index →
            </Link>
            <Link
              href="/refs/equations/"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              Equation index →
            </Link>
            <Link
              href="/refs/open-problems/"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              Open problems →
            </Link>
          </div>
        }
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
              summary={paperPublicSummary(p).slice(0, 220)}
              meta={`${p.status} · ${p.year}${p.claimStatus !== "current" ? ` · ${p.claimStatus}` : ""}`}
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
          href="/ulr/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ULR main research →
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
  aside,
  children,
}: {
  label: string;
  description?: string;
  aside?: React.ReactNode;
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
        {aside && <div className="md:ml-auto md:shrink-0">{aside}</div>}
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
          <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)] md:w-56 md:shrink-0">
            {/* SCC hub — solid accent chip (authoritative, institutional) */}
            <span
              aria-hidden
              className="inline-flex h-[18px] w-[18px] items-center justify-center bg-[var(--color-accent)] font-display text-[12px] font-bold not-italic leading-none text-[var(--color-surface)]"
            >
              {SCC_MARK}
            </span>
            {meta ?? "SCC"}
          </span>
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
            className="hidden font-mono text-xs text-[var(--color-subtle)] transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)] md:inline"
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
