import {
  ProjectGallery,
  ProjectDetail,
  type Project,
} from './ui/project-gallery';
import { majorProjects, systemsProjects } from './projects.data';

type ProjectMeta = Omit<Project, 'content'>;

function withDetail(metas: ProjectMeta[]): Project[] {
  return metas.map(meta => ({
    ...meta,
    content: <ProjectDetail slug={meta.slug} />,
  }));
}

export function SelectedProjectsSection() {
  return (
    <ProjectGallery
      title="주요 프로젝트"
      projects={withDetail(majorProjects)}
    />
  );
}

export function SystemsAndTemplatesSection() {
  return (
    <ProjectGallery
      title="Systems & Templates"
      projects={withDetail(systemsProjects)}
    />
  );
}
