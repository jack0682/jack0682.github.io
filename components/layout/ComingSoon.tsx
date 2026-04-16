/**
 * Placeholder notice for routes scaffolded but not yet populated.
 * Matches the overall type treatment so stub pages don't feel jarring.
 */
export function ComingSoon({ note }: { note?: string }) {
  return (
    <section className="border-t border-[var(--color-rule)] pt-10">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
        In preparation
      </p>
      <p className="max-w-[38rem] text-base leading-relaxed text-[var(--color-muted)]">
        {note ??
          "This section is being assembled as part of the ongoing site rebuild. Content migration from the research archive is staged; pages will populate incrementally."}
      </p>
    </section>
  );
}
