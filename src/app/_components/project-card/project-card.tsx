'use client';

import Image from 'next/image';
import { type KeyboardEvent, type Ref } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { SkillBadge } from './skill-badge';
import { type Project } from './types';

/** 카드 표면에 노출할 최대 스킬 수. 초과분은 +N 칩으로 접는다. */
const MAX_CARD_SKILLS = 5;

/**
 * 그리드에 놓이는 프로젝트 카드(이미지 + 제목 + 카테고리 + 스킬). 이 카드들이 모여
 * ProjectGallery를 이룬다.
 *
 * 두 가지 정체성으로 쓰인다 — 갤러리가 sharedId/onClick을 바꿔 전환한다.
 * - 닫힘: sharedId를 가진 실제 카드(클릭 가능). 각 요소가 layoutId로 시트 morph에 참여.
 * - 열림(활성 카드): sharedId 없는 invisible placeholder. 같은 layoutId가 동시에 둘
 *   존재하면 안 되므로, 활성 카드는 layoutId를 시트에 넘기고 자리만 유지한다.
 *   닫을 때 다시 sharedId를 회수해 시트가 이 자리로 morph해 돌아온다.
 */
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
  /** placeholder로 쓸 때 보조기술에서 숨긴다. */
  'aria-hidden'?: boolean;
  /** 닫힘 후 포커스 복귀 대상으로 쓰도록 갤러리가 활성 카드에 넘긴다. */
  ref?: Ref<HTMLDivElement>;
}) {
  const { title, category, image, skills } = project;

  return (
    <motion.div
      ref={ref}
      layoutId={sharedId}
      onClick={onClick}
      // 클릭 가능할 때만 키보드로도 열 수 있게 버튼 역할을 부여한다.
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
        // radius는 클래스가 아니라 style로 줘야 motion이 morph 중 보정·tween한다.
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
            className="w-fit text-sm"
          >
            {category}
          </motion.p>
        </div>
        <p className="flex flex-wrap gap-1">
          {skills.slice(0, MAX_CARD_SKILLS).map(skill => (
            <SkillBadge
              key={skill}
              skill={skill}
              showLabel={false}
              layoutId={sharedId && `${sharedId}-skill-${skill}`}
            />
          ))}
          {skills.length > MAX_CARD_SKILLS && (
            <span
              className={cn(
                'inline-flex size-7 shrink-0 items-center justify-center rounded-full',
                'bg-secondary-light text-on-secondary text-xs'
              )}
            >
              +{skills.length - MAX_CARD_SKILLS}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
