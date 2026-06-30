'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { useMounted } from '@/shared/hooks/use-mounted';
import { ProjectFactBox } from './project-fact-box';
import { useFocusTrap } from './use-focus-trap';
import { type Project } from './types';
import { ProjectHero } from './project-hero';
import { ProjectDialogNav } from './project-dialog-nav';
import {
  PROJECT_MORPH_TRANSITION,
  projectMorphId,
  type ProjectId,
} from './morph';

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
  const mounted = useMounted();
  const [radius, setRadius] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(width < 40rem)').matches
      ? 0
      : 32
  );
  useFocusTrap(true, trapRef);

  useEffect(() => {
    const mq = window.matchMedia('(width < 40rem)');
    const sync = () => setRadius(mq.matches ? 0 : 32);
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

  const close = () => {
    trapRef.current?.scrollTo({ top: 0 });
    onClose();
  };

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      trapRef.current?.scrollTo({ top: 0 });
      onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!mounted) return null;

  const node = (
    <div className="fixed inset-0 z-80 flex justify-center p-6 max-sm:p-0">
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
        className="relative z-10 size-full max-w-3xl bg-background text-foreground shadow-2xl overflow-y-auto hide-scrollbar"
      >
        <ProjectHero variant="dialog" project={project} index={index} id={id} />

        <div className="divide-y divide-border">
          {project.facts && (
            <div className="p-6 max-sm:p-5">
              <ProjectFactBox facts={project.facts} stacks={project.stacks} />
            </div>
          )}

          <div className="p-6 max-sm:p-5">
            <div className="divide-y divide-border text-ash-dark [&>section]:py-6 [&>section]:first:pt-0 [&>section]:last:pb-0">
              {project.content}
            </div>
          </div>
        </div>

        <ProjectDialogNav onClose={close} />
      </motion.article>
    </div>
  );

  return createPortal(node, document.body);
}
