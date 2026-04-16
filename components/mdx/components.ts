import type { ComponentType } from "react";
import { Theorem } from "./Theorem";
import { Proof } from "./Proof";
import { Sidenote, SidenoteRef } from "./Sidenote";
import { Figure } from "./Figure";
import { Callout } from "./Callout";
import { Equation } from "./Equation";

/**
 * Components exposed into the MDX scope. MDX authors can reference
 * these by name directly: `<Theorem number="2.1">…</Theorem>`.
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
};
