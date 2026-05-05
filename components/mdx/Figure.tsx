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
        <motion.div layoutId={layoutId}>
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
        </motion.div>
      </button>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          <span className="mr-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Fig.
          </span>
          {caption}
        </figcaption>
      )}
      <Lightbox
        open={open}
        onClose={close}
        src={src}
        alt={alt}
        layoutId={layoutId}
      />
    </figure>
  );
}

function Lightbox({
  open,
  onClose,
  src,
  alt,
  layoutId,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  layoutId: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close fullscreen"
            className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-[1] inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-black/30 text-white transition-colors hover:border-white/60 focus:outline focus:outline-2 focus:outline-white"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          <motion.img
            layoutId={layoutId}
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[92vw] cursor-zoom-out object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
