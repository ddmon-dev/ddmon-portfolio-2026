import { loadProject } from '@/data/projects/load-project';
import { ProjectCard } from './card';

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
