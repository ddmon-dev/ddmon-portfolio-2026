import { Container } from '@/shared/ui/container';
import { ECATALOG_PROJECTS, HOMEPAGE_PROJECTS } from '@/data/all-projects.data';
import { ProjectNodeMap } from './project-node-map';
import { normalizeProjects } from './project-node-map.layout';

/**
 * 150건에 가까운 프로젝트를 "다 읽어라"가 아니라 "이만큼 했다"로 어필하는 섹션.
 * 일반 목록 대신 옵시디언 그래프뷰 느낌의 노드맵으로 보여준다.
 * 노드맵을 Container 안으로 모아 밀도를 높인다.
 */

const nodes = normalizeProjects(HOMEPAGE_PROJECTS, ECATALOG_PROJECTS);

export function ProjectArchive() {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">Project Archive</h2>
      <ProjectNodeMap nodes={nodes} />
    </Container>
  );
}
