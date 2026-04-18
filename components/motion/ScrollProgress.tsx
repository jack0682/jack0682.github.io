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

  // Anchored to the Masthead's bottom edge (h-14 sm:h-16) so it
  // reads as a progressive fill of the header rule, not a second
  // top stripe competing with the route-change indicator.
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-14 z-40 h-[2px] origin-left bg-[var(--color-accent)] sm:top-16"
    />
  );
}
