import Image from 'next/image';
import { type Project } from './types';

export function ProjectHero({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="relative h-full overflow-hidden">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 48rem"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
        <div className="font-secondary text-7xl font-bold text-white/10 -translate-y-3 -translate-x-2 mix-blend-plus-lighter">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="space-y-1.5 pb-2">
          <h3 className="text-3xl leading-tight font-bold max-sm:text-2xl">
            {project.title}
          </h3>
          <p className="text-base">{project.category}</p>
        </div>
      </div>
    </div>
  );
}
