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

/**
 * 모달 포커스 트랩. active인 동안 Tab 포커스를 container 안에 가둔다.
 * - 활성화 시: container 안 [data-autofocus] 요소(없으면 첫 포커스 요소)로 이동.
 * - Tab / Shift+Tab: 경계에서 순환시켜 시트 밖으로 못 나가게 한다.
 *
 * 트리거로의 포커스 복귀는 호출부(갤러리)가 처리한다 — 트리거 카드가 placeholder
 * 전환으로 remount되어, 여기서 저장한 element 참조는 곧 detached되기 때문이다.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    // fixed 요소(offsetParent=null)도 포함하도록 getClientRects로 가시성을 본다.
    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter(el => el.getClientRects().length > 0);

    const initial =
      container.querySelector<HTMLElement>('[data-autofocus]') ??
      getFocusable()[0];
    initial?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey) {
        if (current === first || !container.contains(current)) {
          event.preventDefault();
          last.focus();
        }
      } else if (current === last || !container.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, containerRef]);
}
