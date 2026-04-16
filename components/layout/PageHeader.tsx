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
    <header className={cn("pt-16 pb-10 sm:pt-20 md:pt-32 md:pb-16", className)}>
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-accent)] sm:mb-5">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-[clamp(2rem,7vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)]">
        {title}
      </h1>
      {lead && (
        <p className="mt-6 max-w-[38rem] text-base leading-relaxed text-[var(--color-muted)] sm:mt-8 sm:text-lg">
          {lead}
        </p>
      )}
    </header>
  );
}
