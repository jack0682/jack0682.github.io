/* eslint-disable react-hooks/static-components -- runtime MDX: Velite emits each
   document as a self-contained function string; we compile it to a component and
   cache it by code so its identity is stable across renders. */
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

type MdxComponent = ComponentType<{
  components?: Record<string, ComponentType<Record<string, unknown>>>;
}>;

type MdxModule = { default: MdxComponent };

// Compile each MDX body once and reuse the component. Keeps the rendered
// component identity stable (no remount per render) and avoids re-evaluating
// the function string on every render.
const compiledCache = new Map<string, MdxComponent>();

function compileMdx(code: string): MdxComponent {
  const cached = compiledCache.get(code);
  if (cached) return cached;
  const fn = new Function(code) as (args: MdxFactoryArgs) => MdxModule;
  const Component = fn({
    Fragment: runtime.Fragment,
    jsx: runtime.jsx,
    jsxs: runtime.jsxs,
  }).default;
  compiledCache.set(code, Component);
  return Component;
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
