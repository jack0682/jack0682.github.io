import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Page-level horizontal container.
 *  - `default` (72rem) — for hub pages and listings
 *  - `prose`   (44rem) — for long-form body content
 *  - `wide`    (80rem) — for hero sections
 */
type Width = "default" | "prose" | "wide";

const widths: Record<Width, string> = {
  default: "max-w-[72rem]",
  prose: "max-w-[44rem]",
  wide: "max-w-[80rem]",
};

export function Container({
  width = "default",
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { width?: Width }) {
  return (
    <div
      className={cn("mx-auto w-full px-6 sm:px-10", widths[width], className)}
      {...props}
    />
  );
}
