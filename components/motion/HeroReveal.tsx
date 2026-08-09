import type { ReactNode } from "react";

/**
 * Semantic wrapper for the home hero sequence. The previous stagger wrote
 * `opacity: 0` into server HTML, hiding the identity and primary links until
 * Motion hydrated. Keeping these nodes static makes the first screen useful
 * immediately while preserving the same layout and DOM grouping.
 */
export function HeroReveal({ children }: { children: ReactNode[] }) {
  return (
    <>
      {children.map((child, i) => (
        <div key={i}>{child}</div>
      ))}
    </>
  );
}
