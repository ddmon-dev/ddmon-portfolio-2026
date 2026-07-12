import { Section } from '../ui/section';
import { ProjectList } from '../ui/project-list';
import { projects } from '../data/projects';

export function ProjectsSection() {
  return (
    <Section
      title="Projects"
      description="다양한 클라이언트 요구사항을 제품으로 구현합니다."
    >
      <ProjectList items={projects} />
    </Section>
  );
}
