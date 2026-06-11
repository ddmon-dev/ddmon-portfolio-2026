'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { type Project } from './types';
import { ProjectHero } from './project-hero';
import { ProjectDialog } from './project-dialog';
import { PROJECT_MORPH_TRANSITION, projectMorphId } from './morph';

/**
 * 갤러리 그리드 한 칸. 카드 article과, 열렸을 때 마운트되는 다이얼로그를 함께 보유한다.
 * 카드와 다이얼로그는 같은 `layoutId`(frame)를 공유하므로, 다이얼로그가 마운트되면 motion이
 * 두 article을 하나의 연속된 박스로 보고 transform 기반으로 모핑한다(리플로우 없음).
 * 열린 동안 카드 article은 motion이 자동으로 opacity 0 처리하지만, 그리드 공간은
 * 그대로 차지하므로 레이아웃이 흔들리지 않는다.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const id = project.slug;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const wasOpen = useRef(false);

  // 다이얼로그가 닫혀 카드로 수축이 끝나면 트리거로 포커스를 돌려준다.
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <motion.article
        layoutId={projectMorphId.frame(id)}
        transition={PROJECT_MORPH_TRANSITION}
        style={{ borderRadius: 28 }}
        className={cn(
          'group relative h-80 overflow-hidden bg-ash-950 text-white shadow-sm outline-none',
          open && 'pointer-events-none'
        )}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-label={`${project.title} 상세 보기`}
          onClick={() => setOpen(true)}
          className="absolute inset-0 z-10 cursor-pointer"
        >
          <span className="sr-only">{project.title} 상세 보기</span>
        </button>

        <ProjectHero variant="card" project={project} index={index} id={id} />
      </motion.article>

      <AnimatePresence>
        {open && (
          <ProjectDialog
            key="dialog"
            project={project}
            index={index}
            id={id}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
