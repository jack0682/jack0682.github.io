"use client";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/lib/motion";

interface Props {
  children: ReactNode;
  strength?: number; // 0–1, default 0.25
  className?: string;
}

export function MagneticButton({ children, strength = 0.25, className }: Props) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 25, mass: 0.5 });

  // No cursor-follow spring for motion-sensitive users.
  if (reduce) return <div className={className}>{children}</div>;

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width  / 2) * strength);
    y.set((e.clientY - rect.top  - rect.height / 2) * strength);
  };

  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
