import { Container } from '@/shared/ui/container';
import { otherProjects } from './projects.data';
import { OtherProjectList } from './ui/other-project-list';

export function OtherProjectsSection() {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">기타 프로젝트</h2>
      <OtherProjectList items={otherProjects} />
    </Container>
  );
}
