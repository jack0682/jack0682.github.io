"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Check, Copy } from "lucide-react";

/**
 * MDX `pre` override that adds a hover/focus-revealed copy button to
 * code blocks. Reads `innerText` (preserving line breaks) rather than
 * textContent so multi-line snippets copy correctly.
 */
export function CodeBlock({
  className,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div className="group relative">
      <pre ref={ref} className={className} {...props} />
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2.5 top-2.5 inline-flex h-8 items-center gap-1.5 rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)]/80 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-subtle)] opacity-0 backdrop-blur-sm transition-opacity hover:text-[var(--color-accent)] focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? <Check size={12} strokeWidth={2} /> : <Copy size={12} strokeWidth={1.75} />}
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
