import { type ReactNode } from 'react';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug?: string;
  title: string;
  category: string;
  image: ProjectImage;
  stacks: string[];
  content: ReactNode;
};
