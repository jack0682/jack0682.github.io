import Link from "next/link";
import type { ResearchStatus } from "@/lib/research-status";

export function ResearchStatusBanner({
  status,
  className = "",
}: {
  status: ResearchStatus;
  className?: string;
}) {
  return (
    <aside
      aria-label={`${status.title} research status`}
      className={`max-w-[48rem] border border-[var(--color-rule)] bg-[var(--color-surface)]/55 px-5 py-4 sm:px-6 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Research status
        </span>
        <span aria-hidden className="text-[var(--color-subtle)]">
          ·
        </span>
        <span className="text-xs font-medium text-[var(--color-ink)]">
          {status.label}
        </span>
        {status.auditedAt && (
          <time
            dateTime={status.auditedAt}
            className="font-mono text-[10px] text-[var(--color-subtle)]"
          >
            audited {status.auditedAt}
          </time>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
        {status.summary}
      </p>
      {(status.statusHref || status.successorTitle) && (
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {status.statusHref && (
            <Link
              href={status.statusHref}
              className="text-[var(--color-ink)] underline decoration-[var(--color-accent)]/40 underline-offset-4 transition hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
            >
              Read the current ledger →
            </Link>
          )}
          {status.successorTitle && (
            <span className="text-[var(--color-subtle)]">
              Successor: {status.successorTitle}
            </span>
          )}
        </p>
      )}
    </aside>
  );
}
