import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResearchStatusBanner } from "@/components/research/ResearchStatusBanner";
import { ulrHub } from "@/lib/content";
import { ULR_STATUS } from "@/lib/research-status";
import { ulrCanonLabel, ulrDocStatusLabel } from "@/lib/ulr-labels";

const ULR_HUB_DESCRIPTION =
  "ULR is the current Main research programme on sharing, identity, role, and formation in learned systems, organised around its motivation, Canon 24, mathematics, evidence, and open problems.";

export const metadata: Metadata = {
  alternates: { canonical: "/ulr/" },
  title: "ULR · Main Research Hub",
  description: ULR_HUB_DESCRIPTION,
  openGraph: {
    url: "/ulr/",
    locale: "en_GB",
    images: [{ url: "/og/ulr/index.png", width: 1200, height: 630, alt: "Unified Latent Representation · Main research" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/ulr/index.png"] },
};

const READING_ORDER = [
  ["Why ULR — Motivation", "/ulr/motivation/"],
  ["Current canonical verdict and evidential boundary", "/ulr/current-status/"],
  ["Canonical state — Canon 24", "/ulr/canonical-state/"],
  ["From SCC to ULR", "/ulr/from-scc-to-ulr/"],
  ["Canon 2–24 evolution", "/ulr/canon-evolution/"],
  ["Complete mathematical flow", "/ulr/mathematical-flow/"],
  ["Conclusions and claim ledger", "/ulr/claim-ledger/"],
] as const;

export default function UlrHubPage() {
  return (
    <Container lang="en" data-track="ulr">
      <PageHeader
        mark="Ω"
        eyebrow="Main research · ULR"
        title="Unified Latent Representation."
        lead={ULR_HUB_DESCRIPTION}
      />

      <div aria-hidden className="-mt-6 mb-14 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-subtle)]">
        <span className="h-px w-10 bg-[var(--color-accent)]" />
        <span>Sharing · Identity · Role · Formation</span>
      </div>

      <ResearchStatusBanner status={ULR_STATUS} className="-mt-6 mb-12" />

      <div className="mb-14 max-w-[46rem] border-l-2 border-[var(--color-accent)] py-3 pl-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">Canonical interpretation</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          Canon 24 does not claim that a universal entity called ULR has been discovered.
          Its result is <strong className="font-medium text-[var(--color-ink)]">M8 · NO</strong>:
          under the current registry, there is no evidence that an additional neural-specific
          ontology is required. Negative results and the history of retractions are published
          as formal research outcomes.
        </p>
      </div>

      <section className="mb-16">
        <p className="sci-eyebrow text-xs text-[var(--color-accent)]">Recommended reading order</p>
        <ol className="mt-4 border-y border-[var(--color-rule)] divide-y divide-[var(--color-rule)]">
          {READING_ORDER.map(([label, href], index) => (
            <li key={href}>
              <Link href={href} className="group flex items-baseline gap-4 py-4 text-sm">
                <span className="font-mono text-[11px] text-[var(--color-subtle)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">{label}</span>
                <span aria-hidden className="ml-auto text-[var(--color-subtle)] group-hover:text-[var(--color-accent)]">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <DocSection title="Motivation · Why ULR" description="How the founding intuition became testable obligations for Sharing, Identity, Role, and Formation—and why the programme remains after self-correction and a negative verdict." docs={ulrHub.motivation} />
      <DocSection title="Current status" description="The canonical verdict, authority order, and the boundary between what can and cannot currently be claimed." docs={ulrHub.status} />
      <DocSection title="SCC → ULR" description="Why SCC was frozen as a historical layer rather than deleted, with explicit boundaries between preservation, discontinuation, and reinterpretation." docs={ulrHub.migration} />
      <DocSection title="Canon and evolution" description="The current canonical state and the genealogy of claims adopted, downgraded, or retracted across Canons 2–24." docs={[...ulrHub.canonical, ...ulrHub.history]} />
      <DocSection title="Mathematical flow" description="The complete logical spine from observable typing through gauge, fibre, assembly, observer role, and formation." docs={ulrHub.mathematics} />
      <DocSection title="Experiments, conclusions, and ledger" description="Trace M1–M8, empirical atoms, carrier 0/7, active claims, and the retracted composite in one place." docs={ulrHub.evidence} />
      <DocSection title="Post-canon frontier" description="The post-Canon working record: theory, diagnostics, audits, preregistrations, and evidence produced after Canon 24. This layer is explicitly non-canonical and has not been promoted to Canon 25." docs={ulrHub.frontier} />
      <DocSection title="Open problems and reopening gates" description="Preregistered conditions specifying what evidence would be required to reopen the ontology verdict." docs={ulrHub.openProblems} />

      <div className="mt-20 flex flex-wrap gap-6 border-t border-[var(--color-rule)] pt-8 text-sm">
        <Link href="/research/ulr/" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">Track overview →</Link>
        <Link href="/scc/" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">SCC historical archive →</Link>
        <Link href="/onn/" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">ONN historical archive →</Link>
      </div>
    </Container>
  );
}

type UlrDoc = (typeof ulrHub.status)[number];

function DocSection({ title, description, docs }: { title: string; description: string; docs: UlrDoc[] }) {
  if (docs.length === 0) return null;
  return (
    <section className="mt-16 border-t border-[var(--color-rule)] pt-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
        <h2 className="sci-eyebrow text-xs text-[var(--color-accent)]">{title}</h2>
        <p className="max-w-[38rem] text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
      </div>
      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={doc.permalink} className="group block py-6 sm:py-7">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-subtle)] md:w-48 md:shrink-0">
                  {ulrDocStatusLabel(doc.status)} · {ulrCanonLabel(doc.canon, doc.kind)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-accent)] sm:text-2xl">{doc.title}</h3>
                  {(doc.summary ?? doc.description) && <p className="mt-2 max-w-[46rem] text-sm leading-relaxed text-[var(--color-muted)]">{doc.summary ?? doc.description}</p>}
                </div>
                <span aria-hidden className="hidden text-[var(--color-subtle)] group-hover:text-[var(--color-accent)] md:inline">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
