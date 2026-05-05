import { cn } from "@/lib/cn";

type Props = {
  /** Glyph rendered at the centre of the rule. Defaults to a sci section mark. */
  mark?: string;
  className?: string;
};

/**
 * Section divider: hairline + centred academic glyph. Replaces a
 * plain `border-t` where a more deliberate close-of-section cue is
 * wanted. Pass any short character (`§`, `∂`, `χ`, `∮`, `⟂`, etc.).
 */
export function Divider({ mark = "§", className }: Props) {
  return (
    <div
      role="separator"
      aria-hidden
      className={cn(
        "my-12 flex items-center gap-4 text-[var(--color-subtle)]",
        className,
      )}
    >
      <span className="h-px flex-1 bg-[var(--color-rule)]" />
      <span className="sci-section-mark font-display text-base not-italic leading-none text-[var(--color-accent)]">
        {mark}
      </span>
      <span className="h-px flex-1 bg-[var(--color-rule)]" />
    </div>
  );
}
