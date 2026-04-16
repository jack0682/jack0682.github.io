import katex from "katex";
import { cn } from "@/lib/cn";

/**
 * Server-rendered KaTeX.
 *
 * Use for inline/display math inside TSX pages (as opposed to MDX,
 * where remark-math + rehype-katex handle the $...$ syntax for us).
 * Output is pure HTML produced at build time; no client JS needed.
 */
type Props = {
  expr: string;
  display?: boolean;
  className?: string;
};

export function TeX({ expr, display = false, className }: Props) {
  const html = katex.renderToString(expr, {
    displayMode: display,
    throwOnError: false,
    output: "html",
    strict: "ignore",
  });

  const Tag = display ? "div" : "span";
  return (
    <Tag
      aria-hidden="false"
      className={cn(display ? "katex-display-wrap" : "inline-block", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
