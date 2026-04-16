import Link from "next/link";

/**
 * Landing page — typography-first hero.
 * Intentionally minimal in features and maximal in type care, so we can
 * lock in the design language before building out routes.
 */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[72rem] flex-1 flex-col px-6 py-20 sm:px-10 md:py-32">
      {/* top rail */}
      <header className="flex items-center justify-between text-sm font-medium tracking-wide text-[var(--color-muted)]">
        <span className="font-display text-base text-[var(--color-ink)]">
          Jaehong&nbsp;Oh
        </span>
        <nav className="flex gap-8">
          <Link href="/research/" className="hover:text-[var(--color-accent)]">
            Research
          </Link>
          <Link href="/papers/" className="hover:text-[var(--color-accent)]">
            Papers
          </Link>
          <Link href="/journal/" className="hover:text-[var(--color-accent)]">
            Journal
          </Link>
          <Link href="/about/" className="hover:text-[var(--color-accent)]">
            About
          </Link>
        </nav>
      </header>

      {/* hero */}
      <section className="mt-28 md:mt-40 max-w-[48rem]">
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

        <div className="mt-12 flex flex-wrap gap-5 text-sm font-medium">
          <Link
            href="/research/"
            className="inline-flex items-center gap-2 border-b border-[var(--color-ink)] pb-0.5 text-[var(--color-ink)] transition hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
          >
            Enter the research →
          </Link>
          <Link
            href="/journal/"
            className="inline-flex items-center gap-2 text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            Read the journal
          </Link>
        </div>
      </section>

      {/* type specimen — temporary, for design QA */}
      <section className="mt-32 border-t border-[var(--color-rule)] pt-10">
        <p className="mb-8 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          type specimen
        </p>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
              Display · Fraunces
            </p>
            <p className="font-display mt-3 text-5xl leading-tight text-[var(--color-ink)]">
              The architecture of meaning.
            </p>
            <p className="prose-essay mt-5 text-lg text-[var(--color-muted)]">
              A perception that is never merely passive, but always a
              hypothesis about the world it inhabits — continuously revised,
              continuously refined.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
              Body · Inter
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-ink)]">
              Each page of this site is meant to support the longform reading
              of technical material: theorems, proofs, and the occasional
              essay. The typography is tuned for extended sessions rather than
              glance value.
            </p>
            <p className="mt-4 font-mono text-sm text-[var(--color-muted)]">
              ∫_X ω = ⟨[ω], [X]⟩ &nbsp;— Stokes, informally
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-32 flex items-center justify-between border-t border-[var(--color-rule)] pt-8 text-xs text-[var(--color-subtle)]">
        <span>© {new Date().getFullYear()} Jaehong Oh</span>
        <span className="font-mono">jack0682.github.io</span>
      </footer>
    </main>
  );
}
