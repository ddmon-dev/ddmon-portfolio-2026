'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { useMounted } from '@/shared/hooks/use-mounted';
import { StackBadges } from './stack-badges';
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

/**
 * 카드와 같은 `layoutId`(frame)를 공유해, 카드 → 화면 중앙 다이얼로그로 모핑되는
 * 프로젝트 상세 다이얼로그.
 *
 * 위치/크기는 CSS(중앙 정렬 flex + padding)로만 정의하고, 카드와의 차이는 motion의
 * `layout` projection(transform 기반 FLIP)이 자동 측정·보간한다. 덕분에 기존의
 * top/left/width/height 수동 측정·리사이즈 추적 로직이 전부 사라졌고, 모핑이 리플로우
 * 없이 GPU 가속 transform으로 처리된다.
 *
 * 부모(카드)가 `AnimatePresence`로 이 컴포넌트를 감싸므로, 언마운트 시 motion이
 * 카드로 되돌아가는 수축 모핑과 오버레이 페이드아웃을 자동 재생한다.
 */
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

  // 모바일(Tailwind max-sm = width < 40rem)에서는 풀스크린(반경 0), 그 외 카드형(반경 32).
  // 풀스크린 padding(max-sm:p-0)과 같은 분기점을 써서 정확히 일치시킨다.
  useEffect(() => {
    const mq = window.matchMedia('(width < 40rem)');
    const sync = () => setRadius(mq.matches ? 0 : 32);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // 마운트 동안 body 스크롤 잠금 (수축 모핑이 끝나는 언마운트 시점에 원복).
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const close = () => {
    // 스크롤이 내려가 있어도 카드(히어로)로 매끄럽게 수축하도록 상단으로 원복
    trapRef.current?.scrollTo({ top: 0 });
    onClose();
  };

  // Escape 닫기
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
        aria-label="다이얼로그 닫기 배경"
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
        className="relative z-10 size-full max-w-3xl overflow-y-auto bg-background text-foreground shadow-2xl"
      >
        <ProjectHero variant="dialog" project={project} index={index} id={id} />

        <div className="space-y-8 p-6 max-sm:p-5">
          {project.facts ? (
            <ProjectFactBox facts={project.facts} stacks={project.stacks} />
          ) : (
            <div className="space-y-3">
              <h4 className="font-secondary text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Used stack
              </h4>
              <StackBadges stacks={project.stacks} full />
            </div>
          )}

          <div className="divide-y divide-border text-ash-dark [&>section]:py-6 [&>section]:first:pt-0 [&>section]:last:pb-0">
            {project.content}
          </div>
        </div>

        <ProjectDialogNav onClose={close} />
      </motion.article>
    </div>
  );

  return createPortal(node, document.body);
}
