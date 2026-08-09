import type { ReactNode } from "react";

/**
 * Stable route wrapper. Content is deliberately visible in the server HTML:
 * a route-level opacity entrance made every page blank until Motion hydrated,
 * which is especially costly on slow devices and under delayed JavaScript.
 */
export default function RouteTemplate({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
