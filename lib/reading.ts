"use client";

import { useSyncExternalStore } from "react";

/**
 * Reading session state — bookmarks, visited slugs, scroll progress
 * per slug, and "last read" pointer. Persisted in `localStorage`
 * under a single key; mutators broadcast a synthetic `storage` event
 * so multiple components in the same tab re-render in sync.
 *
 * SSR-safe: server snapshot is the empty initial state, so React
 * doesn't trip on hydration mismatches. UI components that depend
 * on this state should still gracefully render nothing for the
 * first paint and then update on hydration.
 */

const KEY = "jhoh.reading.v1";
const EVENT = "jhoh-reading-update";

export type ReadingLast = {
  slug: string;
  permalink: string;
  title: string;
  ts: number;
};

export type ReadingState = {
  bookmarks: string[];
  visited: string[];
  progress: Record<string, { percent: number; ts: number }>;
  last: ReadingLast | null;
};

const initial: ReadingState = {
  bookmarks: [],
  visited: [],
  progress: {},
  last: null,
};

// Snapshot cache. `useSyncExternalStore` requires the snapshot
// reference to remain stable across calls when the underlying
// store hasn't changed; otherwise React detects the diff every
// render and falls into an infinite loop, which surfaces as the
// "This page couldn't load" error boundary fallback. We compare
// the raw localStorage string and only build a new object when
// it actually changes.
let cachedRaw: string | null | undefined = undefined;
let cachedState: ReadingState = initial;

function read(): ReadingState {
  if (typeof window === "undefined") return initial;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return initial;
  }
  if (raw === cachedRaw) return cachedState;
  cachedRaw = raw;
  if (!raw) {
    cachedState = initial;
    return cachedState;
  }
  try {
    const parsed = JSON.parse(raw);
    cachedState = {
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      progress:
        parsed.progress && typeof parsed.progress === "object"
          ? parsed.progress
          : {},
      last: parsed.last ?? null,
    };
    return cachedState;
  } catch {
    cachedState = initial;
    return cachedState;
  }
}

function write(state: ReadingState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // quota / private mode — silently ignore
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) cb();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, cb);
  };
}

const getSnapshot = () => read();
const getServerSnapshot = () => initial;

/** React hook — re-renders consumer when reading state changes. */
export function useReadingState(): ReadingState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function toggleBookmark(slug: string) {
  const s = read();
  const i = s.bookmarks.indexOf(slug);
  if (i >= 0) s.bookmarks.splice(i, 1);
  else s.bookmarks.push(slug);
  write(s);
}

export function markVisited(slug: string) {
  const s = read();
  if (!s.visited.includes(slug)) {
    s.visited.push(slug);
    write(s);
  }
}

export function setLast(entry: ReadingLast) {
  const s = read();
  s.last = entry;
  write(s);
}

export function setProgress(slug: string, percent: number) {
  const s = read();
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const existing = s.progress[slug];
  // Throttle to whole-percent changes to keep writes cheap.
  if (existing && existing.percent === clamped) return;
  s.progress[slug] = { percent: clamped, ts: Date.now() };
  write(s);
}

export function clearReadingState() {
  write(initial);
}
