'use client';

import { motion } from 'motion/react';
import { TechLogo, resolveTechId } from '@/shared/ui/tech-logo';
import { cn } from '@/shared/utils/classnames';

/** 헤더(카드·시트)에 로고로 노출할 최대 스킬 수. 초과분은 +N 칩으로 접는다. */
export const MAX_HEADER_SKILLS = 5;

export function SkillBadge({
  skill,
  showLabel = true,
  className,
}: {
  /** 스킬명. 좌측 로고는 이 값에서 해석하고, showLabel일 때 텍스트로도 노출한다. */
  skill: string;
  /** false면 로고만 보이는 원형 뱃지(헤더용), true면 로고+텍스트 알약(본문용). */
  showLabel?: boolean;
  className?: string;
}) {
  return (
    // motion.span으로 둬서 헤더 줄(layoutId) morph 중 부모의 scale 변형을 역보정받아
    // 뱃지 비율(원형)이 찌그러지지 않게 한다. layout/layoutId가 없어 개별 morph는 없다.
    <motion.span
      // 로고만 보이는 경우 호버 시 스킬명을 알 수 있게 title을 단다.
      title={showLabel ? undefined : skill}
      className={cn(
        'inline-flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm',
        'bg-secondary-light text-on-secondary',
        showLabel ? 'gap-1.5 px-3' : 'w-9',
        className
      )}
    >
      <TechLogo tech={resolveTechId(skill)} size={20} className="shrink-0" />
      {showLabel && <span className="block max-w-22 truncate">{skill}</span>}
    </motion.span>
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
  const chipSize = compact ? 'size-9' : 'size-12';
  const logoSize = compact ? 24 : 32;
  // +N은 SVG가 아니라 텍스트라, 칩 크기에 맞춰 폰트도 달리 줘야 morph 중 함께 커진다.
  const overflowText = compact ? 'text-sm' : 'text-lg';

  return (
    <p className={cn('flex w-fit flex-wrap items-center gap-2.5', className)}>
      {skills.slice(0, MAX_HEADER_SKILLS).map(skill => (
        <motion.span
          key={skill}
          layoutId={layoutId && `${layoutId}-${skill}`}
          title={skill}
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded-full border border-border',
            chipSize
          )}
        >
          <TechLogo tech={resolveTechId(skill)} size={logoSize} />
        </motion.span>
      ))}
      {overflow > 0 && (
        <motion.span
          layoutId={layoutId && `${layoutId}-overflow`}
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded-full border border-border font-medium text-secondary-light',
            chipSize,
            overflowText
          )}
        >
          +{overflow}
        </motion.span>
      )}
    </p>
  );
}
