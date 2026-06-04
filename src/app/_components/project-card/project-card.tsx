'use client';

import Image from 'next/image';
import { type KeyboardEvent, type Ref } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { SkillBadgeRow } from './skill-badge';
import { type Project } from './types';

export function ProjectCard({
  project,
  sharedId,
  onClick,
  className,
  'aria-hidden': ariaHidden,
  ref,
}: {
  project: Project;
  sharedId?: string;
  onClick?: () => void;
  className?: string;
  'aria-hidden'?: boolean;
  ref?: Ref<HTMLDivElement>;
}) {
  const { title, category, image, skills } = project;

  return (
    <motion.div
      ref={ref}
      layoutId={sharedId}
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
      <div className="space-y-3">
        <div className="space-y-1 px-2">
          <motion.h3
            layoutId={sharedId && `${sharedId}-title`}
            className="w-fit text-lg leading-[1.3] font-bold"
          >
            {title}
          </motion.h3>
          <motion.p
            layoutId={sharedId && `${sharedId}-category`}
            className="w-fit text-sm leading-normal"
          >
            {category}
          </motion.p>
        </div>
        <SkillBadgeRow
          skills={skills}
          layoutId={sharedId && `${sharedId}-skills`}
        />
      </div>
    </motion.div>
  );
}
