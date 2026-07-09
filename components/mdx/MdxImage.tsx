import type { ComponentPropsWithoutRef } from "react";

/**
 * Fallback for plain markdown images `![alt](src)`, which bypass the
 * richer <Figure> component. Keeps them responsive, lazily loaded, and
 * with their alt text preserved. Authored figures should still use
 * <Figure> for captions + lightbox.
 */
export function MdxImage({
  alt = "",
  className,
  ...props
}: ComponentPropsWithoutRef<"img">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`mx-auto my-6 h-auto max-w-full rounded ${className ?? ""}`}
    />
  );
}
