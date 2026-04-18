"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BIO, BIO_LOCALES, type BioLocale } from "@/lib/bio";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "bio-lang";

/** Map a navigator.language prefix to one of our locales. */
function detectLocale(): BioLocale {
  if (typeof navigator === "undefined") return "en";
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("ko")) return "ko";
  if (nav.startsWith("ja")) return "ja";
  if (nav.startsWith("de")) return "de";
  if (nav.startsWith("zh")) return "zh";
  return "en";
}

export function BioToggle({ initialLocale = "en" }: { initialLocale?: BioLocale }) {
  const [locale, setLocale] = useState<BioLocale>(initialLocale);
  const [hydrated, setHydrated] = useState(false);

  // On mount, prefer a stored choice; fall back to browser language.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (BIO_LOCALES as readonly string[]).includes(stored)) {
      setLocale(stored as BioLocale);
    } else {
      setLocale(detectLocale());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, hydrated]);

  const bio = useMemo(() => BIO[locale], [locale]);

  return (
    <section aria-label="Bio in selected language">
      {/* ── language selector ──────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Language"
        className="mb-10 flex flex-wrap gap-2 border-b border-[var(--color-rule)] pb-5 sm:mb-12 sm:gap-3 sm:pb-6"
      >
        {BIO_LOCALES.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              role="tab"
              aria-selected={active}
              aria-controls="bio-panel"
              lang={BIO[code].langTag}
              onClick={() => setLocale(code)}
              className={cn(
                "inline-flex items-center px-3 py-1.5 text-[13px] transition-colors",
                "border",
                active
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-surface)]"
                  : "border-[var(--color-rule)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
              )}
            >
              {BIO[code].label}
            </button>
          );
        })}
      </div>

      {/* ── panel ──────────────────────────────────────────── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          id="bio-panel"
          role="tabpanel"
          lang={bio.langTag}
          key={locale}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <h2 className="font-display text-[clamp(1.5rem,5vw,2.25rem)] leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)]">
            {bio.heading}
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--color-ink)]/90 sm:mt-8 sm:space-y-6 sm:text-base">
            {bio.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
