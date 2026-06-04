'use client';

import { motion } from 'motion/react';
import { TechLogo, resolveTechId } from '@/shared/ui/tech-logo';
import { cn } from '@/shared/utils/classnames';

/** 헤더(카드·시트)에 로고로 노출할 최대 스킬 수. 초과분은 +N 칩으로 접는다. */
export const MAX_HEADER_SKILLS = 5;

/**
 * 본문(시트 Tech Stack)용 로고+텍스트 알약. 정적으로 놓이며 morph에 참여하지 않는다.
 */
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

/**
 * 헤더용 스킬 줄 — 배경 없는 원형 로고 칩 나열 + MAX_HEADER_SKILLS 초과 시 +N.
 * 각 칩에 layoutId를 줘 카드 ↔ 시트 헤더에서 칩이 개별 morph한다(원형→원형 균일 확대라
 * 모양이 안 깨진다). layoutId는 베이스 값으로 받아 스킬별 id를 파생한다.
 */
export function SkillBadgeRow({
  skills,
  layoutId,
  className,
  compact = false,
}: {
  skills: string[];
  /** morph 베이스 id. 각 칩은 `${layoutId}-${skill}` 형태로 개별 연결된다. */
  layoutId?: string;
  className?: string;
  /** 카드처럼 좁은 곳에서 칩/로고를 한 단계 작게 쓴다. */
  compact?: boolean;
}) {
  const overflow = skills.length - MAX_HEADER_SKILLS;
  // 사이즈 프리셋 한 묶음 — +N은 SVG가 아니라 텍스트라 폰트도 칩 크기에 맞춰 morph되게 한다.
  const sizing = compact
    ? { chip: 'size-9', logo: 24, overflowText: 'text-sm' }
    : { chip: 'size-12', logo: 32, overflowText: 'text-lg' };
  const chipBase = cn(
    'inline-flex shrink-0 items-center justify-center rounded-full border border-border',
    sizing.chip
  );

  return (
    <p className={cn('flex w-fit flex-wrap items-center gap-2.5', className)}>
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
          className={cn(chipBase, 'font-medium text-secondary-light', sizing.overflowText)}
        >
          +{overflow}
        </motion.span>
      )}
    </p>
  );
}
