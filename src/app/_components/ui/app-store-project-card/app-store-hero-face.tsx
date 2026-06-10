import { StackBadges } from '../project-card/stack-badges';
import { type Project } from '../project-card/types';

/**
 * 카드와 모달 히어로가 공유하는 단일 "히어로 페이스".
 * 두 곳에서 동일한 스타일/레이아웃을 보장해 카드 → 모달 확장이 자연스럽게 이어진다.
 * 부모(카드 article / 모달 히어로 래퍼)가 높이와 배경 이미지를 제공하고, 이 컴포넌트는
 * 그 위에 그라데이션 + 콘텐츠 오버레이를 absolute로 채우기만 한다.
 */
export function AppStoreHeroFace({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/10 to-black/78" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
        <div className="font-secondary text-[0.7rem] font-semibold tracking-[0.18em] text-white/78 uppercase">
          {String(index + 1).padStart(2, '0')} Featured Project
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl leading-tight font-bold">
              {project.title}
            </h3>
            <p className="text-sm text-white/78">{project.category}</p>
          </div>
          <StackBadges stacks={project.stacks} className="justify-start" />
        </div>
      </div>
    </>
  );
}
