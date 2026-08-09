"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { springSnappy } from "@/lib/motion";

const NAV = [
  { href: "/start/", label: "Start" },
  { href: "/research/", label: "Research" },
  { href: "/papers/", label: "Papers" },
  { href: "/journal/", label: "Journal" },
  { href: "/notes/", label: "Notes" },
  { href: "/refs/", label: "Reference" },
  { href: "/about/", label: "About" },
] as const;

function normalizePath(pathname: string | null) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

/**
 * Map routes to the reader-facing information architecture instead of
 * mirroring URL prefixes one-for-one. SCC, ONN, and the SCC Part-0 notes are
 * research programmes; tags are a reference/discovery surface; bookmarks are
 * part of the reading notebook.
 */
function isSectionActive(href: (typeof NAV)[number]["href"], pathname: string) {
  switch (href) {
    case "/start/":
      return pathname === "/start";
    case "/research/":
      return (
        pathname === "/research" ||
        pathname.startsWith("/research/") ||
        pathname === "/scc" ||
        pathname.startsWith("/scc/") ||
        pathname === "/onn" ||
        pathname.startsWith("/onn/") ||
        pathname === "/notes/part-0" ||
        pathname.startsWith("/notes/part-0/")
      );
    case "/papers/":
      return pathname === "/papers" || pathname.startsWith("/papers/");
    case "/journal/":
      return pathname === "/journal" || pathname.startsWith("/journal/");
    case "/notes/":
      return (
        (pathname === "/notes" || pathname.startsWith("/notes/")) &&
        pathname !== "/notes/part-0" &&
        !pathname.startsWith("/notes/part-0/")
      ) || pathname === "/bookmarks";
    case "/refs/":
      return (
        pathname === "/refs" ||
        pathname.startsWith("/refs/") ||
        pathname === "/tags" ||
        pathname.startsWith("/tags/")
      );
    case "/about/":
      return pathname === "/about" || pathname === "/bio";
  }
}

export function NavLinks() {
  const pathname = normalizePath(usePathname());

  return (
    <ul className="flex items-center gap-6 text-sm font-medium">
      {NAV.map((item) => {
        const isActive = isSectionActive(item.href, pathname);
        const isExact = pathname === normalizePath(item.href);

        return (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              aria-current={isActive ? (isExact ? "page" : "location") : undefined}
              className={cn(
                "block pb-1 transition-colors hover:text-[var(--color-accent)]",
                isActive
                  ? "text-[var(--color-ink)]"
                  : "text-[var(--color-muted)]",
              )}
            >
              {item.label}
            </Link>
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent)]"
                transition={springSnappy}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
