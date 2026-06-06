import { TechLogo, resolveTechId } from '@/shared/ui/tech-logo';
import { HoverTooltip } from '@/shared/ui/tooltip';
import { cn } from '@/shared/utils/classnames';

export const MAX_HEADER_SKILLS = 5;

export function SkillBadges({
  skills,
  full = false,
  className,
}: {
  skills: string[];
  full?: boolean;
  className?: string;
}) {
  const visible = full ? skills : skills.slice(0, MAX_HEADER_SKILLS);
  const overflow = full ? 0 : skills.length - MAX_HEADER_SKILLS;

  return (
    <p
      className={cn(
        'flex flex-wrap justify-center items-center gap-1',
        className
      )}
    >
      {visible.map(skill => (
        <SkillChip key={skill} skill={skill} tooltip={full} />
      ))}

      <TruncatedChip
        title={skills.slice(MAX_HEADER_SKILLS).join(', ')}
        overflow={overflow}
      />
    </p>
  );
}

const chipBaseClassNames =
  'inline-flex shrink-0 items-center justify-center rounded-full bg-muted size-9';

function SkillChip({ skill, tooltip }: { skill: string; tooltip: boolean }) {
  const chip = (
    <span
      title={tooltip ? undefined : skill}
      aria-label={skill}
      className={chipBaseClassNames}
    >
      <TechLogo tech={resolveTechId(skill)} size={24} />
    </span>
  );

  return tooltip ? <HoverTooltip label={skill}>{chip}</HoverTooltip> : chip;
}

function TruncatedChip({
  title,
  overflow,
}: {
  title: string;
  overflow: number;
}) {
  if (overflow === 0) return null;

  return (
    <span
      title={title}
      className={cn(
        chipBaseClassNames,
        'bg-transparent text-sm font-semibold text-secondary-light/50'
      )}
    >
      +{overflow}
    </span>
  );
}
