import { Section } from '../ui/section';
import { ProjectGallery } from '../ui/project-gallery';
import { caseStudies } from '../data/case-study';

export function CaseStudySection() {
  return (
    <Section
      title="Case Study"
      description="프론트엔드에만 국한되지 않는, 제품 지향 개발을 합니다."
    >
      <ProjectGallery projectIds={caseStudies} />
    </Section>
  );
}
