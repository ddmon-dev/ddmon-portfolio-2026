'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { SkillBadge } from './skill-badge';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * 카드의 표면(이미지 + 제목 + 카테고리 + 스킬). 그리드 카드와 그 자리를 메우는
 * invisible placeholder가 공유하는 단일 마크업.
 *
 * sharedId가 주어지면 각 요소에 layoutId를 부여해 카드 ↔ 상세 시트 간 morph에
 * 참여한다. sharedId가 없으면(placeholder) layoutId 없이 렌더되어 공유 레이아웃에
 * 끼어들지 않고, 동일 마크업이므로 실제 카드와 정확히 같은 크기를 차지한다.
 */
export function CardFace({
  sharedId,
  title,
  category,
  image,
  skills,
  onClick,
  className,
}: {
  sharedId?: string;
  title: string;
  category: string;
  image: ProjectImage;
  skills: string[];
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      layoutId={sharedId}
      onClick={onClick}
      className={cn('space-y-4', onClick && 'cursor-pointer', className)}
    >
      <motion.div
        layoutId={sharedId && `${sharedId}-image`}
        className="overflow-hidden rounded-md"
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
            className="w-fit text-lg/5 font-bold"
          >
            {title}
          </motion.h3>
          <motion.p
            layoutId={sharedId && `${sharedId}-category`}
            className="w-fit"
          >
            {category}
          </motion.p>
        </div>
        <p className="flex flex-wrap gap-x-1">
          {skills.map(skill => (
            <SkillBadge
              key={skill}
              layoutId={sharedId && `${sharedId}-skill-${skill}`}
            >
              {skill}
            </SkillBadge>
          ))}
        </p>
      </div>
    </motion.div>
  );
}
