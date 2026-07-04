import Image from 'next/image';
import { StackChips } from '@/shared/ui/stack-badges';
import { type Project } from './types';

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
      <Image
        src={
          isCard
            ? project.image.src.replace(/\.[^.]+$/, '.blur.webp')
            : project.image.src
        }
        alt={isCard ? '' : project.image.alt}
        fill
        unoptimized={isCard}
        priority={!isCard}
        sizes={isCard ? undefined : '(max-width: 768px) 100vw, 48rem'}
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/0 to-black/95" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
        <div className="font-secondary text-7xl font-bold text-white/20 -translate-y-3 -translate-x-2">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-2xl leading-tight font-bold">
              {project.title}
            </h3>
            <p className="text-sm text-white/78">{project.category}</p>
          </div>
          <StackChips stacks={project.stacks} className="justify-start" />
        </div>
      </div>

      {isCard && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 inset-shadow-[0_0_24px_rgba(0,0,0,0.45)]"
        />
      )}
    </div>
  );
}
