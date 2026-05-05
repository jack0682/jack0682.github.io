"use client";

import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Initial zoom factor — 1 = no zoom. */
  initialScale?: number;
  /** Min / max scale. */
  minScale?: number;
  maxScale?: number;
};

/**
 * Pan + pinch / scroll-zoom wrapper for SVG diagrams. Designed for
 * the theorem DAG and notes constellation — both are wide static
 * SVGs that get unreadable on phones without panning + zoom.
 *
 * Adds a small floating control strip (reset / zoom in / zoom out)
 * pinned to the top-right of the box. Pinch on touch, wheel on
 * desktop, drag to pan.
 */
export function PanZoomBox({
  children,
  className,
  initialScale = 1,
  minScale = 0.5,
  maxScale = 4,
}: Props) {
  const ref = useRef<ReactZoomPanPinchRef>(null);

  return (
    <div className={cn("relative", className)}>
      <TransformWrapper
        ref={ref}
        initialScale={initialScale}
        minScale={minScale}
        maxScale={maxScale}
        wheel={{ step: 0.15 }}
        pinch={{ step: 5 }}
        doubleClick={{ disabled: false, step: 0.7 }}
        panning={{ velocityDisabled: true }}
        limitToBounds={false}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "auto" }}
          contentStyle={{ width: "100%" }}
        >
          {children}
        </TransformComponent>
      </TransformWrapper>

      <div className="pointer-events-none absolute right-2 top-2 flex gap-1">
        <button
          type="button"
          onClick={() => ref.current?.zoomOut(0.4)}
          aria-label="Zoom out"
          title="Zoom out"
          className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule)] bg-[var(--color-bg)]/80 font-mono text-sm leading-none text-[var(--color-muted)] backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => ref.current?.zoomIn(0.4)}
          aria-label="Zoom in"
          title="Zoom in"
          className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--color-rule)] bg-[var(--color-bg)]/80 font-mono text-sm leading-none text-[var(--color-muted)] backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => ref.current?.resetTransform()}
          aria-label="Reset view"
          title="Reset view"
          className="pointer-events-auto inline-flex h-7 items-center justify-center rounded-sm border border-[var(--color-rule)] bg-[var(--color-bg)]/80 px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          fit
        </button>
      </div>
    </div>
  );
}
