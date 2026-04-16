"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin accent-coloured bar at the very top of the viewport that fills
 * as the user scrolls. Uses a spring so the motion feels tactile
 * rather than mechanical.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[var(--color-accent)]"
    />
  );
}
