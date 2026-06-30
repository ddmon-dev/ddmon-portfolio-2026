import { type Transition } from 'motion/react';

export const PROJECT_MORPH_TRANSITION: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

export type ProjectId = string;

export const projectMorphId = {
  frame: (id: ProjectId) => `project-frame-${id}`,
  hero: (id: ProjectId) => `project-hero-${id}`,
  image: (id: ProjectId) => `project-image-${id}`,
  num: (id: ProjectId) => `project-num-${id}`,
  title: (id: ProjectId) => `project-title-${id}`,
};
