import Link from 'next/link';
import { type Project } from './project-detail/types';
import { loadProject } from './project-detail/load-project';
import { ProjectHero } from './project-detail/hero';

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
      className="group relative block h-70 overflow-hidden rounded-4xl text-white border border-border"
    >
      <ProjectHero variant="card" project={project} index={index} />
    </Link>
  );
}
