#!/usr/bin/env node
/**
 * Fail the production build when an exported page points at an internal URL
 * that does not exist in `out/`. This checks the generated site rather than
 * source text, so links emitted by MDX and React components are covered alike.
 */

import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(root, "out");

if (!existsSync(outputDir)) {
  console.error("[internal-links] out/ is missing; run the production build first.");
  process.exit(1);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const entry = statSync(path);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.isFile()) yield path;
  }
}

function routeForHtml(file) {
  const rel = relative(outputDir, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel.replace(/\.html$/, "")}`;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"');
}

function targetExists(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }

  const localPath = decoded.replace(/^\/+/, "");
  const exact = resolve(outputDir, localPath);
  if (!exact.startsWith(`${outputDir}${sep}`) && exact !== outputDir) return false;

  const candidates = decoded.endsWith("/")
    ? [join(exact, "index.html")]
    : [exact, `${exact}.html`, join(exact, "index.html")];
  return candidates.some(existsSync);
}

const failures = new Map();
let checked = 0;

for (const file of walk(outputDir)) {
  if (!file.endsWith(".html")) continue;
  const sourceRoute = routeForHtml(file);
  const html = readFileSync(file, "utf8");
  const attributePattern = /\b(?:href|src)=(?:"([^"]*)"|'([^']*)')/g;

  for (const match of html.matchAll(attributePattern)) {
    const raw = decodeHtml(match[1] ?? match[2] ?? "").trim();
    if (
      !raw ||
      raw.startsWith("#") ||
      /^(?:mailto:|tel:|data:|blob:|javascript:)/i.test(raw)
    ) {
      continue;
    }

    let url;
    try {
      url = new URL(raw, `https://internal.test${sourceRoute}`);
    } catch {
      continue;
    }
    if (url.origin !== "https://internal.test") continue;

    checked++;
    if (targetExists(url.pathname)) continue;

    const sources = failures.get(url.pathname) ?? new Set();
    sources.add(sourceRoute);
    failures.set(url.pathname, sources);
  }
}

if (failures.size > 0) {
  console.error(`[internal-links] ${failures.size} missing internal target(s):`);
  for (const [target, sources] of [...failures].sort(([a], [b]) => a.localeCompare(b))) {
    console.error(`  ${target} <- ${[...sources].sort().join(", ")}`);
  }
  process.exit(1);
}

console.log(`[internal-links] checked ${checked} generated links; no missing targets.`);
