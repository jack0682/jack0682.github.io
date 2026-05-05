"use client";

import { useSyncExternalStore } from "react";

/**
 * Bookmark state — persisted in `localStorage` under a single key
 * and broadcast via a synthetic event so multiple components in
 * the same tab stay in sync.
 *
 * Earlier iterations of this module also tracked `visited`, scroll
 * `progress`, and a "last read" pointer for auto-resume, but those
 * features were removed. The shape is kept narrow to whatever is
 * actually used by `DocActions` and `/bookmarks`.
 *
 * SSR-safe: the server snapshot is the empty initial state.
 */

const KEY = "jhoh.reading.v1";
const EVENT = "jhoh-reading-update";

export type ReadingState = {
  bookmarks: string[];
};

const initial: ReadingState = {
  bookmarks: [],
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
  // Don't mutate the cached snapshot in place — `useSyncExternalStore`
  // would compare references and miss the change.
  const current = read();
  const i = current.bookmarks.indexOf(slug);
  const nextBookmarks =
    i >= 0
      ? [...current.bookmarks.slice(0, i), ...current.bookmarks.slice(i + 1)]
      : [...current.bookmarks, slug];
  write({ bookmarks: nextBookmarks });
}
