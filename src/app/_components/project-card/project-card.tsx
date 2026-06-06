'use client';

import Image from 'next/image';
import { type KeyboardEvent, type Ref } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { SkillBadges } from './skill-badge';
import { type Project } from './types';

export function ProjectCard({
  project,
  sharedId,
  onClick,
  className,
  revealText = false,
  'aria-hidden': ariaHidden,
  ref,
}: {
  project: Project;
  sharedId?: string;
  onClick?: () => void;
  className?: string;
  /**
   * 닫기 morph로 카드가 돌아오는 중이면 true. 이미지는 morph로 돌아오고, 텍스트(제목/카테고리/
   * 스킬)는 이때만 페이드인해 톡 튀어나오지 않게 한다. 평소 그리드 카드는 false(정적).
   */
  revealText?: boolean;
  'aria-hidden'?: boolean;
  ref?: Ref<HTMLDivElement>;
}) {
  const { title, category, image, skills } = project;

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event: KeyboardEvent) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-hidden={ariaHidden}
      className={cn('space-y-4', onClick && 'cursor-pointer', className)}
    >
      <motion.div
        layoutId={sharedId && `${sharedId}-image`}
        style={{
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        }}
        className="overflow-hidden"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="aspect-video w-full bg-black/30 object-cover"
        />
      </motion.div>
      <motion.div
        initial={revealText ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: revealText ? 0.25 : 0 }}
        className="space-y-3"
      >
        <div className="space-y-1 px-2 text-center">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm">{category}</p>
        </div>
        <SkillBadges skills={skills} />
      </motion.div>
    </motion.div>
  );
}
