'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { Container } from '@/shared/ui/container';
import { type Project } from '../project-card/types';
import {
  AppStoreProjectModal,
  type CardRect,
} from './app-store-project-modal';

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

      <ul className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {projects.map((project, index) => (
          <li key={project.title}>
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
  const cardRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [startRect, setStartRect] = useState<CardRect | null>(null);
  const wasOpen = useRef(false);
  const isActive = startRect !== null;

  useEffect(() => {
    if (wasOpen.current && !isActive) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = isActive;
  }, [isActive]);

  const open = () => {
    const element = cardRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    setStartRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  return (
    <>
      <motion.article
        ref={cardRef}
        style={{ borderRadius: 28 }}
        className={cn(
          'group relative min-h-[28rem] overflow-hidden bg-ash-950 text-white shadow-sm outline-none',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background',
          isActive && 'invisible'
        )}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-label={`${project.title} 상세 보기`}
          onClick={open}
          className="absolute inset-0 z-10 cursor-pointer"
        >
          <span className="sr-only">{project.title} 상세 보기</span>
        </button>
        <div className="absolute inset-0">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(max-width: 640px) 100vw, 29rem"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/10 to-black/78" />

        <div className="relative flex h-full min-h-[28rem] flex-col justify-between p-5">
          <div className="font-secondary text-[0.7rem] font-semibold tracking-[0.18em] text-white/78 uppercase">
            {String(index + 1).padStart(2, '0')} Featured Project
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-3xl leading-tight font-bold">
                {project.title}
              </h3>
              <p className="text-sm text-white/78">{project.category}</p>
            </div>
            <div>
              <CompactStackList stacks={project.stacks.slice(0, 4)} />
            </div>
          </div>
        </div>
      </motion.article>

      {isActive && (
        <AppStoreProjectModal
          project={project}
          startRect={startRect}
          onClosed={() => setStartRect(null)}
        />
      )}
    </>
  );
}

function CompactStackList({ stacks }: { stacks: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stacks.map((stack) => (
        <li
          key={stack}
          className="rounded-full border border-white/18 bg-white/14 px-3 py-1 text-xs font-semibold text-white/88 backdrop-blur-sm"
        >
          {stack}
        </li>
      ))}
    </ul>
  );
}
