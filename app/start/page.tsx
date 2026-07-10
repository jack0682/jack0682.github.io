import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/start/" },
  title: "Start here",
  description:
    "A plain-language orientation to this site: who Jaehong Oh is, the three research threads (SCC, ONN/ORTSF, RelationWorld) in ordinary words, the one paper to read, and a key to the notation used throughout.",
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
            can perception, representation, and control be treated as one
            continuous mathematical object?
          </em>{" "}
          The work is split into three threads, and I write up not just what
          works but what <em>doesn&rsquo;t</em> — including results that turned
          out to be boundaries rather than breakthroughs.
        </p>
      </Section>

      <Section eyebrow="The three threads, in ordinary words">
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-xl leading-snug text-[var(--color-ink)]">
              1 · Soft Cognitive Cohesion (SCC)
            </h3>
            <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              A mathematical theory of how a region becomes{" "}
              <em className="text-[var(--color-ink)]">coherent</em>{" "}— how a
              blob &ldquo;holds together&rdquo; as a thing — <em>before</em> we
              split
              a scene into separately-named objects. It is the most developed
              thread (a growing body of proved theorems). Start at the{" "}
              <Link href="/research/perception/" className={linkCls}>
                perception thread
              </Link>{" "}
              or the{" "}
              <Link href="/notes/part-0/scc-research-overview/" className={linkCls}>
                overview
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl leading-snug text-[var(--color-ink)]">
              2 · Ontology Neural Networks (ONN) &amp; ORTSF
            </h3>
            <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              An attempt to make the <em>topology</em> of a learned
              representation do double duty as a control-theoretic object. The
              honest outcome: the strong version of that idea was{" "}
              <span className="text-[var(--color-ink)]">audited to a boundary</span>{" "}
              (a scoped &ldquo;No-Go&rdquo; — higher-order structure adds no
              information beyond pairwise). What survived is a modest positive
              signal and a standard, verified delay-robust control certificate.
              The framework paper is peer-reviewed and published; the story of
              what held up is on the{" "}
              <Link href="/onn/canonical-spec/" className={linkCls}>
                ONN canonical spec
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl leading-snug text-[var(--color-ink)]">
              3 · RelationWorld (the math underneath)
            </h3>
            <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              The mathematical substrate the other two stand on — discrete gauge
              structure on finite graphs, building combinatorial analogues of
              tools from geometry and physics. This is the{" "}
              <Link href="/research/theory/" className={linkCls}>
                mathematical-foundations
              </Link>{" "}
              track and the long{" "}
              <Link href="/notes/" className={linkCls}>
                Notes
              </Link>{" "}
              book.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="If you only read one thing">
        <p className="max-w-[42rem] text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          Read the peer-reviewed paper —{" "}
          <Link href="/papers/onn-ortsf-2026/" className={linkCls}>
            <em>Ontology Neural Network and ORTSF</em>
          </Link>{" "}
          (International Journal of Topology, MDPI, 2026) — then its{" "}
          <span className="text-[var(--color-ink)]">2026 audit note</span>, which
          is the clearest example of how this site works: a published claim, put
          under its own rigorous scrutiny, and reported honestly whichever way it
          lands.
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
              "CV-x.y",
              "Canonical Version — the release number of the theory. Higher is newer; the current SCC canonical is CV-1.17.",
            ],
            [
              "Cat A / B / C",
              "Proof-strength tiers. Cat A = fully proved; Cat B = proved under a stated structural condition; Cat C = strongly conditional. Retracted = withdrawn.",
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
              "A version that has been cross-checked for internal consistency and frozen as a reference point.",
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
            ["/research/", "Research", "The map — five threads, one target."],
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
