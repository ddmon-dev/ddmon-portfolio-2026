'use client';

import { useEffect, useState } from 'react';

export type SheetPhase = 'closed' | 'opened' | 'closing';

/**
 * 카드 한 장이 소유하는 상세 시트의 생명주기.
 *
 * - closed:  그리드 카드만. 시트/백드롭 없음.
 * - opened:  시트 표시(여는 morph 포함). 카드는 placeholder로 자리만 지키고 이미지 layoutId를 시트에 양보한다.
 * - closing: 닫는 중. 시트는 사라지고 카드가 backdrop 위로 떠 이미지가 morph-back 한다.
 *            백드롭 페이드아웃이 끝나면(finishClosing) closed로 돌아간다.
 */
export function useProjectSheet() {
  const [phase, setPhase] = useState<SheetPhase>('closed');

  const openSheet = () => setPhase('opened');
  const close = () => setPhase('closing');
  const finishClosing = () =>
    setPhase(current => (current === 'closing' ? 'closed' : current));

  // 시트가 떠 있는(open) 동안 body 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (phase !== 'opened') return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPhase('closing');
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase]);

  return { phase, openSheet, close, finishClosing };
}

export type ProjectSheetState = ReturnType<typeof useProjectSheet>;
