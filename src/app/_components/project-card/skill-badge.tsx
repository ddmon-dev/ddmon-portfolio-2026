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
 * 헤더용 스킬 줄 — 로고만(원형) + MAX_HEADER_SKILLS 초과 시 +N 칩.
 * 카드와 시트 헤더가 같은 layoutId로 이 동일한 줄을 렌더하므로, 둘 사이 morph는
 * 모양 변화 없이 위치/크기만 부드럽게 이어진다.
 */
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

  return (
    // w-fit로 내용 너비에 맞춘다 — flex(블록)면 부모 너비를 따라 카드/시트 박스 크기가 달라져
    // morph 시 가로로 늘어나며(scaleX) 뱃지가 찌그러진다. 박스 크기를 양쪽 동일하게 맞춰
    // morph가 scale 없이 위치만 이동하도록 한다.
    <motion.p
      layoutId={layoutId}
      className={cn('flex w-fit flex-wrap gap-1', className)}
    >
      {skills.slice(0, MAX_HEADER_SKILLS).map(skill => (
        <SkillBadge key={skill} skill={skill} showLabel={false} />
      ))}
      {overflow > 0 && (
        <motion.span
          className={cn(
            'inline-flex size-9 shrink-0 items-center justify-center rounded-full',
            'bg-secondary-light text-on-secondary text-xs'
          )}
        >
          +{overflow}
        </motion.span>
      )}
    </motion.p>
  );
}
