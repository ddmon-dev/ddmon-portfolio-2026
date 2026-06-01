import { Container } from '@/shared/ui/container';

/**
 * 아카이브 섹션은 전체 프로젝트를 모두 보여줄 필요는 없음.
 * '더 보기' 등을 트리거 하면 다 보여주고, 기본적으로는 많아보이는 정도로만.
 * 옵시디언 노드뷰처럼 보여주고 마우스 인터렉션을 넣는것도 좋을 것 같음.
 */

export function ProjectArchive() {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">Project Archive</h2>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8"></ul>
    </Container>
  );
}
