import { Section } from '../ui/section';
import { ProjectGallery } from '../ui/project-gallery';
import { selectedProjects } from '../data/selected-projects';

export function SelectedProjectsSection() {
  return (
    <Section
      title="Selected Projects"
      description="프론트엔드에만 국한되지 않는, 제품 지향 개발을 합니다."
    >
      <ProjectGallery projectIds={selectedProjects} />
    </Section>
  );
}
