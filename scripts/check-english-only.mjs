/**
 * Fail the build when public source files contain non-English writing-system
 * characters or explicitly opt a rendered surface into a non-English locale.
 * Greek is intentionally allowed because the research corpus uses it in math.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoots = ["app", "components", "content", "lib", "public", "scripts"];
const scanGenerated = process.argv.includes("--generated") || process.argv.includes("--all");
const scanOutput = process.argv.includes("--all");
const roots = [
  ...sourceRoots,
  ...(scanGenerated ? [".velite"] : []),
  ...(scanOutput ? ["out"] : []),
];
const extensions = new Set([
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".py",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
]);
// Next's JavaScript chunks include third-party glyph and locale tables that are
// not rendered copy. Generated data is checked separately through `.velite`,
// so the final output audit targets only user-visible/static text surfaces.
const outputExtensions = new Set([
  ".html",
  ".json",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
]);
const self = resolve(root, "scripts/check-english-only.mjs");

const nonEnglishScript = new RegExp(
  [
    "\\p{Script=Hangul}",
    "\\p{Script=Han}",
    "\\p{Script=Hiragana}",
    "\\p{Script=Katakana}",
    "\\p{Script=Cyrillic}",
    "\\p{Script=Arabic}",
    "\\p{Script=Hebrew}",
    "\\p{Script=Devanagari}",
    "\\p{Script=Thai}",
  ].join("|"),
  "u",
);

const staleLanguageMenu =
  /(?:\bEN\s*[·|/]\s*(?:KO|JA|ZH|DE|FR|ES|RU)\b|Bio\s*·\s*\d+\s+languages|other languages)/i;

function hasNonEnglishLocale(line) {
  const patterns = [
    /\b(?:lang|langTag|inLanguage)\s*=\s*(?:\{\s*)?["']([^"']+)["']/g,
    /\b(?:lang|langTag|inLanguage|locale)\s*:\s*["']([^"']+)["']/g,
    /^\s*(?:lang|langTag|inLanguage|locale)\s*:\s*([A-Za-z]{2,3}(?:[-_][A-Za-z0-9]+)*)\s*(?:[,#]|$)/g,
  ];
  return patterns.some((pattern) =>
    [...line.matchAll(pattern)].some((match) => !/^en(?:[-_]|$)/i.test(match[1])),
  );
}

function* walk(directory, allowedExtensions = extensions) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(path, allowedExtensions);
    else if (allowedExtensions.has(extname(entry.name))) yield path;
  }
}

const failures = [];
const sourceFiles = [];
for (const name of roots) {
  const directory = resolve(root, name);
  if (!existsSync(directory)) continue;
  const allowedExtensions = name === "out" ? outputExtensions : extensions;
  for (const path of walk(directory, allowedExtensions)) {
    sourceFiles.push(path);
  }
}
sourceFiles.push(resolve(root, "velite.config.ts"));

for (const path of sourceFiles) {
  if (path === self || !existsSync(path)) continue;
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (
      nonEnglishScript.test(line) ||
      hasNonEnglishLocale(line) ||
      staleLanguageMenu.test(line)
    ) {
      failures.push(
        `${relative(root, path)}:${index + 1}: ${line.trim().slice(0, 180)}`,
      );
    }
  });
}

if (failures.length > 0) {
  console.error("[english-only] Non-English public source detected:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const scope = scanOutput
  ? "public source, generated data, and static output"
  : scanGenerated
    ? "public source and generated data"
    : "public source";
console.log(`[english-only] ${scope} scan passed`);
