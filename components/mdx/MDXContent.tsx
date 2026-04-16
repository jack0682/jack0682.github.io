import * as runtime from "react/jsx-runtime";
import type { ComponentType } from "react";
import { mdxComponents } from "./components";

/**
 * Evaluates the self-contained function string that Velite produces
 * from `s.mdx()` and returns a React component. The function body
 * destructures `Fragment, jsx, jsxs` from its first argument, so we
 * pass them in from `react/jsx-runtime`.
 */
type MdxFactoryArgs = {
  Fragment: typeof runtime.Fragment;
  jsx: typeof runtime.jsx;
  jsxs: typeof runtime.jsxs;
};

type MdxModule = {
  default: ComponentType<{
    components?: Record<string, ComponentType<Record<string, unknown>>>;
  }>;
};

function compileMdx(code: string): ComponentType<{
  components?: Record<string, ComponentType<Record<string, unknown>>>;
}> {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function(code) as (args: MdxFactoryArgs) => MdxModule;
  return fn({
    Fragment: runtime.Fragment,
    jsx: runtime.jsx,
    jsxs: runtime.jsxs,
  }).default;
}

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: Record<string, ComponentType<Record<string, unknown>>>;
}) {
  const Content = compileMdx(code);
  return <Content components={{ ...mdxComponents, ...components }} />;
}
