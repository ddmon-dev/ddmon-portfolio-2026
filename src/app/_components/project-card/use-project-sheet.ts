'use client';

import { useEffect, useState } from 'react';

/**
 * 카드 한 장이 소유하는 상세 시트의 상태·타이밍.
 *
 * - open: 시트 표시 여부. scroll-lock/ESC의 기준.
 * - backdropVisible: 닫는 동안 카드를 backdrop 위로 승격해 morph를 디밍 없이 보이기 위한 플래그.
 * - expanded: 이미지 morph 완료 여부. true면 헤더/본문 페이드인.
 */
export function useProjectSheet() {
  const [open, setOpen] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const openSheet = () => {
    setExpanded(false);
    setBackdropVisible(true);
    setOpen(true);
  };

  const close = () => setOpen(false);

  // 시트가 열린 동안 body 스크롤 잠금 + ESC 닫기
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
    backdropVisible,
    expanded,
    openSheet,
    close,
    /** backdrop 페이드아웃이 끝난 뒤 카드 z 승격을 원복. */
    onBackdropExitComplete: () => setBackdropVisible(false),
    /** 이미지 morph가 끝나면 헤더/본문 페이드인 트리거. */
    onMorphComplete: () => setExpanded(true),
  };
}

export type ProjectSheetState = ReturnType<typeof useProjectSheet>;
