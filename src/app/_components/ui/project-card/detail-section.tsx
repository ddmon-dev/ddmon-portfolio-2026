import { type ReactNode } from 'react';

export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h4 className="text-sm font-bold uppercase tracking-wide text-muted-foreground/60">
        {title}
      </h4>
      <div className="leading-relaxed text-foreground/80">{children}</div>
    </section>
  );
}
