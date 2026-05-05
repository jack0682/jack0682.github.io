/**
 * Single source of truth for the deployed site origin.
 *
 * Override at build time with `SITE_URL=https://example.com pnpm build`
 * (e.g. when previewing on a different host or moving to a project repo
 * where a `BASE_PATH` is also required).
 */

const DEFAULT_SITE_URL = "https://jack0682.github.io";

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const SITE_URL: string = stripTrailingSlash(
  process.env.SITE_URL ?? DEFAULT_SITE_URL,
);

export const BASE_PATH: string = process.env.BASE_PATH
  ? `/${process.env.BASE_PATH.replace(/^\/+|\/+$/g, "")}`
  : "";

export function absoluteUrl(path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${BASE_PATH}${normalized}`;
}

/**
 * Search Console verification tokens. Set via build-time env vars:
 *   GOOGLE_SITE_VERIFICATION=...  (paste from Google Search Console
 *                                  HTML-tag verification flow)
 *   BING_SITE_VERIFICATION=...    (Bing Webmaster Tools)
 *
 * Each becomes an opt-in `<meta name="...">` injected by `app/layout.tsx`.
 * Empty / unset → no meta emitted, no behaviour change.
 */
export const GOOGLE_SITE_VERIFICATION: string | undefined =
  process.env.GOOGLE_SITE_VERIFICATION || undefined;

export const BING_SITE_VERIFICATION: string | undefined =
  process.env.BING_SITE_VERIFICATION || undefined;

/**
 * Google Tag Manager container ID. Required for GA4 / event tracking.
 * Override at build time with `GTM_ID=GTM-XXXXXXX` to disable in
 * dev / staging by setting an empty string.
 */
export const GTM_ID: string | undefined =
  process.env.GTM_ID === ""
    ? undefined
    : (process.env.GTM_ID ?? "GTM-MT5JRXS7");
