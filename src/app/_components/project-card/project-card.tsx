'use client';

import { type ReactNode } from 'react';
import { cn } from '@/shared/utils/classnames';
import { CardFace, type ProjectImage } from './card-face';
import { ProjectSheet } from './project-sheet';
import { useCardSheet } from './use-card-sheet';

type ProjectCardProps = {
  title: string;
  category: string;
  image: ProjectImage;
  skills: string[];
  /** 시트에 펼쳐질 상세 본문. 호출부에서 DetailSection 등으로 하드코딩한다. */
  children: ReactNode;
};

/**
 * 클릭하면 카드가 풀페이지 상세로 확장되는 프로젝트 카드.
 * motion의 layoutId 공유 레이아웃으로 카드 ↔ 상세 시트 사이를 morph한다.
 *
 * 역할 분담:
 * - useCardSheet : 전환 상태와 타이밍(open/backdrop/expanded)
 * - CardFace     : 그리드 카드 표면(과 자리 유지용 placeholder)
 * - ProjectSheet : 펼쳐진 상세(배경 + 흰 시트 + 뒤로 버튼)
 */
export function ProjectCard({
  title,
  category,
  image,
  skills,
  children,
}: ProjectCardProps) {
  const sheet = useCardSheet();
  const face = { title, category, image, skills };

  return (
    <>
      {/*
        닫힘: 공유 id를 가진 실제 카드. 열리면 이 카드를 언마운트하고, 같은 마크업의
        invisible 사본(id 없음)만 남겨 그리드 자리를 유지한다 — 같은 layoutId가 동시에
        둘 존재하지 않아야 시트가 카드 위치에서 정확히 morph한다(shared element 정석).
      */}
      {sheet.open ? (
        <div aria-hidden className="invisible">
          <CardFace {...face} />
        </div>
      ) : (
        <CardFace
          sharedId={sheet.id}
          onClick={sheet.openSheet}
          // 닫는 동안(backdrop 페이드아웃 내내) 이 카드를 backdrop(z-40) 위로 올려
          // 흰 배경에 가려지지 않게 한다. backdrop exit 완료 시 z-index 원복.
          className={cn(sheet.backdropVisible && 'relative z-50')}
          {...face}
        />
      )}

      <ProjectSheet sheet={sheet} {...face}>
        {children}
      </ProjectSheet>
    </>
  );
}
