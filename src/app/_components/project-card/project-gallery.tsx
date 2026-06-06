'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/shared/ui/container';
import { cn } from '@/shared/utils/classnames';
import { ProjectCard } from './project-card';
import { ProjectSheet } from './project-sheet';
import { useProjectGallery } from './use-project-gallery';
import { type Project } from './types';

/**
 * 프로젝트 한 섹션 = 제목 + 카드 그리드 + 단일 상세 시트.
 *
 * 카드 클릭 → 이미지가 시트로 morph(layoutId), 흰 backdrop이 그리드를 가린다.
 * 닫으면 이미지가 카드로 morph-back 하고 카드 텍스트는 페이드인한다.
 * 닫는 동안 활성 카드는 backdrop 위로 승격돼(z-50) 이미지 morph가 디밍 없이 깨끗하게 보인다.
 */
export function ProjectGallery({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  const gallery = useProjectGallery();
  const { open, activeIndex, backdropVisible, idBase } = gallery;

  // 닫힐 때 트리거(현재 활성 카드)로 포커스를 되돌린다. 카드는 placeholder 전환으로
  // remount되므로 remount된 활성 카드 노드를 직접 잡아 focus한다.
  const activeCardRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      activeCardRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">{title}</h2>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8 max-sm:grid-cols-1">
        {projects.map((project, index) => {
          const isActive = activeIndex === index;
          const isPlaceholder = open && isActive;
          const isReturning = !open && isActive && backdropVisible;

          return (
            <li key={project.title}>
              <ProjectCard
                key={isPlaceholder ? 'placeholder' : 'card'}
                ref={isActive ? activeCardRef : undefined}
                project={project}
                sharedId={isPlaceholder ? undefined : `${idBase}-${index}`}
                onClick={
                  isPlaceholder ? undefined : () => gallery.openAt(index)
                }
                aria-hidden={isPlaceholder || undefined}
                revealText={isReturning}
                className={cn(
                  isPlaceholder ? 'invisible' : isReturning && 'relative z-50'
                )}
              />
            </li>
          );
        })}
      </ul>

      <ProjectSheet gallery={gallery} projects={projects} />
    </Container>
  );
}
