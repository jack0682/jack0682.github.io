import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  /** Absolute path under /public, e.g. "/logos/soongsil.jpg" */
  src: string;
  /** Intrinsic width of the source, in pixels */
  width: number;
  /** Intrinsic height of the source, in pixels */
  height: number;
  /** Alt / screen-reader label for the logo */
  alt: string;
  /**
   * Rendered height in the layout. Width is auto-scaled from the
   * intrinsic aspect ratio. Keep small (20-28 px) for inline use.
   */
  renderHeight?: number;
  /**
   * "auto" applies mix-blend-mode:multiply in light mode and
   * mix-blend-mode:screen + invert(1) in dark mode so white-backed
   * logos dissolve into the warm paper and flip in dark mode.
   * "none" leaves the logo untouched (for monotone SVGs already
   * using currentColor).
   */
  mode?: "auto" | "none";
  className?: string;
};

/**
 * Small inline logo treatment for affiliations.
 *
 * - Grayscale + reduced opacity by default so logos never compete
 *   with the typographic surface.
 * - `mode="auto"` blends white backgrounds into the page so
 *   rectangular PNG logos read as if they were transparent SVGs.
 * - `prefers-reduced-transparency` opts out of the blend to keep
 *   logos fully visible for users who request reduced transparency.
 */
export function Logo({
  src,
  width,
  height,
  alt,
  renderHeight = 22,
  mode = "auto",
  className,
}: Props) {
  const aspect = width / height;
  const renderWidth = Math.round(renderHeight * aspect);

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={cn(
        "inline-block select-none align-middle",
        // Grayscale + slight fade — hover restores colour.
        "opacity-60 grayscale transition-[filter,opacity] duration-300",
        "hover:opacity-100 hover:grayscale-0",
        mode === "auto" && [
          // Light mode: multiply blend removes pure white backgrounds.
          "mix-blend-multiply",
          // Dark mode: invert dark-on-white logos, then screen blend
          // so blacks become near-white on the dark paper.
          "dark:mix-blend-screen dark:invert",
        ],
        // Users who opted into reduced transparency keep full-opacity logos.
        "motion-reduce:transition-none",
        className,
      )}
      style={{ height: renderHeight, width: renderWidth }}
      unoptimized
    />
  );
}
