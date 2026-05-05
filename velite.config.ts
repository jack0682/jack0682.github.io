import { defineConfig, defineCollection, s } from "velite";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import { remarkTermLinks } from "./lib/remark/term-links";

/* ──────────────────────────────────────────────────────────────
   jack0682.github.io — content layer
   Velite drives MDX compilation + typed collections.
   Import from "#content" in app code (alias in tsconfig.json).
   ────────────────────────────────────────────────────────────── */

const computeFields = <T extends { slug: string; collection: string }>(
  data: T,
) => ({
  ...data,
  permalink: `/${data.collection}/${data.slug}/`,
});

/* ── posts ─ general essays & long-form writing ────────────── */
const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(160),
      slug: s.slug("post"),
      date: s.isodate(),
      updated: s.isodate().optional(),
      summary: s.string().max(320).optional(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
    })
    .transform((data) => computeFields({ ...data, collection: "posts" })),
});

/* ── papers ─ publications and manuscripts ─────────────────── */
const papers = defineCollection({
  name: "Paper",
  pattern: "papers/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(240),
      slug: s.slug("paper"),
      authors: s.array(s.string()).min(1),
      venue: s.string().optional(),
      year: s.number().int().gte(2000).lte(2100),
      status: s
        .enum(["published", "accepted", "submitted", "preprint", "in-progress"])
        .default("in-progress"),
      date: s.isodate(),
      updated: s.isodate().optional(),
      pdf: s.string().optional(),
      arxiv: s.string().optional(),
      doi: s.string().optional(),
      bibtex: s.string().optional(),
      abstract: s.string().min(20),
      tags: s.array(s.string()).default([]),
      /** Research-track association — used by SCC hub & track rails. */
      track: s
        .enum(["onn", "perception", "theory", "control", "robotics"])
        .optional(),
      /** Note/journal slugs this paper is tied to (cross-ref hints). */
      related: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
    })
    .transform((data) => computeFields({ ...data, collection: "papers" })),
});

/* ── journal ─ dated research-log entries ─────────────────── */
const journal = defineCollection({
  name: "JournalEntry",
  pattern: "journal/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(160),
      slug: s.slug("journal"),
      date: s.isodate(),
      updated: s.isodate().optional(),
      kind: s.enum(["weekly", "version"]).optional(),
      /**
       * Canonical version stamped at this entry — surfaces in
       * `/scc/changelog/`. Form is project-specific (e.g. "v2.4",
       * "CV-1.5.2"); validated only as a non-empty string.
       */
      canonicalVersion: s.string().optional(),
      /** Whether this entry bumps the canonical version, patches it, or is a no-op. */
      canonicalImpact: s
        .enum(["bumped", "patch", "no-op"])
        .optional(),
      /** One-line summary used in the changelog timeline (~280 chars). */
      canonicalNotes: s.string().max(280).optional(),
      summary: s.string().max(320).optional(),
      tags: s.array(s.string()).default([]),
      track: s
        .enum(["onn", "perception", "theory", "control", "robotics", "meta"])
        .optional(),
      /**
       * Note/paper slugs referenced by the entry. Used by the
       * related-docs rail to show "mentioned in journal".
       */
      refs: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
    })
    .transform((data) => computeFields({ ...data, collection: "journal" })),
});

/* ── research ─ track index pages (one per major thread) ──── */
const research = defineCollection({
  name: "ResearchTrack",
  pattern: "research/*.mdx",
  schema: s
    .object({
      track: s.enum(["onn", "perception", "theory", "control", "robotics"]),
      title: s.string().max(160),
      slug: s.slug("research"),
      summary: s.string().max(320),
      ordinal: s.number().int().default(99),
      status: s
        .enum(["active", "paused", "archived"])
        .default("active"),
      date: s.isodate().optional(),
      updated: s.isodate().optional(),
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
    })
    .transform((data) => computeFields({ ...data, collection: "research" })),
});

/* ── onnDocs ─ ONN programme documents (separate from notes) ── */
const onnDocs = defineCollection({
  name: "OnnDoc",
  pattern: "onn/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(200),
      slug: s.slug("onn"),
      summary: s.string().max(320).optional(),
      tags: s.array(s.string()).default([]),
      kind: s
        .enum(["canonical", "roadmap", "overview", "theorem", "proof", "essay", "catalogue"])
        .optional(),
      chapter: s.number().int().gte(0).optional(),
      section: s.string().optional(),
      date: s.isodate().optional(),
      updated: s.isodate().optional(),
      related: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
    })
    .transform((data) => computeFields({ ...data, collection: "onn" })),
});

/* ── notes ─ mathematical notes, organised into parts ─────── */
const notes = defineCollection({
  name: "Note",
  pattern: "notes/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(200),
      slug: s.slug("note"),
      part: s.number().int().gte(0).lte(10),
      chapter: s.number().int().gte(0).optional(),
      section: s.string().optional(),
      summary: s.string().max(320).optional(),
      tags: s.array(s.string()).default([]),
      /**
       * Document-level classifier. Lets the SCC hub (and future
       * Part-N hubs) group documents into meaningful rows rather
       * than a flat chapter list. Optional — untagged notes fall
       * into the "essay" bucket.
       */
      kind: s
        .enum(["canonical", "roadmap", "overview", "theorem", "proof", "essay", "registry"])
        .optional(),
      /**
       * Optional track association — lets a note appear in the
       * related-docs rail of a research track page.
       */
      track: s
        .enum(["onn", "perception", "theory", "control", "robotics"])
        .optional(),
      date: s.isodate().optional(),
      updated: s.isodate().optional(),
      /** Sibling slugs referenced by this note (manual cross-refs). */
      related: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
    })
    .transform((data) => computeFields({ ...data, collection: "notes" })),
});

/* ── shared MDX plugin stack ──────────────────────────────── */
const prettyCodeOptions: PrettyCodeOptions = {
  // Cool-toned dark theme (`slack-dark`) pairs with the new cool
  // dark-mode palette; the warmer `github-dark-dimmed` clashed.
  theme: { light: "github-light", dark: "slack-dark" },
  keepBackground: false,
  defaultLang: { block: "plaintext", inline: "plaintext" },
};

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/content-assets",
    base: "/content-assets/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, papers, journal, research, notes, onnDocs },
  mdx: {
    // remarkTermLinks runs after gfm/math so it sees the full mdast
    // (with code/inlineCode/math nodes already typed for skip).
    remarkPlugins: [remarkGfm, remarkMath, remarkTermLinks],
    rehypePlugins: [
      // rehype-slug must precede rehype-katex so heading slugs are
      // computed before KaTeX rewrites mathy children into spans.
      // The slug algorithm (github-slugger) matches what s.toc() uses,
      // so TOC `#fragment` URLs line up with heading `id` attrs.
      rehypeSlug,
      [rehypeKatex, { strict: false, trust: true, output: "html" }],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
});
