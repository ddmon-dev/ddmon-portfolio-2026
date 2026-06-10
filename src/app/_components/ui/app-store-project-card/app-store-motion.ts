import { type Transition } from 'motion/react';

/**
 * 카드 → 모달 모핑 공통 설정.
 *
 * 기존 CSS transition(top/left/width/height) 기반 모핑은 리플로우를 유발했다.
 * 이를 motion의 `layout`/`layoutId` projection(transform 기반 FLIP)으로 대체했다.
 * 카드↔모달 모핑 전체(프레임·히어로·이미지·텍스트·블러·그림자)를 구동하는 단일
 * 트랜지션이며, 타이밍/이징은 여기 한 곳에서 조정한다.
 */
export const APP_STORE_LAYOUT_TRANSITION: Transition = {
  // 빠르게 출발 → 느리게 도착 (easeOutQuint)
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
  // 이전: easeInOutExpo (초반 천천히 → 중반 급가속 → 후반 안착)
  // ease: [0.87, 0, 0.13, 1],
};

export type AppStoreId = string | number;

/**
 * 카드와 모달이 공유하는 layoutId 모음.
 * 같은 `id`를 쓰는 카드/모달의 동일 요소끼리 하나의 연속된 요소로 모핑된다.
 * - frame: 모핑하는 시각적 박스(전체 layout) — border-radius 자동 보정
 * - hero: 높이 고정(320) 히어로 윈도우(전체 layout) — 가로만 스케일
 * - image: 히어로 이미지(layout="position") — 종횡비 왜곡 0
 * - eyebrow / title: 히어로 텍스트(layout="position") — 텍스트 왜곡 0
 */
export const appStoreLayoutId = {
  frame: (id: AppStoreId) => `asc-frame-${id}`,
  hero: (id: AppStoreId) => `asc-hero-${id}`,
  image: (id: AppStoreId) => `asc-image-${id}`,
  eyebrow: (id: AppStoreId) => `asc-eyebrow-${id}`,
  title: (id: AppStoreId) => `asc-title-${id}`,
};
