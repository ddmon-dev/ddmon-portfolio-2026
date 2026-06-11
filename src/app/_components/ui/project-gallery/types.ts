import { type ReactNode } from 'react';

export type ProjectImage = {
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
