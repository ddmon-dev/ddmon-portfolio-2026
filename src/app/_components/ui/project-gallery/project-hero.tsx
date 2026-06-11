'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { type Project } from './types';
import { ProjectHeroFace } from './project-hero-face';
import {
  PROJECT_MORPH_TRANSITION,
  projectMorphId,
  type ProjectId,
} from './morph';

/**
 * 카드/다이얼로그가 공유하는 히어로 윈도우.
 *
 * 모핑 핵심 구조(왜곡 0):
 * - 윈도우(`layoutId` hero, 전체 layout): 높이는 320(h-80)로 두 상태 모두 고정,
 *   폭만 변하므로 motion은 가로 방향으로만 스케일한다.
 * - 이미지(`layoutId` image, `layout="position"`): 종횡비가 바뀌는 박스에서도
 *   motion이 부모 스케일을 역보정하고 위치만 애니메이트한다. 크기는 snap되지만
 *   카드 이미지가 블러 처리되어 있고 공유 요소 opacity 크로스페이드로 가려지므로,
 *   object-cover 프레이밍 차이는 자연스럽게 흡수된다.
 *
 * 카드 히어로는 흐릿한 미리보기(정적 blur 12px + inset 그림자)이고,
 * 다이얼로그 히어로는 마운트되며 blur 12→0 / inset-shadow 0.45→0 을 모핑과 같은 곡선으로
 * 디샤프닝한다(닫힐 때 `exit`로 역재생). filter / box-shadow 는 비레이아웃 속성이라
 * transform projection과 충돌 없이 안전하게 트윈된다.
 *
 * 블러는 backdrop-filter 커버가 아니라 이미지 자체의 filter로 건다. 히어로 안에서
 * backdrop이 샘플링하는 대상이 사실상 이미지뿐이라 시각 결과는 같지만,
 * - backdrop-filter는 매 프레임 뒤 레이어를 재샘플링해 카드 6장 상시 합성 비용이 컸고,
 * - 모핑 중 GPU가 밀리면 프레임의 둥근 클립 갱신(메인 스레드)과 transform(컴포지터)이
 *   어긋나 히어로가 한 프레임 클립 밖으로 삐져나오는 깜빡임을 유발했다.
 * filter는 정적이면 1회 래스터로 끝나 두 문제가 모두 사라진다. 블러 엣지의 반투명 번짐
 * (반경 12px)은 이미지 박스를 윈도우보다 사방 1rem(16px) 오버사이즈해 전부 클립 밖으로
 * 보낸다. 박스는 두 상태에서 여전히 동일 크기라 모핑 불변식(왜곡 0)은 유지된다.
 */
export function ProjectHero({
  project,
  index,
  id,
  variant,
}: {
  project: Project;
  index: number;
  id: ProjectId;
  variant: 'card' | 'dialog';
}) {
  const isCard = variant === 'card';

  const image = (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      // 다이얼로그 이미지는 클릭 후 마운트라 preload가 나가지 않고 카드 로드분이
      // 캐시로 뜨므로 priority가 무의미하다. LCP 후보인 그리드 첫 행 카드에만 준다.
      priority={isCard && index < 3}
      sizes="(max-width: 640px) 100vw, 50rem"
      className={cn(
        'h-full w-full object-cover',
        isCard &&
          'blur-md transition-transform duration-500 group-hover:scale-105'
      )}
    />
  );

  return (
    <motion.div
      layoutId={projectMorphId.hero(id)}
      transition={PROJECT_MORPH_TRANSITION}
      // 다이얼로그에서는 히어로를 콘텐츠(z-auto)보다 위로 올린다(모핑 중 콘텐츠가 히어로를
      // 덮지 않도록). sticky 내비(z-10)보다는 낮게 둔다. 카드에서는 트리거 버튼
      // (absolute inset-0 z-10)을 가리지 않도록 z를 주지 않는다.
      className={cn('relative h-80 overflow-hidden', !isCard && 'z-[1]')}
    >
      <motion.div
        layoutId={projectMorphId.image(id)}
        layout="position"
        transition={PROJECT_MORPH_TRANSITION}
        // 윈도우 폭(inset-0)에 맞추면 layout="position"이 좌상단 앵커라 모핑 중 좌측
        // 클리핑이 된다. 대신 고정 크기 박스를 윈도우 중앙에 정렬하면, 박스 크기가
        // 두 상태 모두 동일해(왜곡·size-snap 0) 윈도우 중심을 추종 →
        // 카드·다이얼로그·모핑 전 구간에서 중앙 기준 대칭 클리핑이 된다.
        // 크기는 다이얼로그 최대폭(48rem)+사방 1rem — blur(12px) 엣지 번짐을 클립 밖으로.
        className="absolute -top-4 left-[calc(50%_-_25rem)] h-[calc(100%+2rem)] w-[50rem] max-w-none"
      >
        {/* 카드는 정적 blur-md, 다이얼로그는 펼침과 동기로 12→0 디샤프닝. */}
        {isCard ? (
          image
        ) : (
          <motion.div
            className="h-full w-full"
            initial={{ filter: 'blur(12px)' }}
            animate={{ filter: 'blur(0px)' }}
            exit={{ filter: 'blur(12px)' }}
            transition={PROJECT_MORPH_TRANSITION}
          >
            {image}
          </motion.div>
        )}
      </motion.div>

      <ProjectHeroFace project={project} index={index} id={id} />

      {/* 가장자리를 눌러주는 inset 그림자. 카드는 정적, 다이얼로그는 0.45→0 으로 풀린다. */}
      {isCard ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.45)]"
        />
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ boxShadow: 'inset 0 0 24px rgba(0,0,0,0.45)' }}
          animate={{ boxShadow: 'inset 0 0 24px rgba(0,0,0,0)' }}
          exit={{ boxShadow: 'inset 0 0 24px rgba(0,0,0,0.45)' }}
          transition={PROJECT_MORPH_TRANSITION}
        />
      )}
    </motion.div>
  );
}
