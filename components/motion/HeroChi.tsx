"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * Animated marginal χ glyph for the home hero. Tracks pointer
 * position across the viewport and translates the glyph by a few
 * degrees of rotation + a small parallax offset — slow, soft, and
 * suppressed under prefers-reduced-motion. The glyph is purely
 * decorative (`aria-hidden`); replacing the previous static span
 * doesn't change reading order or semantics.
 */
export function HeroChi() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // Spring smoothing so the glyph trails the cursor instead of snapping.
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.4 });

  // Map normalised mouse position [0..1] → small offsets/rotation.
  const rotate = useTransform(sx, [0, 1], [-6, 6]);
  const tx = useTransform(sx, [0, 1], [-10, 10]);
  const ty = useTransform(sy, [0, 1], [-6, 6]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <motion.span
      aria-hidden
      style={
        reduce
          ? undefined
          : {
              x: tx,
              y: ty,
              rotate,
            }
      }
      className="font-display pointer-events-none absolute -left-20 top-[-0.4em] hidden select-none text-[10rem] italic leading-none text-[var(--color-accent)]/10 lg:block"
    >
      χ
    </motion.span>
  );
}
