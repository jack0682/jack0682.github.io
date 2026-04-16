import { Container } from "@/components/layout/Container";

/**
 * Global loading UI — shown by Next.js via the nearest Suspense
 * boundary whenever a route segment is being streamed. The tone is
 * typographic (an em-dash plus a small-caps word) rather than a
 * spinner, to match the editorial voice of the rest of the site.
 */
export default function Loading() {
  return (
    <Container>
      <div className="flex min-h-[52vh] items-center justify-center">
        <p
          aria-label="Loading"
          className="sci-eyebrow flex items-baseline gap-3 font-mono text-[0.7rem] text-[var(--color-subtle)]"
        >
          <span aria-hidden className="sci-loading-dash">
            —
          </span>
          loading
        </p>
      </div>
    </Container>
  );
}
