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
 * 시트를 목록 레벨에서 한 개만 두어, 열린 상태로 이전/다음 프로젝트를 탐색한다.
 *
 * 역할 분담:
 * - useProjectGallery : 전환 상태와 타이밍(open/active/expanded/sliding)
 * - ProjectCard       : 그리드 카드(과 활성 카드의 자리 유지용 placeholder)
 * - ProjectSheet      : 펼쳐진 상세(배경 + 슬라이드 패널 + 네비게이션)
 *
 * 카드 클릭 → 그 자리에서 시트로 morph. 시트 안에서 이전/다음으로 좌우 슬라이드.
 * 닫으면 현재 보고 있는 프로젝트의 카드 자리로 morph해 돌아온다(placeholder = 활성 카드).
 */
export function ProjectGallery({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  const gallery = useProjectGallery(projects.length);
  const { open, activeIndex, backdropVisible, idBase } = gallery;

  // 닫힐 때 트리거(현재 활성 카드)로 포커스를 되돌린다. 카드는 placeholder 전환으로
  // remount되므로 저장된 참조가 아니라 remount된 활성 카드 노드를 직접 잡아 focus한다.
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
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8">
        {projects.map((project, index) => {
          const isActive = activeIndex === index;
          const isPlaceholder = open && isActive;

          return (
            <li key={project.title}>
              <ProjectCard
                key={isPlaceholder ? 'placeholder' : 'card'}
                ref={isActive ? activeCardRef : undefined}
                project={project}
                sharedId={isPlaceholder ? undefined : `${idBase}-${index}`}
                onClick={isPlaceholder ? undefined : () => gallery.openAt(index)}
                aria-hidden={isPlaceholder || undefined}
                className={cn(
                  isPlaceholder
                    ? 'invisible'
                    : isActive && backdropVisible && 'relative z-50'
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
