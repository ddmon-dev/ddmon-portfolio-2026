import Link from 'next/link';
import { type Project } from './project-detail/types';
import { loadProject } from './project-detail/load-project';
import { ProjectHero } from './project-detail/hero';

export async function ProjectGallery({ projectIds }: { projectIds: string[] }) {
  const projects = await Promise.all(projectIds.map(loadProject));

  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-8 max-sm:grid-cols-1">
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
      href={`/projects/${project.id}`}
      scroll={false}
      aria-label={`${project.title} 상세 보기`}
      data-project-card={project.id}
      className="relative block h-80 overflow-hidden rounded-[28px] bg-ash-950 text-white shadow-sm outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <ProjectHero variant="card" project={project} index={index} />
    </Link>
  );
}
