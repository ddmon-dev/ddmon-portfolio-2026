import {
  ProjectGallery,
  ProjectDetailContent,
  type Project,
} from './ui/project-gallery';
import { majorProjects, systemsProjects } from './projects.data';
import { parseProjectMarkdown } from './ui/project-gallery/project-markdown.mjs';

type ProjectMeta = Omit<Project, 'content'>;

async function loadProjectMarkdown(slug: string) {
  const { default: markdown } = await import(`@/data/projects/${slug}.md`);
  return parseProjectMarkdown(markdown);
}

async function withDetail(metas: ProjectMeta[]): Promise<Project[]> {
  return Promise.all(
    metas.map(async meta => {
      const { body, facts } = await loadProjectMarkdown(meta.slug);

      return {
        ...meta,
        facts: facts ?? meta.facts,
        content: <ProjectDetailContent markdown={body} />,
      };
    })
  );
}

export async function SelectedProjectsSection() {
  return (
    <ProjectGallery
      title="주요 프로젝트"
      projects={await withDetail(majorProjects)}
    />
  );
}

export async function SystemsAndTemplatesSection() {
  return (
    <ProjectGallery
      title="Systems & Templates"
      projects={await withDetail(systemsProjects)}
    />
  );
}
