import { Container } from '@/shared/ui/container';
import { ECATALOG_PROJECTS, HOMEPAGE_PROJECTS } from '@/data/all-projects.data';
import { ProjectThumbnailWall } from './ui/project-thumbnail-wall';
import { buildThumbnails } from './ui/project-thumbnail-wall.data';

const items = buildThumbnails(HOMEPAGE_PROJECTS, ECATALOG_PROJECTS);

export function ProjectArchiveSection() {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">Project Archive</h2>
      <ProjectThumbnailWall items={items} />
    </Container>
  );
}
