import { cn } from '@/shared/utils/classnames';
import { Badge } from './badge';
import { StackLogo, resolveStackId } from './stack-logo';

export const TRUNCATE_COUNT = 5;

export function StackChips({
  stacks,
  full = false,
  className,
}: {
  stacks: string[];
  full?: boolean;
  className?: string;
}) {
  const visible = full ? stacks : stacks.slice(0, TRUNCATE_COUNT);
  const truncated = full ? 0 : stacks.length - TRUNCATE_COUNT;

  return (
    <p
      className={cn(
        'flex flex-wrap justify-center items-center gap-3 text-3xl',
        full && 'text-4xl gap-4',
        className
      )}
    >
      {visible.map(stack => (
        <StackChip key={stack} stack={stack} />
      ))}

      <TruncatedChip
        title={stacks.slice(TRUNCATE_COUNT).join(', ')}
        truncated={truncated}
      />
    </p>
  );
}

export function StackChip({
  stack,
  className,
}: {
  stack: string;
  className?: string;
}) {
  return (
    <span role="img" aria-label={stack} className={cn(className)}>
      <StackLogo stack={resolveStackId(stack)} />
    </span>
  );
}

export function StackBadges({
  stacks,
  className,
  badgeClassName,
}: {
  stacks: string[];
  className?: string;
  badgeClassName?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-1', className)}>
      {stacks.map(stack => (
        <li key={stack}>
          <Badge
            variant="outline"
            shape="pill"
            className={cn('gap-1.5 pl-1.5 pr-2.5 py-1 text-xs', badgeClassName)}
          >
            <span aria-hidden className="text-sm">
              <StackLogo stack={resolveStackId(stack)} />
            </span>
            <span>{stack}</span>
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function TruncatedChip({
  title,
  truncated,
}: {
  title: string;
  truncated: number;
}) {
  if (truncated <= 0) return null;

  return (
    <span title={title} className="text-sm font-semibold text-white/90">
      +{truncated}
    </span>
  );
}
