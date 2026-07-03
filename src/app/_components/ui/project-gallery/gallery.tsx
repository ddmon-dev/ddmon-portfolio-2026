import { ProjectCard } from './card';
import { ProjectDetailBody } from './detail-body';
import { parseProjectMarkdown } from './parse-markdown';
import { type Project } from './types';

async function loadProject(projectId: string): Promise<Project> {
  const { default: markdown } = await import(`@/data/projects/${projectId}.md`);
  const { meta, body } = parseProjectMarkdown(markdown);

  return {
    ...meta,
    id: projectId,
    content: <ProjectDetailBody markdown={body} />,
  };
}

export async function ProjectGallery({ projectIds }: { projectIds: string[] }) {
  const parsedProjects = await Promise.all(projectIds.map(loadProject));

  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-8 max-sm:grid-cols-1">
      {parsedProjects.map((project, index) => (
        <li key={project.id}>
          <ProjectCard project={project} index={index} />
        </li>
      ))}
    </ul>
  );
}
