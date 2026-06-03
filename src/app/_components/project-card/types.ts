import { type ReactNode } from 'react';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * 갤러리 한 칸의 프로젝트. 카드 표면에 쓰는 메타(title/category/image/skills)와
 * 시트에 펼쳐질 상세 본문(content)을 함께 들고 있다.
 * content는 호출부에서 DetailSection 등으로 작성한 JSX를 그대로 받는다.
 */
export type Project = {
  title: string;
  category: string;
  image: ProjectImage;
  skills: string[];
  content: ReactNode;
};
