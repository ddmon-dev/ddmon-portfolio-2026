import { type ReactNode } from 'react';
import { cn } from '@/shared/utils/classnames';

export function HoverTooltip({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('group/tooltip relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground opacity-0 transition-opacity group-hover/tooltip:opacity-100"
      >
        {label}
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-[2px] bg-secondary" />
      </span>
    </span>
  );
}
