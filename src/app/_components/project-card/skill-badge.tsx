'use client';

import { motion } from 'motion/react';
import { TechLogo, resolveTechId } from '@/shared/ui/tech-logo';
import { cn } from '@/shared/utils/classnames';

export function SkillBadge({
  skill,
  showLabel = true,
  className,
  layoutId,
}: {
  /** 스킬명. 좌측 로고는 이 값에서 해석하고, showLabel일 때 텍스트로도 노출한다. */
  skill: string;
  /** false면 로고만 보이는 원형 뱃지(카드용), true면 로고+텍스트 알약(시트용). */
  showLabel?: boolean;
  className?: string;
  /** 주어지면 카드 ↔ 페이지 간 배지를 개별 morph로 연결한다. */
  layoutId?: string;
}) {
  return (
    <motion.span
      layoutId={layoutId}
      title={showLabel ? undefined : skill}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full text-sm',
        'bg-secondary-light text-on-secondary',
        showLabel ? 'gap-1.5 px-2.5 py-1' : 'size-7',
        className
      )}
    >
      <TechLogo tech={resolveTechId(skill)} size={16} className="shrink-0" />
      {showLabel && <span className="block max-w-22 truncate">{skill}</span>}
    </motion.span>
  );
}
