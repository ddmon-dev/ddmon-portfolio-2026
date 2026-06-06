import { StackLogo, resolveStackId } from '@/shared/ui/stack-logo';
import { HoverTooltip } from '@/shared/ui/tooltip';
import { cn } from '@/shared/utils/classnames';

export const TRUNCATE_COUNT = 5;

export function SkillBadges({
  skills,
  full = false,
  className,
}: {
  skills: string[];
  full?: boolean;
  className?: string;
}) {
  const visible = full ? skills : skills.slice(0, TRUNCATE_COUNT);
  const truncated = full ? 0 : skills.length - TRUNCATE_COUNT;

  return (
    <p
      className={cn(
        'flex flex-wrap justify-center items-center gap-3',
        className
      )}
    >
      {visible.map(skill => (
        <SkillChip key={skill} skill={skill} tooltip={full} />
      ))}

      <TruncatedChip
        title={skills.slice(TRUNCATE_COUNT).join(', ')}
        truncated={truncated}
      />
    </p>
  );
}

export function SkillChip({
  skill,
  tooltip,
  className,
}: {
  skill: string;
  tooltip?: boolean;
  className?: string;
}) {
  const chip = (
    <span
      title={tooltip ? undefined : skill}
      aria-label={tooltip ? undefined : skill}
      className={cn(className)}
    >
      <StackLogo stack={resolveStackId(skill)} className="text-3xl" />
    </span>
  );

  return tooltip ? <HoverTooltip label={skill}>{chip}</HoverTooltip> : chip;
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
