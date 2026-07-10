"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

/* ── Shared motion vocabulary (JS mirror of globals.css) ────────────
   One signature easing, a 4-step duration scale, and two named springs.
   Every framer component imports from here so the site moves with one
   hand instead of ~7 ad-hoc easings / ~12 durations / 5 unshared springs.
   Numbers match the --ease-out / --dur-* tokens in globals.css. */

/** Signature decelerate curve. Used for every entrance/exit tween. */
export const ease = [0.22, 0.61, 0.36, 1] as const;

/** Duration scale, in seconds (framer uses seconds). */
export const durations = {
  fast: 0.15,
  base: 0.22,
  slow: 0.32,
  slower: 0.5,
} as const;

/** Tween presets — pick by the size of the moving surface. */
export const tween = {
  /** scrims, small fades, popovers, tooltips */
  quick: { duration: durations.base, ease },
  /** drawers, palettes, route wrapper */
  panel: { duration: durations.slow, ease },
  /** deliberate hero reveal */
  enter: { duration: durations.slower, ease },
} as const;

/** Tactile UI that should feel quick and precise (nav underline,
    magnetic pull, toggle pills). */
export const springSnappy = { type: "spring", stiffness: 400, damping: 35 } as const;

/** Flowing, continuous motion (scroll/route progress, parallax). */
export const springSoft = { type: "spring", stiffness: 120, damping: 24, mass: 0.3 } as const;

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
