import { TechLogo, resolveTechId } from '@/shared/ui/tech-logo';
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
  return (
    <span
      title={tooltip ? undefined : skill}
      aria-label={skill}
      className={cn(chipBaseClassNames, tooltip && 'group/skill relative')}
    >
      <TechLogo tech={resolveTechId(skill)} size={24} />
      {tooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs text-on-secondary opacity-0 transition-opacity group-hover/skill:opacity-100"
        >
          {skill}
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-[2px] bg-secondary" />
        </span>
      )}
    </span>
  );
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
