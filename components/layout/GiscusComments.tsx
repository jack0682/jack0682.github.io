"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { GISCUS_CONFIG } from "@/lib/giscus";

/**
 * Lightweight wrapper around `@giscus/react` that reads the resolved
 * theme from `next-themes` and stays quiet until `lib/giscus.ts` is
 * filled in with real IDs. Mounted only on journal entries — notes
 * and papers stay comment-free per the academic register.
 */
export function GiscusComments() {
  const { resolvedTheme } = useTheme();

  if (!GISCUS_CONFIG) return null;

  return (
    <section
      aria-label="Comments"
      className="mt-16 border-t border-[var(--color-rule)] pt-10"
    >
      <p className="mb-6 sci-eyebrow text-xs text-[var(--color-accent)]">
        Discussion
      </p>
      <Giscus
        repo={GISCUS_CONFIG.repo}
        repoId={GISCUS_CONFIG.repoId}
        category={GISCUS_CONFIG.category}
        categoryId={GISCUS_CONFIG.categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark_dimmed" : "light"}
        lang="en"
        loading="lazy"
      />
    </section>
  );
}
