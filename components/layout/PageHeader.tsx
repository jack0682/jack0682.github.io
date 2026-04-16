import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
};

/**
 * Standard page header used on section index pages and essays.
 * Three-part structure: eyebrow → display title → lead paragraph.
 */
export function PageHeader({ eyebrow, title, lead, className }: Props) {
  return (
    <header className={cn("pt-20 pb-12 md:pt-32 md:pb-16", className)}>
      {eyebrow && (
        <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-[var(--color-ink)]">
        {title}
      </h1>
      {lead && (
        <p className="mt-8 max-w-[38rem] text-lg leading-relaxed text-[var(--color-muted)]">
          {lead}
        </p>
      )}
    </header>
  );
}
