import { Container } from '@/shared/ui/container';
import { ECATALOG_PROJECTS, HOMEPAGE_PROJECTS } from '@/data/all-projects.data';
import { ProjectMosaic } from './project-node-map';
import { generateVoronoi } from './project-node-map.layout';

/**
 * 150건에 가까운 프로젝트를 "다 읽어라"가 아니라 "이만큼 했다"로 어필하는 섹션.
 * 영역을 보로노이 셀로 빈틈없이 쪼갠 모자이크로 밀도와 양감을 보여준다.
 */

const cells = generateVoronoi(HOMEPAGE_PROJECTS, ECATALOG_PROJECTS);

export function ProjectArchive() {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">Project Archive</h2>
      <ProjectMosaic cells={cells} />
    </Container>
  );
}
