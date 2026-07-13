import Link from 'next/link';
import Image from 'next/image';
import { StackChips } from '@/shared/ui/stack-badges';
import { type Project } from './project-detail/types';
import { loadProject } from './project-detail/load-project';

export async function ProjectGallery({ projectIds }: { projectIds: string[] }) {
  const projects = await Promise.all(projectIds.map(loadProject));

  return (
    <ul className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-lg:gap-3 max-sm:grid-cols-1 max-sm:gap-2">
      {projects.map((project, index) => (
        <li key={project.id}>
          <ProjectCard project={project} index={index} />
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/case-study/${project.id}`}
      scroll={false}
      aria-label={`${project.title} 상세 보기`}
      data-project-card={project.id}
      className="group relative block h-70 overflow-hidden rounded-4xl text-white border border-border max-sm:rounded-4xl max-sm:h-auto max-sm:aspect-16/10"
    >
      <Image
        src={project.image.src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="font-secondary text-7xl font-bold text-white/10 -translate-y-3 -translate-x-2 mix-blend-plus-lighter max-sm:text-5xl">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-2xl leading-tight font-bold max-sm:text-xl">
              {project.title}
            </h3>
            <p className="text-sm">{project.category}</p>
          </div>
          <StackChips stacks={project.stacks} className="justify-start" />
        </div>
      </div>
    </Link>
  );
}
