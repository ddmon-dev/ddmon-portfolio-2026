import { StackLogo, resolveStackId } from '@/shared/ui/stack-logo';
import { HoverTooltip } from '@/shared/ui/tooltip';
import { cn } from '@/shared/utils/classnames';

export const TRUNCATE_COUNT = 5;

export function StackBadges({
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
        <StackChip key={stack} stack={stack} tooltip={full} />
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
  tooltip,
  className,
}: {
  stack: string;
  tooltip?: boolean;
  className?: string;
}) {
  const chip = (
    <span
      title={tooltip ? undefined : stack}
      aria-label={tooltip ? undefined : stack}
      className={cn(className)}
    >
      <StackLogo stack={resolveStackId(stack)} />
    </span>
  );

  return tooltip ? <HoverTooltip label={stack}>{chip}</HoverTooltip> : chip;
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
    <span
      title={title}
      className="text-sm font-semibold text-secondary-light/50"
    >
      +{truncated}
    </span>
  );
}
