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
