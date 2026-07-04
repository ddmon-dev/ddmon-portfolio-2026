import Image from 'next/image';
import { type Project } from '@/data/projects/types';
import { ProjectHeroOverlay } from './hero-overlay';

export function ProjectHero({
  project,
  index,
  variant,
}: {
  project: Project;
  index: number;
  variant: 'card' | 'detail';
}) {
  const isCard = variant === 'card';

  return (
    <div className="relative h-80 overflow-hidden">
      <div className="absolute top-0 left-[calc(50%-24rem)] h-full w-3xl max-w-none">
        <div className="relative size-full">
          <Image
            src={project.image.src.replace(/\.[^.]+$/, '.blur.webp')}
            alt=""
            width={600}
            height={Math.round(
              (600 * project.image.height) / project.image.width
            )}
            unoptimized
            className="size-full object-cover"
          />
          {!isCard && (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              priority
              sizes="(max-width: 768px) 100vw, 48rem"
              className="absolute inset-0 size-full object-cover"
            />
          )}
        </div>
      </div>

      <ProjectHeroOverlay project={project} index={index} />

      {isCard && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 inset-shadow-[0_0_24px_rgba(0,0,0,0.45)]"
        />
      )}
    </div>
  );
}
