'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { Container } from '@/shared/ui/container';
import { type Project } from '../project-card/types';
import { AppStoreHeroFace } from './app-store-hero-face';
import { AppStoreProjectModal, type CardRect } from './app-store-project-modal';

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
          'group relative h-80 overflow-hidden bg-ash-950 text-white shadow-sm outline-none',
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
        <AppStoreHeroFace project={project} index={index} />
      </motion.article>

      {isActive && (
        <AppStoreProjectModal
          project={project}
          index={index}
          startRect={startRect}
          onClosed={() => setStartRect(null)}
        />
      )}
    </>
  );
}
