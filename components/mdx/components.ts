import type { ComponentType } from "react";
import { Theorem } from "./Theorem";
import { Proof } from "./Proof";
import { Sidenote, SidenoteRef } from "./Sidenote";
import { Figure } from "./Figure";
import { Callout } from "./Callout";
import { Equation } from "./Equation";
import { Remark } from "./Remark";
import { Example } from "./Example";
import { H2, H3, H4 } from "./AnchorHeading";
import { Term } from "./Term";

/**
 * Components exposed into the MDX scope. MDX authors can reference
 * these by name directly: `<Theorem number="2.1">…</Theorem>`.
 *
 * `h2`/`h3`/`h4` overrides surface a hover-revealed deep-link copy
 * button next to each heading. `id` attrs come from rehype-slug
 * (configured in `velite.config.ts`).
 *
 * `Term` renders glossary HoverCard popovers; auto-injected by
 * `remark-term-links` for D-/S-/A- IDs that appear in body prose.
 */
export const mdxComponents: Record<
  string,
  ComponentType<Record<string, unknown>>
> = {
  Theorem: Theorem as ComponentType<Record<string, unknown>>,
  Proof: Proof as ComponentType<Record<string, unknown>>,
  Sidenote: Sidenote as ComponentType<Record<string, unknown>>,
  SidenoteRef: SidenoteRef as ComponentType<Record<string, unknown>>,
  Figure: Figure as ComponentType<Record<string, unknown>>,
  Callout: Callout as ComponentType<Record<string, unknown>>,
  Equation: Equation as ComponentType<Record<string, unknown>>,
  Remark: Remark as ComponentType<Record<string, unknown>>,
  Example: Example as ComponentType<Record<string, unknown>>,
  Term: Term as ComponentType<Record<string, unknown>>,
  h2: H2 as ComponentType<Record<string, unknown>>,
  h3: H3 as ComponentType<Record<string, unknown>>,
  h4: H4 as ComponentType<Record<string, unknown>>,
};
