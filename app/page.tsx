import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { recentWriting, researchTracks } from "@/lib/content";
import { formatDate, toIsoDate } from "@/lib/format";

export default function Home() {
  const recent = recentWriting.slice(0, 4);
  const tracks = researchTracks.slice(0, 3);

  return (
    <Container width="wide">
      {/* hero */}
      <section className="mt-20 max-w-[48rem] md:mt-32">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Research · 2026 —
        </p>
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]">
          A topology of
          <br />
          <em className="font-display italic text-[var(--color-accent)]">
            perception.
          </em>
        </h1>
        <p className="mt-10 max-w-[36rem] text-lg leading-relaxed text-[var(--color-muted)]">
          Notes, proofs, and experiments from an ongoing program on{" "}
          <span className="text-[var(--color-ink)]">
            Ontology Neural Networks
          </span>
          , cohomological structure in learned representations, and the
          mathematics of delay-robust embodied control.
        </p>
        <p className="mt-5 max-w-[36rem] text-base leading-relaxed text-[var(--color-muted)]">
          The ultimate target is a single{" "}
          <Link
            href="/notes/part-0/integrated-architecture/"
            className="text-[var(--color-ink)] underline decoration-[var(--color-accent)]/40 underline-offset-[3px] transition hover:decoration-[var(--color-accent)]"
          >
            cognitive-reasoning architecture
          </Link>{" "}
          unifying Soft Cognitive Cohesion and Ontology Neural Networks.
        </p>

        <div className="mt-10 flex flex-col gap-4 text-sm font-medium sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
          <Link
            href="/research/"
            className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--color-ink)] pb-0.5 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Enter the research →
          </Link>
          <Link
            href="/journal/"
            className="inline-flex min-h-11 items-center gap-2 text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            Read the journal
          </Link>
        </div>

        {/* accepted badge — quietly announces the latest acceptance */}
        <Link
          href="/papers/onn-ortsf-2026/"
          className="group mt-16 flex max-w-[36rem] items-start gap-4 border-l-2 border-[var(--color-accent)] py-3 pl-5 transition-colors hover:bg-[var(--color-surface)]/40"
        >
          <span className="mt-[3px] font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Recently accepted
          </span>
          <span className="flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
            <span className="text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
              Ontology Neural Network and ORTSF
            </span>
            {" — "}
            <em className="text-[var(--color-muted)]">
              Int. J. Topol.
            </em>
            , April 2026.
          </span>
        </Link>
      </section>

      {/* recent writing */}
      <section className="mt-32 border-t border-[var(--color-rule)] pt-10">
        <div className="mb-10 flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Recent writing
          </p>
          <Link
            href="/journal/"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            All entries →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-[var(--color-muted)]">No entries yet.</p>
        ) : (
          <ul className="divide-y divide-[var(--color-rule)]">
            {recent.map((item) => (
              <li key={item.permalink}>
                <Link
                  href={item.permalink}
                  className="group grid items-baseline gap-2 py-5 md:grid-cols-[8rem_1fr] md:gap-4 md:py-6"
                >
                  <time
                    dateTime={toIsoDate(item.date)}
                    className="font-mono text-xs text-[var(--color-subtle)]"
                  >
                    {formatDate(item.date)}
                  </time>
                  <div>
                    <h3 className="font-display text-lg leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] md:text-xl">
                      {item.title}
                    </h3>
                    {item.summary && (
                      <p className="mt-1 max-w-[40rem] text-sm leading-relaxed text-[var(--color-muted)]">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* research tracks preview */}
      <section className="mt-24 border-t border-[var(--color-rule)] pt-10">
        <div className="mb-10 flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Threads
          </p>
          <Link
            href="/research/"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            All threads →
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {tracks.map((track) => (
            <li key={track.slug}>
              <Link
                href={track.permalink}
                className="group block border-t border-[var(--color-rule)] pt-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {track.track}
                </p>
                <h3 className="font-display mt-3 text-xl leading-tight tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                  {track.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {track.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
