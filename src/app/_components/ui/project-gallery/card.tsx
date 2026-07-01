'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { type Project } from './types';
import { ProjectHero } from './hero';
import { ProjectDialog } from './dialog';
import { PROJECT_MORPH_TRANSITION, projectMorphId } from './morph';

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
  const [elevated, setElevated] = useState(false);
  const wasOpen = useRef(false);

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
          'group relative h-80 overflow-hidden bg-ash-950 text-white shadow-sm outline-hidden',
          open && 'pointer-events-none',
          elevated && 'z-60'
        )}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-label={`${project.title} 상세 보기`}
          onClick={() => {
            setOpen(true);
            setElevated(true);
          }}
          className="absolute inset-0 z-10 cursor-pointer"
        >
          <span className="sr-only">{project.title} 상세 보기</span>
        </button>

        <ProjectHero variant="card" project={project} index={index} id={id} />
      </motion.article>

      <AnimatePresence onExitComplete={() => setElevated(false)}>
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
