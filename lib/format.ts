/**
 * Academic-style ISO date → "16 Apr 2026".
 * Kept locale-fixed (en-GB) for stable SSR output, regardless of the
 * server's default locale during static export.
 */
export function formatDate(iso: string) {
  const d = new Date(iso.length === 10 ? iso + "T12:00:00Z" : iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** "2026-04-16" for <time dateTime={...}> / ISO contexts. */
export function toIsoDate(iso: string) {
  return iso.slice(0, 10);
}
