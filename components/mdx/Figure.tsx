import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  caption?: ReactNode;
  width?: number;
  height?: number;
  className?: string;
};

/**
 * Captioned figure. Caption sits below, set in Inter small, with a
 * figure label reminiscent of a book. If width/height aren't given,
 * falls back to a fluid container (src must then be in /public).
 */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  className,
}: Props) {
  return (
    <figure className={cn("my-10", className)}>
      <div className="overflow-hidden rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)]">
        {width && height ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="h-auto w-full" />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          <span className="mr-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Fig.
          </span>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
