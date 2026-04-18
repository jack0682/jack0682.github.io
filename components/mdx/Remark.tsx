type Props = {
  children: React.ReactNode;
  label?: string;
};

export function Remark({ children, label = "Remark" }: Props) {
  return (
    <aside className="my-6 border-l-2 border-[var(--color-rule)] pl-5">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
        {label}
      </p>
      <div className="text-sm leading-relaxed text-[var(--color-muted)]">
        {children}
      </div>
    </aside>
  );
}
