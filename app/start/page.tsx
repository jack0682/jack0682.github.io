import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ONN_STATUS, SCC_STATUS, ULR_STATUS } from "@/lib/research-status";

export const metadata: Metadata = {
  alternates: { canonical: "/start/" },
  title: "Start here",
  description:
    "A plain-language orientation to ULR, the current main research programme, its SCC and ONN predecessors, supporting foundations, and evidence vocabulary.",
};

/** A quiet section wrapper matching the home page's hairline rhythm. */
function Section({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-[var(--color-rule)] pt-8 sm:mt-16 sm:pt-10">
      <h2 className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
        {eyebrow}
      </h2>
      {children}
    </section>
  );
}

const linkCls =
  "border-b border-[var(--color-accent)]/40 text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]";

export default function StartHerePage() {
  return (
    <Container width="prose">
      <PageHeader
        mark="?"
        eyebrow="Start here"
        title="What this is."
        lead="A working researcher's notebook, made public. It is dense and uses a lot of notation on purpose — so this page is the plain-language door in. Two minutes here and the rest of the site will make sense."
      />

      <Section eyebrow="The one-minute version">
        <p className="max-w-[42rem] text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          I&rsquo;m <span className="text-[var(--color-ink)]">Jaehong Oh</span> —
          a robotics engineer and AI researcher (Research Intern on the
          Perception Team at ROBOTIS; Mechanical Engineering undergraduate at
          Soongsil University, Seoul). This site tracks one long question:{" "}
          <em className="text-[var(--color-ink)]">
            what do learned systems actually share, and under which typed
            observables, gauges, interventions, and observers does that claim survive?
          </em>{" "}
          ULR is the current main programme; SCC and ONN remain as audited
          historical records, with mathematical and engineering tracks alongside it.
          I write up not just what
          works but what <em>doesn&rsquo;t</em> — including results that turned
          out to be boundaries rather than breakthroughs.
        </p>
      </Section>

      <Section eyebrow="The programme, in ordinary words">
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-xl leading-snug text-[var(--color-ink)]">
              1 · Unified Latent Representation (ULR) — current Main
            </h3>
            <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              The active programme asks what structure models truly share,
              when two representations count as identical, how an observer can
              distinguish learning from inference, and when organization forms.
              Canon 24 currently says <span className="text-[var(--color-ink)]">NO</span>
              to an additional neural-specific ULR ontology; that negative result
              is the boundary from which the next tests begin. Begin with the{" "}
              <Link href="/ulr/motivation/" className={linkCls}>
                founding Motivation and its self-corrections
              </Link>
              , then use the{" "}
              <Link href="/ulr/" className={linkCls}>
                ULR research hub
              </Link>{" "}
              and the{" "}
              <Link href={ULR_STATUS.statusHref ?? "/ulr/current-status/"} className={linkCls}>
                Canon 24 status
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl leading-snug text-[var(--color-ink)]">
              2 · Soft Cognitive Cohesion (SCC) — historical archive
            </h3>
            <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              SCC formalized pre-objective formation through a soft cohesion
              field and accumulated a sealed 98-claim ledger through CV-1.17.
              Its mathematics is preserved, but the programme is no longer Main
              and unresolved integration claims were not carried forward as facts.
              Read the{" "}
              <Link href="/ulr/from-scc-to-ulr/" className={linkCls}>
                SCC → ULR transition
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl leading-snug text-[var(--color-ink)]">
              3 · Ontology Neural Networks (ONN) &amp; ORTSF — historical archive
            </h3>
            <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              ONN tried to make learned topology a control-theoretic object.
              Its strong higher-order thesis was audited to a scoped No-Go;
              modest signals and a scalar stability result survive, while the
              coupled certificate does not. Read the{" "}
              <Link href={ONN_STATUS.statusHref ?? "/onn/"} className={linkCls}>
                ONN canonical audit
              </Link>.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl leading-snug text-[var(--color-ink)]">
              4 · RelationWorld, control, and robotics — supporting tracks
            </h3>
            <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              Discrete gauge mathematics supplies formal tools; control and
              robotics supply typed baselines, interventions, and physical test
              instruments. Browse the <Link href="/research/theory/" className={linkCls}>foundations</Link>,{" "}
              <Link href="/research/control/" className={linkCls}>control</Link>, and{" "}
              <Link href="/research/robotics/" className={linkCls}>robotics</Link> tracks.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="If you only read one thing">
        <p className="max-w-[42rem] text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          Read <Link href="/ulr/current-status/" className={linkCls}>ULR — Current Status</Link>,
          then <Link href="/ulr/mathematical-flow/" className={linkCls}>the complete mathematical flow</Link>.
          Together they separate established claims, negative results,
          retractions, noncanonical work, and the exact gate for reopening the ontology question.
        </p>
      </Section>

      <Section eyebrow="How this site is written">
        <ul className="max-w-[42rem] space-y-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
          <li>
            <span className="text-[var(--color-ink)]">Evidence first.</span>{" "}
            A claim states what would refute it, and negative results are
            published, not buried. Banners like &ldquo;audited&rdquo;,
            &ldquo;superseded&rdquo;, or &ldquo;No-Go&rdquo; are a feature, not a
            confession — they mark where a thought met reality.
          </li>
          <li>
            <span className="text-[var(--color-ink)]">Version-stamped.</span> The
            theory carries a release number (see the key below) so any claim can
            be traced to the exact state it was proved in.
          </li>
        </ul>
      </Section>

      <Section eyebrow="Notation key">
        <p className="mb-6 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)]">
          A handful of shorthand recurs across the notes. This is all of it:
        </p>
        <dl className="max-w-[44rem] space-y-4">
          {[
            [
              "Canon 24",
              `The current ULR canonical reconstruction, aligned with Ledger 105 and Progress #31. SCC's ${SCC_STATUS.version ?? "final release"} remains historical.`,
            ],
            [
              "Ledger 105",
              "The claim-level source of truth. Canon summarizes it but cannot silently promote, restore, or erase a claim.",
            ],
            [
              "M1–M8 · NO",
              "The completed ontology decision programme. NO means the current registry shows no incremental neural-specific ULR object beyond typed baselines; it is not a metaphysical impossibility claim.",
            ],
            [
              "noncanonical",
              "Post-Canon 24 working evidence. It may contain proved scoped mathematics or useful controls, but it has not been promoted to Canon 25.",
            ],
            [
              "Cat A / B / C",
              "Historical SCC proof-strength tiers. Cat A = fully proved; Cat B = proved under a stated structural condition; Cat C = strongly conditional. Retracted = withdrawn.",
            ],
            [
              "OP-xxxx",
              "An Open Problem — a tracked, numbered question that is not yet resolved.",
            ],
            [
              "W# (e.g. W7)",
              "A research week. The notebook is organised into weekly working cycles.",
            ],
            [
              "sealed",
              "A version cross-checked and frozen within its named evidence layer. In post-canon working documents it does not imply Canon promotion, Git commitment, or public release.",
            ],
            [
              "No-Go",
              "A proved impossibility or boundary — a statement that something cannot be done under the stated assumptions.",
            ],
          ].map(([term, def]) => (
            <div
              key={term}
              className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-5"
            >
              <dt className="font-mono text-sm text-[var(--color-accent)]">
                {term}
              </dt>
              <dd className="text-sm leading-relaxed text-[var(--color-muted)]">
                {def}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Where to go next">
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            ["/papers/", "Papers", "Peer-reviewed publications and preprints."],
            ["/research/", "Research", "The map — one Main, historical archives, and supporting tracks."],
            ["/notes/", "Notes", "The long mathematical book (dense)."],
            ["/about/", "About / CV", "Background, affiliations, and timeline."],
          ].map(([href, title, blurb]) => (
            <li key={href}>
              <Link
                href={href}
                className="group block border-t border-[var(--color-rule)] pt-4 transition-[color,transform] duration-200 hover:translate-x-0.5"
              >
                <span className="font-display text-lg text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                  {title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-[var(--color-muted)]">
                  {blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
