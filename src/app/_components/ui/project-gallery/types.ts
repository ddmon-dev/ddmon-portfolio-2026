import { type ReactNode } from 'react';

export type ProjectImage = {
  /**
   * `public/projects/` 안의 이미지 경로. 같은 자리에 사전 블러 썸네일
   * `<이름>.blur.webp`가 있다고 전제한다 (predev/prebuild 훅의
   * scripts/blur-project-images.mjs가 자동 생성).
   */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * 상세 다이얼로그 최상단 팩트 박스의 구조화 메타.
 * 필드 구성은 `docs/project-detail-structure.md`의 팩트 박스 섹션을 따른다.
 */
export type ProjectFacts = {
  /** 수행 기간. 예: '2024.06 – 2024.09 (4개월)' */
  period: string;
  /** 실사용·운영 근거. 예: '2년 운영 · 72개 시공점 사용' */
  operation: string;
  /** 프로젝트 형태. 예: 'Brand Site · OMS · Admin' */
  product: string;
  /** 간결한 기여 범위. 예: 'PM 보조 · FE 단독 구현 · 배포/운영 대응' */
  contribution: string;
};

/**
 * 프로젝트의 외부 링크. 값이 있는 것만 다이얼로그 하단 내비게이션 버튼으로 렌더한다.
 * `site`는 팩트 박스의 URL 행과 nav "Visit Site"가 공유하는 단일 소스다.
 */
export type ProjectLinks = {
  /** 공개 운영 URL (https 포함 전체 주소) */
  site?: string;
  /** 공개 저장소 URL (https 포함 전체 주소) */
  repo?: string;
};

export type Project = {
  /** 모핑 layoutId의 식별자. 갤러리가 여러 개여도 전역에서 유일해야 한다. */
  slug: string;
  title: string;
  category: string;
  image: ProjectImage;
  stacks: string[];
  links?: ProjectLinks;
  /** 있으면 다이얼로그의 Used stack 블록 대신 팩트 박스를 렌더한다. */
  facts?: ProjectFacts;
  content: ReactNode;
};
