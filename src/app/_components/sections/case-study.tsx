import { Section } from '../ui/section';
import { ProjectGallery } from '../ui/project-gallery';
import { caseStudies } from '../data/case-study';

export function CaseStudySection() {
  return (
    <Section title="Case Study">
      <ProjectGallery projectIds={caseStudies} />
    </Section>
  );
}
