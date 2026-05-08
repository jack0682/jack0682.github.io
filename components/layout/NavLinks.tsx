"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/research/", label: "Research" },
  { href: "/scc/",      label: "SCC" },
  { href: "/onn/",      label: "ONN" },
  { href: "/papers/",   label: "Papers" },
  { href: "/journal/",  label: "Journal" },
  { href: "/notes/",    label: "Notes" },
  { href: "/refs/",     label: "Refs" },
  { href: "/about/",    label: "About" },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6 text-sm font-medium">
      {NAV.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href.length > 1 && pathname.startsWith(item.href));

        return (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
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
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
