'use client';

import { useEffect, useState } from 'react';

export type SheetPhase = 'closed' | 'opened' | 'closing';

export function useProjectSheet() {
  const [phase, setPhase] = useState<SheetPhase>('closed');

  const openSheet = () => setPhase('opened');
  const close = () => setPhase('closing');
  const finishClosing = () =>
    setPhase(current => (current === 'closing' ? 'closed' : current));

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
