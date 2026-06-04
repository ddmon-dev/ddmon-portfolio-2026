'use client';

import { motion } from 'motion/react';
import { TechLogo, resolveTechId } from '@/shared/ui/tech-logo';
import { cn } from '@/shared/utils/classnames';

/** 헤더(카드·시트)에 로고로 노출할 최대 스킬 수. 초과분은 +N 칩으로 접는다. */
export const MAX_HEADER_SKILLS = 5;

export function SkillBadge({
  skill,
  className,
}: {
  skill: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-9 shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full px-3 text-sm',
        'bg-secondary-light text-on-secondary',
        className
      )}
    >
      <TechLogo tech={resolveTechId(skill)} size={20} className="shrink-0" />
      <span className="block max-w-22 truncate">{skill}</span>
    </span>
  );
}

export function SkillBadgeRow({
  skills,
  layoutId,
  className,
  compact = false,
}: {
  skills: string[];
  layoutId?: string;
  className?: string;
  compact?: boolean;
}) {
  const overflow = skills.length - MAX_HEADER_SKILLS;
  const sizing = compact
    ? { container: 'gap-1', chip: 'size-9', logo: 24, overflowText: 'text-sm' }
    : {
        container: 'gap-1.5',
        chip: 'size-12',
        logo: 32,
        overflowText: 'text-lg',
      };
  const chipBase = cn(
    'inline-flex shrink-0 items-center justify-center rounded-full border border-border',
    sizing.chip
  );

  return (
    <p
      className={cn(
        'flex w-fit flex-wrap items-center',
        sizing.container,
        className
      )}
    >
      {skills.slice(0, MAX_HEADER_SKILLS).map(skill => (
        <motion.span
          key={skill}
          layoutId={layoutId && `${layoutId}-${skill}`}
          title={skill}
          aria-label={skill}
          className={chipBase}
        >
          <TechLogo tech={resolveTechId(skill)} size={sizing.logo} />
        </motion.span>
      ))}
      {overflow > 0 && (
        <motion.span
          layoutId={layoutId && `${layoutId}-overflow`}
          title={skills.slice(MAX_HEADER_SKILLS).join(', ')}
          className={cn(
            chipBase,
            'font-bold text-secondary-light/50 border-none',
            sizing.overflowText
          )}
        >
          +{overflow}
        </motion.span>
      )}
    </p>
  );
}
