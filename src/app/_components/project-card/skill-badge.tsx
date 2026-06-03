'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';

export function SkillBadge({
  children,
  className,
  layoutId,
}: {
  children: ReactNode;
  className?: string;
  /** 주어지면 카드 ↔ 페이지 간 배지를 개별 morph로 연결한다. */
  layoutId?: string;
}) {
  return (
    <motion.span
      layoutId={layoutId}
      className={cn(
        'inline-flex justify-center items-center py-1 px-2.5 rounded-full text-sm shrink-0 overflow-hidden',
        'bg-black text-white',
        'max-w-22',
        className
      )}
    >
      <span className="block truncate">{children}</span>
    </motion.span>
  );
}
