import { Container } from '@/shared/ui/container';
import { ProjectCard } from './project-card';
import { type Project } from './types';

export function ProjectGallery({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">{title}</h2>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8 max-sm:grid-cols-1">
        {projects.map(project => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
