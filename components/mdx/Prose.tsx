import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Typographic wrapper for long-form MDX content. Uses Tailwind's
 * typography plugin with tokens remapped to our design system.
 * The `prose-essay` class from globals.css switches the body font
 * to a Fraunces variable optical-size, giving essays a book-like feel.
 */
export function Prose({
  className,
  essay = false,
  ...props
}: ComponentPropsWithoutRef<"article"> & { essay?: boolean }) {
  return (
    <article
      className={cn(
        "prose prose-stone max-w-none",
        // remap core tokens to design system
        "prose-headings:font-display prose-headings:tracking-tight",
        "prose-headings:text-[var(--color-ink)]",
        "prose-p:text-[var(--color-ink)]/90 prose-p:leading-relaxed",
        "prose-strong:text-[var(--color-ink)]",
        "prose-a:text-[var(--color-accent)] prose-a:decoration-[var(--color-accent)]/30 hover:prose-a:decoration-[var(--color-accent)]",
        "prose-code:text-[var(--color-ink)] prose-code:bg-[var(--color-rule)]/40 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.9em]",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-[var(--color-surface)] prose-pre:border prose-pre:border-[var(--color-rule)] prose-pre:rounded-md",
        "prose-blockquote:border-l-[var(--color-accent)] prose-blockquote:text-[var(--color-muted)]",
        "prose-hr:border-[var(--color-rule)]",
        "prose-li:marker:text-[var(--color-accent)]",
        "prose-th:text-[var(--color-ink)] prose-td:text-[var(--color-ink)]/90",
        essay && "prose-essay",
        className,
      )}
      {...props}
    />
  );
}
