'use client';

import { motion } from 'motion/react';
import { StackChips } from './stack-badges';
import { type Project } from './types';
import {
  PROJECT_MORPH_TRANSITION,
  projectMorphId,
  type ProjectId,
} from './morph';

export function ProjectHeroFace({
  project,
  index,
  id,
}: {
  project: Project;
  index: number;
  id: ProjectId;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/0 to-black/95" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
        <motion.div
          layoutId={projectMorphId.num(id)}
          layout="position"
          transition={PROJECT_MORPH_TRANSITION}
          className="font-secondary text-7xl font-bold text-white/20 -translate-y-3 -translate-x-2"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        <motion.div
          layoutId={projectMorphId.title(id)}
          layout="position"
          transition={PROJECT_MORPH_TRANSITION}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <h3 className="text-2xl leading-tight font-bold">
              {project.title}
            </h3>
            <p className="text-sm text-white/78">{project.category}</p>
          </div>
          <StackChips stacks={project.stacks} className="justify-start" />
        </motion.div>
      </div>
    </>
  );
}
