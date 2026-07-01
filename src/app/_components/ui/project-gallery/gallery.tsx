import { Container } from '@/shared/ui/container';
import { ProjectCard } from './card';
import { ProjectDetailBody } from './detail-body';
import { parseProjectMarkdown } from './parse-markdown.mjs';
import { type Project } from './types';

async function loadProject(slug: string): Promise<Project> {
  const { default: markdown } = await import(`@/data/projects/${slug}.md`);
  const { meta, body } = parseProjectMarkdown(markdown);

  return { slug, ...meta, content: <ProjectDetailBody markdown={body} /> };
}

export async function ProjectGallery({
  title,
  slugs,
}: {
  title: string;
  slugs: string[];
}) {
  const projects = await Promise.all(slugs.map(loadProject));

  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">{title}</h2>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8 max-sm:grid-cols-1">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
