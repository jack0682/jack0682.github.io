import { visitParents, SKIP } from "unist-util-visit-parents";

/* ── ancestors that should never be auto-tagged ─────────────────
   Inline code, math, headings, links, and any pre-existing JSX
   already provide their own affordances; wrapping inside them
   would either collide with KaTeX rendering or produce nonsense
   nested links. */
const SKIP_TYPES = new Set<string>([
  "code",
  "inlineCode",
  "math",
  "inlineMath",
  "heading",
  "link",
  "linkReference",
  "mdxJsxFlowElement",
  "mdxJsxTextElement",
  "mdxFlowExpression",
  "mdxTextExpression",
]);

/**
 * Word-boundary anchored ID regex. Matches the patterns used in the
 * SCC glossary: `D-0014`, `S-0007`, `D-6a`, `A-0012`. Theorem (`T-…`)
 * and open-problem (`OP-…`) IDs intentionally excluded — those have
 * dedicated index pages, not glossary entries.
 */
const TERM_RE = /\b(D-\d{1,4}[a-z]?|S-\d{4}|A-\d{4})\b/g;

type AnyNode = { type: string; value?: string; children?: AnyNode[] };

/**
 * Remark plugin: auto-wrap glossary-eligible IDs in body prose with
 * `<Term id="...">…</Term>` JSX so the MDX runtime renders them as
 * Radix HoverCard popovers (see `components/mdx/Term.tsx`). Skips
 * code, math, headings, links, and any existing JSX scope.
 *
 * mdast/mdx-jsx node shapes are intentionally typed as `AnyNode`
 * because `@types/mdast` and `@types/mdast-util-mdx-jsx` are
 * transitive — adding direct deps purely for plugin typings is
 * disproportionate.
 */
export function remarkTermLinks() {
  return (tree: AnyNode) => {
    visitParents(tree as never, "text", (node: AnyNode, ancestors: AnyNode[]) => {
      for (const a of ancestors) {
        if (SKIP_TYPES.has(a.type)) return;
      }

      const value = node.value ?? "";
      const matches = [...value.matchAll(TERM_RE)];
      if (matches.length === 0) return;

      const newChildren: AnyNode[] = [];
      let cursor = 0;
      for (const m of matches) {
        const start = m.index ?? 0;
        if (start > cursor) {
          newChildren.push({ type: "text", value: value.slice(cursor, start) });
        }
        const id = m[0];
        newChildren.push({
          type: "mdxJsxTextElement",
          name: "Term",
          attributes: [{ type: "mdxJsxAttribute", name: "id", value: id }],
          children: [{ type: "text", value: id }],
        } as unknown as AnyNode);
        cursor = start + id.length;
      }
      if (cursor < value.length) {
        newChildren.push({ type: "text", value: value.slice(cursor) });
      }

      const parent = ancestors[ancestors.length - 1];
      if (!parent.children) return;
      const idx = parent.children.indexOf(node);
      if (idx === -1) return;
      parent.children.splice(idx, 1, ...newChildren);
      return [SKIP, idx + newChildren.length];
    });
  };
}
