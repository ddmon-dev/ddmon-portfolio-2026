'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { useMounted } from '@/shared/hooks/use-mounted';
import { ProjectFactBox } from './fact-box';
import { useFocusTrap } from './use-focus-trap';
import { type Project } from './types';
import { ProjectHero } from './hero';
import { ProjectDialogActions } from './dialog-actions';
import {
  PROJECT_MORPH_TRANSITION,
  projectMorphId,
  type ProjectId,
} from './morph';

const DIALOG_MOBILE_QUERY = '(width < 40rem)';
const DIALOG_RADIUS_MOBILE = 0;
const DIALOG_RADIUS_DESKTOP = 32;

function getDialogRadius(isMobile: boolean) {
  return isMobile ? DIALOG_RADIUS_MOBILE : DIALOG_RADIUS_DESKTOP;
}

export function ProjectDialog({
  project,
  index,
  id,
  onClose,
}: {
  project: Project;
  index: number;
  id: ProjectId;
  onClose: () => void;
}) {
  const trapRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const [radius, setRadius] = useState(() =>
    getDialogRadius(
      typeof window !== 'undefined' &&
        window.matchMedia(DIALOG_MOBILE_QUERY).matches
    )
  );
  useFocusTrap(true, trapRef);

  useEffect(() => {
    const mq = window.matchMedia(DIALOG_MOBILE_QUERY);
    const sync = () => setRadius(getDialogRadius(mq.matches));
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // React Compiler가 참조를 안정화하므로 useEffect 재구독 걱정 없이 그대로 의존성에 둔다
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const close = () => {
    scrollRef.current?.scrollTo({ top: 0 });
    onClose();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  if (!mounted) return null;

  const node = (
    <div
      ref={scrollRef}
      className="fixed inset-0 z-80 flex items-start justify-center overflow-y-auto p-6 hide-scrollbar max-sm:p-0"
    >
      <motion.button
        type="button"
        aria-label="다이얼로그 닫기"
        className="fixed inset-0 size-full bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={close}
      />

      <motion.article
        ref={trapRef}
        layoutId={projectMorphId.frame(id)}
        transition={PROJECT_MORPH_TRANSITION}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        style={{ borderRadius: radius }}
        className="relative z-10 w-full min-h-full max-w-3xl bg-background text-foreground shadow-2xl"
      >
        <div className="overflow-hidden rounded-[inherit]">
          <ProjectHero
            variant="dialog"
            project={project}
            index={index}
            id={id}
          />

          <div className="divide-y divide-border">
            {project.facts && (
              <div className="p-6 max-sm:p-5">
                <ProjectFactBox
                  facts={project.facts}
                  stacks={project.stacks}
                  links={project.links}
                />
              </div>
            )}

            <div className="p-6 max-sm:p-5">{project.content}</div>
          </div>
        </div>

        <ProjectDialogActions onClose={close} links={project.links} />
      </motion.article>
    </div>
  );

  return createPortal(node, document.body);
}
