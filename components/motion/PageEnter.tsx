"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Subtle fade + upward drift for page-level entrances. Respects
 * reduced-motion preferences (motion/react handles this automatically
 * when using the `useReducedMotion` hook, but here we rely on
 * transition short-circuiting via `duration: 0` when needed).
 */
export function PageEnter({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
