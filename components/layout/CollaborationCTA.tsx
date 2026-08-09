import { EMAIL } from "@/lib/identity";
import { cn } from "@/lib/cn";

type Context = "research" | "papers";
type Variant = "panel" | "footer";

const copy: Record<Context, { title: string; body: string }> = {
  research: {
    title: "A specific question is a good place to start.",
    body: "If your work overlaps with representation comparison, gauge-aware identity, predictive or causal state, observer-relative learning and inference, formation, or embodied testing, send a short note with the concrete question and relevant evidence.",
  },
  papers: {
    title: "Questions and careful reproductions are welcome.",
    body: "For a question about a manuscript, a reproduction note, or a focused collaboration proposal, include the paper title and the exact claim or experiment you want to discuss.",
  },
};

export function CollaborationCTA({
  context = "research",
  variant = "panel",
  className,
}: {
  context?: Context;
  variant?: Variant;
  className?: string;
}) {
  const text = copy[context];
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    context === "papers"
      ? "Paper question or reproduction note"
      : "Research collaboration inquiry",
  )}`;

  return (
    <aside
      aria-label="Research collaboration"
      className={cn(
        "border-y border-[var(--color-rule)]",
        variant === "panel"
          ? "mt-20 grid gap-6 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 sm:py-10"
          : "grid gap-5 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12 sm:py-10",
        className,
      )}
    >
      <div className="max-w-[44rem]">
        <p className="sci-eyebrow text-[11px] text-[var(--color-accent)]">
          <span className="sci-section-mark mr-2 not-italic">↗</span>
          Collaborate
        </p>
        <h2
          className={cn(
            "mt-3 font-display leading-tight tracking-tight text-[var(--color-ink)]",
            variant === "panel" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          )}
        >
          {text.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          {text.body}
        </p>
      </div>

      <a
        href={mailto}
        className="group inline-flex min-h-11 items-center justify-between gap-5 border-b border-[var(--color-ink)] pb-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:justify-start"
      >
        <span>
          Email Jaehong
          <span className="mt-0.5 block font-mono text-[10px] font-normal tracking-[0.08em] text-[var(--color-subtle)]">
            {EMAIL}
          </span>
        </span>
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </a>
    </aside>
  );
}
