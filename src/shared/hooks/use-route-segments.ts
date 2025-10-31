'use client';

import { usePathname } from 'next/navigation';

/**
 * URL 경로를 세그먼트로 분할하여 반환 (언어 세그먼트 제외)
 *
 * @example
 * // URL: /ko/product/category-1/item
 * const { segments } = useRouteSegments();
 * // ['product', 'category-1', 'item']
 */
export function useRouteSegments() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean).slice(1);

  return { segments };
}
