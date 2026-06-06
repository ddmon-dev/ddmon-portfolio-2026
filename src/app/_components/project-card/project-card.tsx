'use client';

import Image from 'next/image';
import { type KeyboardEvent, useEffect, useId, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { SkillBadges } from './skill-badge';
import { ProjectSheet } from './project-sheet';
import { useProjectSheet } from './use-project-sheet';
import { type Project } from './types';

export function ProjectCard({ project }: { project: Project }) {
  const { title, category, image, skills } = project;

  const sheet = useProjectSheet();
  const { open, backdropVisible } = sheet;
  const morphId = useId();

  // open이면 카드는 자리만 지키는 placeholder가 되고, layoutId를 시트 이미지에 양보한다.
  // 닫는 중(returning)이면 backdrop 위로 승격(z-50)돼 이미지 morph-back이 디밍 없이 보이고,
  // 카드 텍스트는 이때만 페이드인한다.
  const isPlaceholder = open;
  const isReturning = !open && backdropVisible;
  const revealText = isReturning;

  // 닫힘 완료 시 트리거 카드로 포커스 복귀. placeholder 전환으로 카드 서브트리가
  // remount되므로, 현재 살아있는 트리거 노드를 ref로 잡아 직접 focus한다.
  const triggerRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <motion.div
        key={isPlaceholder ? 'placeholder' : 'card'}
        ref={triggerRef}
        onClick={isPlaceholder ? undefined : sheet.openSheet}
        onKeyDown={
          isPlaceholder
            ? undefined
            : (event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  sheet.openSheet();
                }
              }
        }
        role={isPlaceholder ? undefined : 'button'}
        tabIndex={isPlaceholder ? undefined : 0}
        aria-hidden={isPlaceholder || undefined}
        className={cn(
          'space-y-4',
          isPlaceholder ? 'invisible' : 'cursor-pointer',
          isReturning && 'relative z-50'
        )}
      >
        <motion.div
          layoutId={isPlaceholder ? undefined : `${morphId}-image`}
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

      <ProjectSheet project={project} morphId={morphId} sheet={sheet} />
    </>
  );
}
