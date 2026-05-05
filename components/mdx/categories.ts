/**
 * Visual + semantic vocabulary for theorem and proof verification status.
 *
 * Used by `<Theorem category=...>` and `<Proof status=...>` to render a
 * small chip in the eyebrow row. Categories follow the SCC project's
 * convention catalogued at `/notes/part-0/scc-theorem-registry/`.
 */

export type TheoremCategory = "A" | "B" | "C" | "retracted";

type CategoryEntry = {
  /** Short label rendered inside the chip. */
  label: string;
  /** Native `title` tooltip explaining the category. */
  tooltip: string;
  /** Tailwind classes applied to the chip. */
  className: string;
};

export const CATEGORY: Record<TheoremCategory, CategoryEntry> = {
  A: {
    label: "Cat A",
    tooltip: "Category A · fully proved without conditions",
    className:
      "border-[var(--color-ink)] text-[var(--color-ink)]",
  },
  B: {
    label: "Cat B",
    tooltip: "Category B · proved under stated structural conditions",
    className:
      "border-[var(--color-muted)] text-[var(--color-muted)]",
  },
  C: {
    label: "Cat C",
    tooltip: "Category C · proved only in a restricted regime",
    className:
      "border-[var(--color-subtle)] text-[var(--color-subtle)]",
  },
  retracted: {
    label: "Retracted",
    tooltip: "Retracted · the claim was withdrawn or falsified",
    className:
      "border-[var(--color-rule)] text-[var(--color-subtle)] line-through decoration-[1px]",
  },
};
