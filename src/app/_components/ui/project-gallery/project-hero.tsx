'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { type Project } from './types';
import { ProjectHeroFace } from './project-hero-face';
import {
  PROJECT_MORPH_TRANSITION,
  projectMorphId,
  type ProjectId,
} from './morph';

export function ProjectHero({
  project,
  index,
  id,
  variant,
}: {
  project: Project;
  index: number;
  id: ProjectId;
  variant: 'card' | 'dialog';
}) {
  const isCard = variant === 'card';

  const image = (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      priority={isCard && index < 3}
      sizes="(max-width: 640px) 100vw, 50rem"
      className="size-full object-cover"
    />
  );

  const blurImage = (
    <Image
      src={project.image.src.replace(/\.[^.]+$/, '.blur.webp')}
      alt=""
      width={600}
      height={Math.round((600 * project.image.height) / project.image.width)}
      unoptimized
      className="size-full object-cover"
    />
  );

  return (
    <motion.div
      layoutId={projectMorphId.hero(id)}
      transition={PROJECT_MORPH_TRANSITION}
      className={cn('relative h-80 overflow-hidden', !isCard && 'z-1')}
    >
      <motion.div
        layoutId={projectMorphId.image(id)}
        layout="position"
        transition={PROJECT_MORPH_TRANSITION}
        className="absolute top-0 left-[calc(50%-24rem)] h-full w-3xl max-w-none"
      >
        <div className={cn('relative size-full')}>
          {image}
          {isCard ? (
            <div aria-hidden className="absolute inset-0">
              {blurImage}
            </div>
          ) : (
            <motion.div
              aria-hidden
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={PROJECT_MORPH_TRANSITION}
            >
              {blurImage}
            </motion.div>
          )}
        </div>
      </motion.div>

      <ProjectHeroFace project={project} index={index} id={id} />

      {isCard ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 inset-shadow-[0_0_24px_rgba(0,0,0,0.45)]"
        />
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ boxShadow: 'inset 0 0 24px rgba(0,0,0,0.45)' }}
          animate={{ boxShadow: 'inset 0 0 24px rgba(0,0,0,0)' }}
          exit={{ boxShadow: 'inset 0 0 24px rgba(0,0,0,0.45)' }}
          transition={PROJECT_MORPH_TRANSITION}
        />
      )}
    </motion.div>
  );
}
