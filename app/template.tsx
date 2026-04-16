"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Route-level transition. Next.js re-mounts `template.tsx` on every
 * client-side navigation, so wrapping the subtree in a motion.div
 * automatically runs the entrance animation on each route change —
 * no `AnimatePresence` needed, no per-page `PageEnter` needed.
 *
 * Respects `prefers-reduced-motion` by collapsing to a zero-duration
 * transition (content still renders, just without motion).
 */
export default function RouteTemplate({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.32,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
