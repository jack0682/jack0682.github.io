import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeX } from "@/components/mdx/TeX";
import { ResearchStatusBanner } from "@/components/research/ResearchStatusBanner";
import { onnHub } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { paperPublicSummary } from "@/lib/publication-status";
import { ONN_STATUS } from "@/lib/research-status";

const ONN_MARK = "χ";
const READING_ORDER = [
  ["Current audit & research status", "/onn/onn-research-status-2026/"],
  ["Canonical audit boundary", "/onn/canonical-spec/"],
  ["Paper of record · original framing", "/papers/onn-ortsf-2026/"],
  ["Integrated architecture", "/notes/part-0/integrated-architecture/"],
] as const;

export const metadata: Metadata = {
  alternates: { canonical: "/onn/" },
  title: "ONN · Hub",
  description: ONN_STATUS.summary,
};

/**
 * `/onn/` — Ontology Neural Network hub.
 *
 * Mirrors the SCC hub. Aggregates what exists now (research-track
 * overview, five ONN papers, the integrated-architecture note) and
 * reserves placeholder slots for the canonical spec, ORTSF
 * operator catalogue, and individual theorem pages as they are
 * written.
 */
export default function OnnHubPage() {
  const {
    canonical,
    roadmap,
    overview,
    theorems,
    essays,
    relatedPapers,
    trackOverview,
    integrationNote,
  } = onnHub;

  return (
    <Container>
      <PageHeader
        mark={ONN_MARK}
        eyebrow="ONN · Hub"
        title="Ontology Neural Network."
        lead={ONN_STATUS.summary}
      />

      {/* identity stripe — topology map of the latent state */}
      <div
        aria-hidden
        className="-mt-6 mb-14 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-subtle)]"
      >
        <span className="h-px w-10 bg-[var(--color-accent)]" />
        <TeX expr="\chi : \mathcal{R} \longrightarrow H^{\ast}(\mathcal{R};\mathbb{R})" />
      </div>

      <ResearchStatusBanner status={ONN_STATUS} className="-mt-6 mb-12" />

      {/* ── reading-order callout — numbered ─────────────────── */}
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

      {/* ── Track overview (always present) ───────────────────── */}
      {trackOverview && (
        <HubSection
          label="Track overview"
          description="The high-level research-track page — the original programme, the audit boundary, what survives, and the move to its successor line."
        >
          <DocCard
            href={trackOverview.permalink}
            title={trackOverview.title}
            summary={trackOverview.summary}
            meta={
              trackOverview.updated
                ? `updated ${formatDate(trackOverview.updated)}`
                : "overview"
            }
          />
        </HubSection>
      )}

      {/* ── Canonical ─────────────────────────────────────────── */}
      <HubSection
        label="Canonical audit & status"
        description="The authoritative audited boundary statement: original commitments, surviving scoped results, withdrawn claims, and named open gaps."
      >
        {canonical.length === 0 ? (
          <FuturePlaceholder
            label="ONN canonical audit"
            note="A distilled spec of primitives, axioms, and loss functional — detaching from the framework paper into a citable reference document."
          />
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

      {/* ── Research roadmap / status ─────────────────────────── */}
      <HubSection
        label="Research roadmap & status"
        description="Dated audits recording what is settled, what was withdrawn, what remains open, and what moved to the successor programme."
      >
        {roadmap.length === 0 ? (
          <FuturePlaceholder
            label="ONN — current research status"
            note="A living document in the style of the SCC status note: theorem ledger, implementation state, open blockers."
          />
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

      {/* ── Integration / north-star ──────────────────────────── */}
      <HubSection
        label="Integration & north-star"
        description="The proposed SCC–ONN coupling as an audited design target. The integration note records both the intended architecture and the links that are not established."
      >
        {overview.length > 0 &&
          overview.map((n) => (
            <DocCard
              key={n.slug}
              href={n.permalink}
              title={n.title}
              summary={n.summary}
              meta={n.updated ? `updated ${formatDate(n.updated)}` : undefined}
            />
          ))}
        {integrationNote && (
          <DocCard
            href={integrationNote.permalink}
            title={integrationNote.title}
            summary={integrationNote.summary}
            meta="Part 0 · audited design target"
          />
        )}
      </HubSection>

      {/* ── Mathematical results ──────────────────────────────── */}
      <HubSection
        label="Mathematical results"
        description="Audits and scoped results specific to ONN — withdrawn topology/cohomology claims and the surviving scalar delayed-recurrence stability condition."
      >
        {theorems.length === 0 ? (
          <FuturePlaceholder
            label="ONN · mathematical results"
            note="Individual theorem pages will appear here as proofs are formalised."
          />
        ) : (
          theorems.map((n) => (
            <DocCard
              key={n.slug}
              href={n.permalink}
              title={n.title}
              summary={n.summary}
              meta={n.section ?? "ONN"}
            />
          ))
        )}
      </HubSection>

      {/* ── Essays & working notes ───────────────────────────── */}
      {essays.length > 0 && (
        <HubSection
          label="Essays & working notes"
          description="Exploratory documents, working notes, and essay-form writing in the ONN thread."
        >
          {essays.map((n) => (
            <DocCard
              key={n.slug}
              href={n.permalink}
              title={n.title}
              summary={n.summary}
              meta={n.updated ? `updated ${formatDate(n.updated)}` : undefined}
            />
          ))}
        </HubSection>
      )}

      {/* ── Related papers ────────────────────────────────────── */}
      <HubSection
        label="Manuscripts"
        description="Every ONN-track paper — published, accepted, or in preprint."
      >
        {relatedPapers.length === 0 ? (
          <Placeholder text="No ONN-track papers on file." />
        ) : (
          relatedPapers.map((p) => (
            <DocCard
              key={p.slug}
              href={p.permalink}
              title={p.title}
              summary={paperPublicSummary(p).slice(0, 220)}
              meta={`${p.status} · ${p.year}${p.claimStatus !== "current" ? ` · ${p.claimStatus}` : ""}${p.venue ? ` · ${p.venue}` : ""}`}
            />
          ))
        )}
      </HubSection>

      {/* ── footer cross-links ────────────────────────────────── */}
      <div className="mt-20 flex flex-wrap gap-6 border-t border-[var(--color-rule)] pt-8 text-sm">
        <Link
          href="/research/onn/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← Track overview
        </Link>
        <Link
          href="/scc/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          SCC hub →
        </Link>
        <Link
          href="/notes/part-0/integrated-architecture/"
          className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          Integrated architecture →
        </Link>
      </div>
    </Container>
  );
}

/* ── building blocks (mirrors /scc/page.tsx) ─────────────────── */

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
          <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)] md:w-56 md:shrink-0">
            {/* ONN hub — outlined accent chip (dynamic, architectural) */}
            <span
              aria-hidden
              className="inline-flex h-[18px] w-[18px] items-center justify-center border border-[var(--color-accent)] font-display text-[12px] italic leading-none text-[var(--color-accent)]"
            >
              {ONN_MARK}
            </span>
            {meta ?? "ONN"}
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
