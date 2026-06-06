'use client';

import Image from 'next/image';
import { type KeyboardEvent, useEffect, useId, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { StackBadges } from './stack-badges';
import { ProjectSheet } from './project-sheet';
import { useProjectSheet } from './use-project-sheet';
import { type Project } from './types';

export function ProjectCard({ project }: { project: Project }) {
  const { title, category, image, stacks } = project;

  const sheet = useProjectSheet();
  const { phase } = sheet;
  const morphId = useId();

  const isPlaceholder = phase === 'opened';
  const isReturning = phase === 'closing';

  const triggerRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (wasOpen.current && phase !== 'opened') {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = phase === 'opened';
  }, [phase]);

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
          initial={isReturning ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: isReturning ? 0.25 : 0 }}
          className="space-y-3"
        >
          <div className="space-y-1 px-2 text-center">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm">{category}</p>
          </div>
          <StackBadges stacks={stacks} />
        </motion.div>
      </motion.div>

      <ProjectSheet project={project} morphId={morphId} sheet={sheet} />
    </>
  );
}
