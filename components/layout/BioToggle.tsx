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
      {/* ── language selector — glass puck slides BENEATH labels ─── */}
      <div className="mb-10 flex border-b border-[var(--color-rule)] pb-5 sm:mb-12 sm:pb-6">
        <div
          role="tablist"
          aria-label="Language"
          className="sci-dot-grid relative inline-flex border border-[var(--color-rule)] bg-[var(--color-surface)]/25 p-1"
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
                className="relative inline-flex items-center justify-center px-3 py-1.5 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:px-4 sm:py-2"
              >
                {/* Glass puck — z-1, slides UNDERNEATH the label. Its
                    backdrop-filter refracts the page content behind the
                    tablist, not the label, so the label stays crisp. */}
                {active && (
                  <motion.span
                    layoutId="bio-active-indicator"
                    aria-hidden
                    className="liquid-glass-puck pointer-events-none absolute inset-0 z-[1] overflow-hidden"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 26,
                    }}
                  >
                    {/* dome highlight — light caught on the meniscus */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/45 via-white/12 to-transparent dark:from-white/15 dark:via-white/5"
                    />
                    {/* warm accent kiss — marks the active tab subtly */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[var(--color-accent)] opacity-[0.10] mix-blend-multiply dark:mix-blend-screen dark:opacity-[0.18]"
                    />
                  </motion.span>
                )}
                {/* Label — z-2, always on top, always sharp */}
                <span
                  className={cn(
                    "relative z-[2] transition-colors duration-200",
                    active
                      ? "font-medium text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-accent)]",
                  )}
                >
                  {BIO[code].label}
                </span>
              </button>
            );
          })}
        </div>
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
