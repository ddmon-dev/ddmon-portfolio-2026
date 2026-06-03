'use client';

import { useEffect, useId, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * 카드 ↔ 상세 시트 전환의 상태와 타이밍을 한곳에 캡슐화한다.
 * ProjectCard 본문이 이 의도를 알 필요 없이 조립만 하도록 만드는 것이 목적이다.
 *
 * - open: 시트(상세) 표시 여부. 스크롤 잠금/ESC 닫기의 기준.
 * - backdropVisible: 흰 배경 레이어 표시 여부. 닫을 때는 카드가 그리드로 돌아온 뒤에
 *   끄며, 그동안 선택된 카드를 backdrop(z-40) 위(z-50)로 올려 가려지지 않게 한다.
 * - expanded: 카드 → 시트 morph가 끝났는지. true가 되면 시트 본문을 페이드인한다.
 */
export function useCardSheet() {
  const [open, setOpen] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const reduceMotion = useReducedMotion();

  const openSheet = () => {
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
    backdropVisible,
    expanded,
    id,
    reduceMotion,
    openSheet,
    close,
    /** backdrop 페이드아웃이 끝난 뒤 카드 z-index를 원복한다. */
    onBackdropExitComplete: () => setBackdropVisible(false),
    /** 카드 → 시트 morph가 끝나면 본문 페이드인을 트리거한다. */
    onSheetMorphComplete: () => setExpanded(true),
  };
}

export type CardSheet = ReturnType<typeof useCardSheet>;
