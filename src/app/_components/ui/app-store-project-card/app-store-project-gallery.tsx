'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { Container } from '@/shared/ui/container';
import { type Project } from '../project-card/types';
import { AppStoreHero } from './app-store-hero';
import { AppStoreProjectModal } from './app-store-project-modal';
import { APP_STORE_LAYOUT_TRANSITION, appStoreLayoutId } from './app-store-motion';

export function AppStoreProjectGallery({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  return (
    <Container as="section" className="space-y-8">
      <div className="space-y-2">
        <p className="font-secondary text-xs font-semibold tracking-[0.2em] text-primary-dark uppercase">
          Motion demo
        </p>
        <h2 className="text-4xl font-bold">{title}</h2>
      </div>

      <ul className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
        {projects.map((project, index) => (
          <li key={project.slug ?? project.title}>
            <AppStoreProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

function AppStoreProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const id = project.slug ?? index;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const wasOpen = useRef(false);

  // 모달이 닫혀 카드로 수축이 끝나면 트리거로 포커스를 돌려준다.
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      {/*
        카드와 모달은 같은 `layoutId`(frame)를 공유한다. 모달이 마운트되면 motion이
        두 article을 하나의 연속된 박스로 보고 transform 기반으로 모핑한다(리플로우 없음).
        열린 동안 카드 article은 motion이 자동으로 opacity 0 처리하지만, 그리드 공간은
        그대로 차지하므로 레이아웃이 흔들리지 않는다.
      */}
      <motion.article
        layoutId={appStoreLayoutId.frame(id)}
        transition={APP_STORE_LAYOUT_TRANSITION}
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

        <AppStoreHero variant="card" project={project} index={index} id={id} />
      </motion.article>

      <AnimatePresence>
        {open && (
          <AppStoreProjectModal
            key="modal"
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
