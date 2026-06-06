import { type ReactNode } from 'react';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  title: string;
  category: string;
  image: ProjectImage;
  skills: string[];
  content: ReactNode;
};
