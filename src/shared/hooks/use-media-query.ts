'use client';

import { useEffect, useState } from 'react';

/**
 * 브라우저의 미디어 쿼리를 감지하는 React Hook
 * SSR 안전성을 보장하며 실시간으로 화면 크기 변화를 감지합니다.
 * 
 * @param query - CSS 미디어 쿼리 문자열 (예: '(max-width: 768px)')
 * @returns 미디어 쿼리 조건에 맞는지 여부
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // 브라우저 환경이 아닌 경우 (SSR) false 반환
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // 초기값 설정
    setMatches(mediaQuery.matches);

    // 미디어 쿼리 변화 감지 핸들러
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 이벤트 리스너 등록
    // addEventListener가 지원되는 경우 사용, 아니면 addListener 사용 (구버전 브라우저 호환성)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    // 클린업 함수
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}

/**
 * 일반적인 브레이크포인트들을 제공하는 유틸리티 훅들
 */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsSmallScreen = () => useMediaQuery('(max-width: 1023px)');