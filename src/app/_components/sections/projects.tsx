import { Section } from '../ui/section';
import { ProjectList } from '../ui/project-list';
import { projects } from '../data/projects';

export function ProjectsSection() {
  return (
    <Section title="Projects">
      <ProjectList items={projects} />
    </Section>
  );
}
