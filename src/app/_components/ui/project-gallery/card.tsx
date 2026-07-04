import Link from 'next/link';
import { type Project } from '@/data/projects/types';
import { ProjectHero } from './hero';

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      scroll={false}
      aria-label={`${project.title} 상세 보기`}
      data-project-card={project.id}
      className="group relative block h-80 overflow-hidden rounded-[28px] bg-ash-950 text-white shadow-sm outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <ProjectHero variant="card" project={project} index={index} />
    </Link>
  );
}
