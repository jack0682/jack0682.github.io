import type { ReactNode } from "react";
import { Info, AlertTriangle, Lightbulb, HelpCircle } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "note" | "warning" | "idea" | "question";

const toneConfig: Record<Tone, { Icon: typeof Info; label: string }> = {
  note: { Icon: Info, label: "Note" },
  warning: { Icon: AlertTriangle, label: "Warning" },
  idea: { Icon: Lightbulb, label: "Idea" },
  question: { Icon: HelpCircle, label: "Open question" },
};

/**
 * Unobtrusive callout. Used for aside remarks, warnings, and open
 * questions. No coloured backgrounds — only a quiet icon and rule.
 */
export function Callout({
  tone = "note",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const { Icon, label } = toneConfig[tone];
  return (
    <aside
      className={cn(
        "my-8 flex gap-4 border-l border-[var(--color-rule)] pl-5",
        className,
      )}
    >
      <Icon
        size={18}
        strokeWidth={1.5}
        className="mt-1 shrink-0 text-[var(--color-accent)]"
      />
      <div className="flex-1">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {title ?? label}
        </p>
        <div className="text-[var(--color-muted)] leading-relaxed">
          {children}
        </div>
      </div>
    </aside>
  );
}
