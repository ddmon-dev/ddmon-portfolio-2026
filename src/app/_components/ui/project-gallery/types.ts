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

export type Project = {
  /** 모핑 layoutId의 식별자. 갤러리가 여러 개여도 전역에서 유일해야 한다. */
  slug: string;
  title: string;
  category: string;
  image: ProjectImage;
  stacks: string[];
  content: ReactNode;
};
