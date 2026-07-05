import Image from 'next/image';
import { cn } from '@/shared/utils/classnames';
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
    <div className="relative h-full overflow-hidden">
      <Image
        src={project.image.src}
        alt={isCard ? '' : project.image.alt}
        fill
        priority={!isCard}
        sizes={
          isCard
            ? '(max-width: 640px) 100vw, 33vw'
            : '(max-width: 768px) 100vw, 48rem'
        }
        className={cn(
          'object-cover',
          isCard && 'group-hover:scale-110 transition-transform duration-500'
        )}
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
        <div className="font-secondary text-7xl font-bold text-white/10 -translate-y-3 -translate-x-2 mix-blend-plus-lighter">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-2xl leading-tight font-bold">
              {project.title}
            </h3>
            <p className="text-sm text-white">{project.category}</p>
          </div>
          <StackChips stacks={project.stacks} className="justify-start" />
        </div>
      </div>
    </div>
  );
}
