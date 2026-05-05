"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

type Tag = "h2" | "h3" | "h4";

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Heading wrapper that exposes a hover-revealed `#` button copying a
 * deep link to the section. The `id` is injected upstream by
 * rehype-slug. Touch users get a tap-toggleable "copied" pill via
 * `aria-live` so the action remains discoverable without hover.
 */
function makeAnchor(Tag: Tag) {
  return function AnchorHeading({ id, children, className }: Props) {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(() => {
      if (!id || typeof window === "undefined") return;
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard?.writeText(url).then(
        () => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        },
        () => {
          // clipboard write may reject (e.g. permission denied); silent.
        },
      );
    }, [id]);

    return (
      <Tag id={id} className={cn("group relative scroll-mt-24", className)}>
        {children}
        {id && (
          <button
            type="button"
            onClick={copy}
            aria-label="Copy link to this section"
            className={cn(
              "ml-2 inline-block align-middle font-mono text-[0.7em] leading-none",
              "text-[var(--color-subtle)] opacity-0 transition-opacity duration-150",
              "group-hover:opacity-100 focus-visible:opacity-100 hover:text-[var(--color-accent)]",
            )}
          >
            {copied ? "✓" : "#"}
          </button>
        )}
      </Tag>
    );
  };
}

export const H2 = makeAnchor("h2");
export const H3 = makeAnchor("h3");
export const H4 = makeAnchor("h4");
