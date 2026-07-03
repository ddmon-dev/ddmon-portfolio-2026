import { Section } from '../ui/section';
import { ProjectGallery } from '../ui/project-gallery';
import { majorProjects } from '../data/projects';

export function SelectedProjectsSection() {
  return (
    <Section title="주요 프로젝트">
      <ProjectGallery projectIds={majorProjects} />
    </Section>
  );
}
