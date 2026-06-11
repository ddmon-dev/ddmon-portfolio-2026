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
 *   카드가 블러 레이어로 덮여 있고 공유 요소 opacity 크로스페이드로 가려지므로,
 *   object-cover 프레이밍 차이는 자연스럽게 흡수된다.
 *
 * 흐릿한 미리보기는 CSS blur 필터가 아니라 사전 블러 자산(blurSrc) 레이어다.
 * WebKit(iOS/Safari)은 합성 단계에서 filter 출력을 조상 overflow 클립 밖으로
 * 흘리는 버그가 있고, 이 출력은 조상/자신의 clip-path·mask로도 다시 잘리지 않는다
 * (필터 제거만이 유일하게 깨끗했음 — WebKit 실측). 그래서:
 * - 카드: 선명한 이미지 위에 블러 레이어를 불투명하게 덮는다(정적, 합성 비용 0).
 * - 다이얼로그: 같은 블러 레이어를 모핑과 같은 곡선으로 opacity 1→0 크로스페이드해
 *   디샤프닝한다(닫힐 때 `exit`로 역재생). opacity는 컴포지터 전용 속성이라
 *   모핑 중 GPU 부하도 기존 filter 트윈보다 훨씬 가볍다.
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

  // 다이얼로그 이미지는 클릭 후 마운트라 preload가 나가지 않고 카드 로드분이
  // 캐시로 뜨므로 priority가 무의미하다. LCP 후보인 그리드 첫 행 카드에만 준다.
  // 카드에서 선명한 원본은 블러 레이어에 가려 보이지 않지만, 다이얼로그가 열릴 때
  // 디코딩 지연 없이 크로스페이드되도록 미리 깔아 캐시를 데워 둔다.
  const image = (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      priority={isCard && index < 3}
      sizes="(max-width: 640px) 100vw, 50rem"
      className="size-full object-cover"
    />
  );

  // 사전 블러 썸네일(폭 240px, scripts/blur-project-images.mjs가 원본 옆에 생성)을
  // 같은 프레이밍(object-cover)으로 덮는 레이어.
  // 이미 충분히 작아 최적화 파이프라인을 거칠 이유가 없다(unoptimized).
  const blurImage = (
    <Image
      src={project.image.src.replace(/\.[^.]+$/, '.blur.webp')}
      alt=""
      width={240}
      height={Math.round((240 * project.image.height) / project.image.width)}
      unoptimized
      className="size-full object-cover"
    />
  );

  return (
    <motion.div
      layoutId={projectMorphId.hero(id)}
      transition={PROJECT_MORPH_TRANSITION}
      // 다이얼로그에서는 히어로를 콘텐츠(z-auto)보다 위로 올린다(모핑 중 콘텐츠가 히어로를
      // 덮지 않도록). sticky 내비(z-10)보다는 낮게 둔다. 카드에서는 트리거 버튼
      // (absolute inset-0 z-10)을 가리지 않도록 z를 주지 않는다.
      className={cn('relative h-80 overflow-hidden', !isCard && 'z-1')}
    >
      <motion.div
        layoutId={projectMorphId.image(id)}
        layout="position"
        transition={PROJECT_MORPH_TRANSITION}
        // 윈도우 폭(inset-0)에 맞추면 layout="position"이 좌상단 앵커라 모핑 중 좌측
        // 클리핑이 된다. 대신 고정 크기 박스를 윈도우 중앙에 정렬하면, 박스 크기가
        // 두 상태 모두 동일해(왜곡·size-snap 0) 윈도우 중심을 추종 →
        // 카드·다이얼로그·모핑 전 구간에서 중앙 기준 대칭 클리핑이 된다.
        // 크기는 다이얼로그 최대폭(48rem)+사방 1rem 여유.
        className="absolute top-0 left-[calc(50%-24rem)] h-full w-[48rem] max-w-none"
      >
        <div className={cn('relative size-full')}>
          {image}
          {/* 카드는 정적 블러 레이어, 다이얼로그는 펼침과 동기로 1→0 크로스페이드. */}
          {isCard ? (
            <div aria-hidden className="absolute inset-0">
              {blurImage}
            </div>
          ) : (
            <motion.div
              aria-hidden
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={PROJECT_MORPH_TRANSITION}
            >
              {blurImage}
            </motion.div>
          )}
        </div>
      </motion.div>

      <ProjectHeroFace project={project} index={index} id={id} />

      {/* 가장자리를 눌러주는 inset 그림자. 카드는 정적, 다이얼로그는 0.45→0 으로 풀린다. */}
      {isCard ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 inset-shadow-[0_0_24px_rgba(0,0,0,0.45)]"
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
