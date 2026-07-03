import { Section } from '../ui/section';
import { ProjectList } from '../ui/project-list';
import { otherProjects } from '../data/other-projects';

export function CurrentProjectsSection() {
  return (
    <Section title="기타 프로젝트">
      <ProjectList items={otherProjects} />
    </Section>
  );
}
