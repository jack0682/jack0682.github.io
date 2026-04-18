import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  /**
   * Scientific marker glyph rendered before the eyebrow. Defaults to
   * `§` (section sign) to match the academic-paper voice. Pass `χ`,
   * `∂`, `∮`, `α`, `ℓ`, etc. on a per-page basis.
   */
  mark?: string;
  title: string;
  lead?: string;
  className?: string;
};

/**
 * Standard page header used on section index pages and essays.
 * Three-part structure: eyebrow → display title → lead paragraph.
 */
export function PageHeader({
  eyebrow,
  mark = "§",
  title,
  lead,
  className,
}: Props) {
  return (
    <header className={cn("pt-10 pb-8 sm:pt-20 sm:pb-10 md:pt-32 md:pb-16", className)}>
      {eyebrow && (
        <p className="mb-3 sci-eyebrow text-[11px] text-[var(--color-accent)] sm:mb-5 sm:text-xs">
          <span className="sci-section-mark mr-2 not-italic text-[0.95em]">
            {mark}
          </span>
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-[clamp(1.75rem,8vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)]">
        {title}
      </h1>
      {lead && (
        <p className="mt-5 max-w-[38rem] text-sm leading-relaxed text-[var(--color-muted)] sm:mt-8 sm:text-lg">
          {lead}
        </p>
      )}
    </header>
  );
}
