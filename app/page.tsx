import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { TeX } from "@/components/mdx/TeX";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { recentWriting, researchTracks, papers } from "@/lib/content";
import { toIsoDate } from "@/lib/format";

export default function Home() {
  const recent = recentWriting.slice(0, 4);
  const tracks = researchTracks.slice(0, 3);
  const latestAccepted = papers.find((p) => p.status === "published" || p.status === "accepted");

  return (
    <Container width="wide">
      {/* ── hero: identity first ──────────────────────────── */}
      <section className="relative mt-20 max-w-[48rem] md:mt-32">
        {/* marginal χ — visible only on wide viewports, quiet */}
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -left-20 top-[-0.4em] hidden select-none text-[10rem] italic leading-none text-[var(--color-accent)]/10 lg:block"
        >
          χ
        </span>
        <HeroReveal>
          {[
            <div
              key="stripe"
              aria-hidden
              className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-subtle)]"
            >
              <span className="h-px w-10 bg-[var(--color-accent)]" />
              <TeX expr="\chi : \mathcal{R} \longrightarrow H^{\ast}(\mathcal{R};\mathbb{R})" />
            </div>,
            <h1
              key="h1"
              className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]"
            >
              Jaehong Oh.
            </h1>,
            <p
              key="eyebrow"
              className="mt-4 sci-eyebrow text-xs text-[var(--color-accent)]"
            >
              Robotics · AI · Mathematics
            </p>,
            <p
              key="body"
              className="mt-8 max-w-[38rem] text-lg leading-relaxed text-[var(--color-muted)]"
            >
              Robotics engineer and AI researcher working at the intersection of{" "}
              <span className="text-[var(--color-ink)]">
                topological reasoning
              </span>
              ,{" "}
              <span className="text-[var(--color-ink)]">
                cohomological structure
              </span>
              , and{" "}
              <span className="text-[var(--color-ink)]">
                delay-robust embodied control
              </span>
              . Building toward a unified cognitive-reasoning architecture for
              autonomous systems.
            </p>,
            <div
              key="cta"
              className="mt-8 flex flex-col gap-4 text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-5"
            >
              <Link
                href="/about/"
                className="group inline-flex min-h-11 items-center gap-2 border-b border-[var(--color-ink)] pb-0.5 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                About me
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
              <Link
                href="/research/"
                className="inline-flex min-h-11 items-center gap-2 text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
              >
                Research programme
              </Link>
              <Link
                href="/papers/"
                className="inline-flex min-h-11 items-center gap-2 text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
              >
                Papers
              </Link>
            </div>,
          ]}
        </HeroReveal>
      </section>

      {/* ── highlights ────────────────────────────────────── */}
      <section className="mt-24 border-t border-[var(--color-rule)] pt-10">
        <h2 className="mb-8 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Highlights
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* latest paper badge */}
          {latestAccepted && (
            <Link
              href={latestAccepted.permalink}
              className="group flex flex-col gap-2 border-l-2 border-[var(--color-accent)] py-3 pl-5 transition-colors hover:bg-[var(--color-surface)]/40"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                {latestAccepted.status === "accepted" ? "Recently accepted" : "Latest paper"}
              </span>
              <span className="text-sm leading-relaxed text-[var(--color-muted)]">
                <span className="line-clamp-1 text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                  {latestAccepted.title}
                </span>
                {latestAccepted.venue && (
                  <span className="mt-1 block">
                    <em>{latestAccepted.venue}</em>
                    {`, ${latestAccepted.year}`}
                  </span>
                )}
              </span>
            </Link>
          )}

          {/* research milestone */}
          <Link
            href="/scc/"
            className="group flex flex-col gap-2 border-l-2 border-[var(--color-rule)] py-3 pl-5 transition-colors hover:bg-[var(--color-surface)]/40"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
              Research programme
            </span>
            <span className="text-sm leading-relaxed text-[var(--color-muted)]">
              <span className="text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                Soft Cognitive Cohesion
              </span>
              {" — 43 theorems proved, canonical spec at v2.1."}
            </span>
          </Link>

          {/* ONN hub */}
          <Link
            href="/onn/"
            className="group flex flex-col gap-2 border-l-2 border-[var(--color-rule)] py-3 pl-5 transition-colors hover:bg-[var(--color-surface)]/40"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
              Architecture
            </span>
            <span className="text-sm leading-relaxed text-[var(--color-muted)]">
              <span className="text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                Ontology Neural Networks
              </span>
              {" — topology-preserving learned representations + ORTSF control."}
            </span>
          </Link>
        </div>
      </section>

      {/* ── recent writing ────────────────────────────────── */}
      <section className="mt-24 border-t border-[var(--color-rule)] pt-10">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Recent writing
          </h2>
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
                  className="group grid items-baseline gap-2 py-5 md:grid-cols-[6rem_1fr] md:gap-6 md:py-6"
                >
                  <time
                    dateTime={toIsoDate(item.date)}
                    className="font-mono text-[11px] tabular-nums tracking-[0.05em] text-[var(--color-subtle)]"
                  >
                    {toIsoDate(item.date)}
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

      {/* ── research programme ────────────────────────────── */}
      <section className="mt-24 border-t border-[var(--color-rule)] pt-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Research programme
          </h2>
          <Link
            href="/research/"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            All threads →
          </Link>
        </div>
        <p className="mb-10 max-w-[38rem] text-sm leading-relaxed text-[var(--color-muted)]">
          An ongoing programme on the{" "}
          <em className="text-[var(--color-ink)]">topology of perception</em>
          {" — "}from cohomological field theory to embodied robotic control.
        </p>

        {/* decorative formula row */}
        <div
          aria-hidden
          className="mb-10 select-none text-xs text-[var(--color-subtle)]"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <TeX expr="\int_{X} \omega \;=\; \langle [\omega], [X] \rangle" />
            <span className="opacity-60">·</span>
            <TeX expr="H^{n}(X;\mathbb{R}) \;\cong\; \mathrm{Hom}(H_{n},\mathbb{R})" />
            <span className="opacity-60">·</span>
            <TeX expr="\kappa \cdot u_{t} \longrightarrow \Phi_{t}" />
          </div>
          <div className="sci-axis-ticks mt-3 h-2 opacity-60" />
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
