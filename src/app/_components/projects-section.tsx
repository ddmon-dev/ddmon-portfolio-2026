import { ProjectGallery } from './ui/project-gallery';
import { majorProjectSlugs } from './projects.data';

export function SelectedProjectsSection() {
  return <ProjectGallery title="주요 프로젝트" slugs={majorProjectSlugs} />;
}
