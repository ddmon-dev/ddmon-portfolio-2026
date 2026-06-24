import { Container } from '@/shared/ui/container';
import { ECATALOG_PROJECTS, HOMEPAGE_PROJECTS } from '@/data/all-projects.data';
import { ProjectThumbnailWall } from './ui/project-thumbnail-wall';
import { buildThumbnails } from './ui/project-thumbnail-wall.data';

/**
 * 150건에 가까운 프로젝트를 "다 읽어라"가 아니라 "이만큼 했다"로 어필하는 섹션.
 * 실제 사이트 스크린샷을 빽빽한 썸네일 월로 보여준다.
 */

const items = buildThumbnails(HOMEPAGE_PROJECTS, ECATALOG_PROJECTS);

export function ProjectArchiveSection() {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">Project Archive</h2>
      <ProjectThumbnailWall items={items} />
    </Container>
  );
}
