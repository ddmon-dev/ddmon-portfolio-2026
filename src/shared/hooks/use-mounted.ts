'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * 클라이언트 마운트 이후에만 `true`를 반환한다.
 *
 * SSR(서버 스냅샷 false)과 하이드레이션 첫 렌더가 동일하게 false라서
 * 하이드레이션 미스매치 없이 "클라 전용" 분기를 만들 수 있다.
 * createPortal처럼 `document`/`window`에 의존하는 렌더를 SSR에서 가드할 때 쓴다.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
