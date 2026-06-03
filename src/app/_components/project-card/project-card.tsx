'use client';

import Image from 'next/image';
import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { SkillBadge } from './skill-badge';
import { ProjectSheet } from './project-sheet';
import { useCardSheet } from './use-card-sheet';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectCardProps = {
  title: string;
  category: string;
  image: ProjectImage;
  skills: string[];
  /** 시트에 펼쳐질 상세 본문. 호출부에서 DetailSection 등으로 하드코딩한다. */
  children: ReactNode;
};

/**
 * 클릭하면 카드가 풀페이지 상세로 확장되는 프로젝트 카드.
 * motion의 layoutId 공유 레이아웃으로 카드 ↔ 상세 시트 사이를 morph한다.
 *
 * 역할 분담:
 * - useCardSheet : 전환 상태와 타이밍(open/backdrop/expanded)
 * - CardFace     : 그리드 카드 표면(과 자리 유지용 placeholder)
 * - ProjectSheet : 펼쳐진 상세(배경 + 흰 시트 + 뒤로 버튼)
 */
export function ProjectCard({
  title,
  category,
  image,
  skills,
  children,
}: ProjectCardProps) {
  const sheet = useCardSheet();
  const face = { title, category, image, skills };

  return (
    <>
      {/*
        하나의 CardFace가 open에 따라 두 정체성 사이를 오간다.
        - 닫힘: 공유 id를 가진 실제 카드(클릭 가능)
        - 열림: id 없는 invisible placeholder. 시트가 카드 위치에서 정확히 morph하려면
          같은 layoutId가 동시에 둘 존재하면 안 되므로, 열릴 때 카드를 언마운트해야 한다.

        key를 'card' ↔ 'placeholder'로 바꿔 React가 인스턴스를 remount하도록 강제한다.
        이 remount가 morph의 unmount/mount 트리거이며, key가 그 의도를 명시한다.
        (닫는 동안 backdrop 페이드아웃 내내 카드를 backdrop(z-40) 위로 올려 흰 배경에
        가려지지 않게 한다. backdrop exit 완료 시 z-index 원복.)
      */}
      <CardFace
        key={sheet.open ? 'placeholder' : 'card'}
        {...face}
        sharedId={sheet.open ? undefined : sheet.id}
        onClick={sheet.open ? undefined : sheet.openSheet}
        aria-hidden={sheet.open || undefined}
        className={cn(
          sheet.open ? 'invisible' : sheet.backdropVisible && 'relative z-50'
        )}
      />

      <ProjectSheet sheet={sheet} {...face}>
        {children}
      </ProjectSheet>
    </>
  );
}

/**
 * 카드의 표면(이미지 + 제목 + 카테고리 + 스킬). 닫힘일 땐 실제 카드, 열림일 땐 자리 유지용
 * invisible placeholder로 쓰인다 — ProjectCard가 key를 바꿔 둘 사이를 remount로 전환한다.
 *
 * sharedId가 주어지면 각 요소에 layoutId를 부여해 카드 ↔ 상세 시트 간 morph에 참여한다.
 * sharedId가 없으면(placeholder) layoutId 없이 렌더되어 공유 레이아웃에 끼어들지 않고,
 * 동일 마크업이므로 실제 카드와 정확히 같은 크기를 차지한다.
 */
function CardFace({
  sharedId,
  title,
  category,
  image,
  skills,
  onClick,
  className,
  'aria-hidden': ariaHidden,
}: {
  sharedId?: string;
  title: string;
  category: string;
  image: ProjectImage;
  skills: string[];
  onClick?: () => void;
  className?: string;
  /** placeholder로 쓸 때 보조기술에서 숨긴다. */
  'aria-hidden'?: boolean;
}) {
  return (
    <motion.div
      layoutId={sharedId}
      onClick={onClick}
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
        <p className="flex flex-wrap gap-x-1">
          {skills.map(skill => (
            <SkillBadge
              key={skill}
              layoutId={sharedId && `${sharedId}-skill-${skill}`}
              className="text-xs"
            >
              {skill}
            </SkillBadge>
          ))}
        </p>
      </div>
    </motion.div>
  );
}
