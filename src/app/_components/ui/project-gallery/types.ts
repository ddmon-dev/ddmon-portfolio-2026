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
  /** 팀 구성과 기여 경계. 예: '디자이너 1명 협업 · 개발 단독' */
  team: string;
  /** 담당 범위 (Role 섹션 대체) */
  scope: string;
  /** 공개 운영 URL (https 포함 전체 주소, 없으면 생략) */
  url?: string;
  /** 운영 상태. 예: '운영 중 · 유지보수 지속' */
  status: string;
};

export type Project = {
  /** 모핑 layoutId의 식별자. 갤러리가 여러 개여도 전역에서 유일해야 한다. */
  slug: string;
  title: string;
  category: string;
  image: ProjectImage;
  stacks: string[];
  /** 있으면 다이얼로그의 Used stack 블록 대신 팩트 박스를 렌더한다. */
  facts?: ProjectFacts;
  content: ReactNode;
};
