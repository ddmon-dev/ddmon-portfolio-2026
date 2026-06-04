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
}: {
  skills: string[];
  layoutId?: string;
  className?: string;
}) {
  const overflow = skills.length - MAX_HEADER_SKILLS;
  const chipBase =
    'inline-flex shrink-0 items-center justify-center rounded-full bg-muted size-9';

  return (
    <p className={cn('flex w-fit flex-wrap items-center gap-1', className)}>
      {skills.slice(0, MAX_HEADER_SKILLS).map(skill => (
        <motion.span
          key={skill}
          layoutId={layoutId && `${layoutId}-${skill}`}
          title={skill}
          aria-label={skill}
          className={chipBase}
        >
          <TechLogo tech={resolveTechId(skill)} size={24} />
        </motion.span>
      ))}
      {overflow > 0 && (
        <motion.span
          layoutId={layoutId && `${layoutId}-overflow`}
          title={skills.slice(MAX_HEADER_SKILLS).join(', ')}
          className={cn(
            chipBase,
            'font-semibold text-secondary-light/50 bg-transparent text-sm'
          )}
        >
          +{overflow}
        </motion.span>
      )}
    </p>
  );
}
