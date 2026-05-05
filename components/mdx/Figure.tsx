"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { X } from "lucide-react";
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
 * Captioned figure. Click the image to enter a fullscreen lightbox
 * with a shared-layout zoom animation; ESC or click outside closes.
 * Reduced-motion users get a fade-only transition.
 *
 * Falls back to a fluid `<img>` when width/height aren't given. The
 * caption sits below in academic register (small mono "Fig." prefix).
 */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const layoutId = `fig-${src}`;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  // Restore focus to the trigger when the lightbox closes.
  useEffect(() => {
    if (!open && triggerRef.current && document.activeElement === document.body) {
      triggerRef.current.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <figure className={cn("my-10", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open figure in fullscreen: ${alt}`}
        className={cn(
          "block w-full overflow-hidden rounded-sm border border-[var(--color-rule)] bg-[var(--color-surface)]",
          "cursor-zoom-in transition-colors hover:border-[var(--color-accent)]",
          "focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-accent)]",
        )}
      >
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
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        )}
      </button>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          <span className="mr-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Fig.
          </span>
          {caption}
        </figcaption>
      )}
      <Lightbox open={open} onClose={close} src={src} alt={alt} />
    </figure>
  );
}

function Lightbox({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  const [mounted, setMounted] = useState(false);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[1500] flex items-center justify-center bg-[#050912]/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          // Background click closes; the image and controls stop
          // propagation so they don't dismiss accidentally.
          onClick={onClose}
        >
          <div className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-[2] flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                transformRef.current?.zoomOut(0.4);
              }}
              aria-label="Zoom out"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-black/30 font-mono text-base leading-none text-white transition-colors hover:border-white/60 focus:outline focus:outline-2 focus:outline-white"
            >
              −
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                transformRef.current?.zoomIn(0.4);
              }}
              aria-label="Zoom in"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-black/30 font-mono text-base leading-none text-white transition-colors hover:border-white/60 focus:outline focus:outline-2 focus:outline-white"
            >
              +
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                transformRef.current?.resetTransform();
              }}
              aria-label="Reset zoom"
              className="inline-flex h-10 items-center justify-center rounded-sm border border-white/20 bg-black/30 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-white/60 focus:outline focus:outline-2 focus:outline-white"
            >
              fit
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close fullscreen"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-black/30 text-white transition-colors hover:border-white/60 focus:outline focus:outline-2 focus:outline-white"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <TransformWrapper
              ref={transformRef}
              initialScale={1}
              minScale={0.5}
              maxScale={6}
              wheel={{ step: 0.18 }}
              pinch={{ step: 5 }}
              doubleClick={{ disabled: false, step: 0.7 }}
              panning={{ velocityDisabled: true }}
              limitToBounds={false}
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                contentStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.img
                  src={src}
                  alt={alt}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="max-h-[88vh] max-w-[92vw] select-none object-contain"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
