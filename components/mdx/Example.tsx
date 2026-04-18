type Props = {
  children: React.ReactNode;
  number?: number | string;
  title?: string;
};

export function Example({ children, number, title }: Props) {
  const label = number ? `Example ${number}` : "Example";
  return (
    <div className="my-8 rounded border border-[var(--color-rule)] bg-[var(--color-surface)]/50 px-6 py-5">
      <p className="mb-3 font-display text-sm font-semibold tracking-tight text-[var(--color-ink)]">
        {label}{title ? ` — ${title}` : ""}
      </p>
      <div className="text-[0.95rem] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
