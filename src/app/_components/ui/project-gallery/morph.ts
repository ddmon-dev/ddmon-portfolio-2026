import { type Transition } from 'motion/react';

export const PROJECT_MORPH_TRANSITION: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

export const projectMorphId = {
  frame: (id: string) => `project-frame-${id}`,
  hero: (id: string) => `project-hero-${id}`,
  image: (id: string) => `project-image-${id}`,
  num: (id: string) => `project-num-${id}`,
  title: (id: string) => `project-title-${id}`,
};
