"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const subscribe = () => () => {};

/**
 * True only after the component has mounted on the client. Returns
 * `false` on the server and during hydration (server + client snapshots
 * agree), then `true`. Lets a component defer client-only branching
 * without triggering a hydration mismatch or a set-state-in-effect.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Hydration-safe `prefers-reduced-motion`.
 *
 * `useReducedMotion()` (motion/react) returns `false` on the server but
 * the real preference on the first client render, so any component that
 * branches its rendered DOM/attributes on it (`if (reduce) return null`,
 * `style={reduce ? … : …}`, `initial={reduce ? false : …}`) produces a
 * hydration mismatch for reduced-motion users. This wrapper reports
 * `false` on the server and the first client render (matching SSR), then
 * the true preference after mount — so the branch only changes the DOM
 * after hydration is complete.
 */
export function useReducedMotionSafe(): boolean {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  return hydrated ? reduce === true : false;
}
