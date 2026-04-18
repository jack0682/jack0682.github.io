"use client";

import { useState } from "react";

export function CopyBibtexButton({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
