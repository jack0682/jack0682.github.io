"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { tween, useReducedMotionSafe } from "@/lib/motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: tween.enter,
  },
};

/**
 * One orchestrated reveal on the home hero — TeX stripe → h1 →
 * eyebrow → body → CTAs land in sequence over ~400ms. Skipped when
 * the user prefers reduced motion so nothing is hidden from them.
 */
export function HeroReveal({ children }: { children: ReactNode[] }) {
  const reduce = useReducedMotionSafe();

  if (reduce) {
    return (
      <>
        {children.map((child, i) => (
          <div key={i}>{child}</div>
        ))}
      </>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {children.map((child, i) => (
        <motion.div key={i} data-reveal variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
