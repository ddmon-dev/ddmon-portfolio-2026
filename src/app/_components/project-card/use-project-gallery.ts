'use client';

import { useEffect, useId, useState } from 'react';

/**
 * 프로젝트 갤러리(그리드 + 단일 상세 시트)의 상태·타이밍을 캡슐화한다.
 * 시트 상태를 목록 레벨(갤러리)에서 쥐어, 연 카드로 정확히 morph해 열고 닫는다.
 *
 * - open: 시트 표시 여부. 스크롤 잠금/ESC 닫기의 기준.
 * - activeIndex: 현재 펼쳐진 프로젝트. placeholder 카드/닫힘 morph 타겟의 기준.
 * - backdropVisible: 흰 배경 레이어 표시 여부. 닫을 때는 카드가 그리드로 돌아온 뒤 끈다.
 * - expanded: 최초 열기 morph가 끝났는지. true면 시트 본문을 페이드인한다.
 */
export function useProjectGallery() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const idBase = useId();

  const openAt = (index: number) => {
    setActiveIndex(index);
    setExpanded(false);
    setBackdropVisible(true);
    setOpen(true);
  };

  const close = () => setOpen(false);

  // 모달이 열려 있는 동안 body 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return {
    open,
    activeIndex,
    backdropVisible,
    expanded,
    idBase,
    openAt,
    close,
    /** backdrop 페이드아웃이 끝난 뒤 카드 z-index를 원복한다. */
    onBackdropExitComplete: () => setBackdropVisible(false),
    /** 최초 열기 morph가 끝나면 본문 페이드인을 트리거한다. */
    onMorphComplete: () => setExpanded(true),
  };
}

export type ProjectGallery = ReturnType<typeof useProjectGallery>;
