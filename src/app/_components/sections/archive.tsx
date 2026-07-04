import { Section } from '../ui/section';
import { ECATALOG_PROJECTS, HOMEPAGE_PROJECTS } from '../data/all-projects.data';
import { ArchiveWall } from '../ui/archive-wall';
import { buildThumbnails } from '../data/archive';

const items = buildThumbnails(HOMEPAGE_PROJECTS, ECATALOG_PROJECTS);

export function ArchiveSection() {
  return (
    <Section
      title="Project Archive"
      description={
        <>
          150건의 프로젝트, 클라이언트, 엣지 케이스, 트러블슈팅. <br />
          주어진 환경에서의 문제 해결, 구현에만 그치지 않는 제품의 완성. <br />
          그리고 그 다음을 위한 목표 설정과 수행.
        </>
      }
    >
      <ArchiveWall items={items} />
    </Section>
  );
}
