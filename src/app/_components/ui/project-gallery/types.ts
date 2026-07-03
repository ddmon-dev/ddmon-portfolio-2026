import { type ReactNode } from 'react';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectFacts = {
  period: string;
  operation: string;
  product: string;
  contribution: string;
};

export type ProjectLinks = {
  site?: string;
  repo?: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  image: ProjectImage;
  stacks: string[];
  links?: ProjectLinks;
  facts?: ProjectFacts;
  content: ReactNode;
};
