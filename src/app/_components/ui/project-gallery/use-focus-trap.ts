'use client';

import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useFocusTrap(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter(el => el.getClientRects().length > 0);

    // 명시적 대상([data-autofocus])이 있으면 그곳, 없으면 다이얼로그 컨테이너 자체에
    // 포커스한다. 읽는 콘텐츠 위주 다이얼로그는 상단 컨테이너에 포커스해야 스크린리더가
    // 제목(aria-label)부터 읽고, 하단 액션으로 점프해 상단이 밀리는 일이 없다(WAI-ARIA APG).
    const initial =
      container.querySelector<HTMLElement>('[data-autofocus]') ?? container;
    initial.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      // 컨테이너 자신(tabindex=-1, 초기 포커스 대상)도 "바깥"으로 취급한다. 그렇지
      // 않으면 컨테이너에서 Shift+Tab 시 트랩이 통과시켜 포커스가 body로 빠져나간다
      // (container.contains(container)는 true라 경계 검사에 걸리지 않기 때문).
      const outside = current === container || !container.contains(current);

      if (event.shiftKey) {
        if (current === first || outside) {
          event.preventDefault();
          last.focus();
        }
      } else if (current === last || outside) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [containerRef]);
}
