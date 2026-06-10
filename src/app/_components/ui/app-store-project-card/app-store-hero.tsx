'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/shared/utils/classnames';
import { type Project } from '../project-card/types';
import { AppStoreHeroFace } from './app-store-hero-face';
import {
  APP_STORE_LAYOUT_TRANSITION,
  appStoreLayoutId,
  type AppStoreId,
} from './app-store-motion';

/**
 * 카드/모달이 공유하는 히어로 윈도우.
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
 * 모달 히어로는 마운트되며 blur 12→0 / inset-shadow 0.45→0 을 모핑과 같은 곡선으로
 * 디샤프닝한다(닫힐 때 `exit`로 역재생). backdrop-filter / box-shadow 는 비레이아웃
 * 속성이라 transform projection과 충돌 없이 안전하게 트윈된다.
 */
export function AppStoreHero({
  project,
  index,
  id,
  variant,
}: {
  project: Project;
  index: number;
  id: AppStoreId;
  variant: 'card' | 'modal';
}) {
  const isCard = variant === 'card';

  return (
    <motion.div
      layoutId={appStoreLayoutId.hero(id)}
      transition={APP_STORE_LAYOUT_TRANSITION}
      // 모달에서는 히어로를 콘텐츠(z-auto)보다 위로 올린다(모핑 중 콘텐츠가 히어로를
      // 덮지 않도록). sticky 내비(z-10)보다는 낮게 둔다. 카드에서는 트리거 버튼
      // (absolute inset-0 z-10)을 가리지 않도록 z를 주지 않는다.
      className={cn('relative h-80 overflow-hidden', !isCard && 'z-[1]')}
    >
      <motion.div
        layoutId={appStoreLayoutId.image(id)}
        layout="position"
        transition={APP_STORE_LAYOUT_TRANSITION}
        // 윈도우 폭(inset-0)에 맞추면 layout="position"이 좌상단 앵커라 모핑 중 좌측
        // 클리핑이 된다. 대신 모달 최대폭(48rem) 고정 박스를 윈도우 중앙에 정렬하면,
        // 박스 크기가 두 상태 모두 동일해(왜곡·size-snap 0) 윈도우 중심을 추종 →
        // 카드·모달·모핑 전 구간에서 중앙 기준 대칭 클리핑이 된다.
        className="absolute top-0 left-[calc(50%_-_24rem)] h-full w-[48rem] max-w-none"
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          priority={!isCard}
          sizes="(max-width: 640px) 100vw, 48rem"
          className={cn(
            'h-full w-full object-cover',
            isCard && 'transition-transform duration-500 group-hover:scale-105'
          )}
        />
      </motion.div>

      {/* 흐릿한 미리보기 블러. 카드는 정적, 모달은 펼침과 동기로 12→0 디샤프닝. */}
      {isCard ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 backdrop-blur-md"
        />
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          // backdrop-filter는 motion의 명시 value-type 매핑(filter 전용)이 없고 webkit
          // 프리픽스 키도 keyframe 타입에 없으므로, CSS 변수를 트윈해 양쪽 프리픽스를
          // 한 번에 구동한다. (기존 backdrop-filter 메커니즘 그대로 — 엣지 아티팩트 없음)
          style={{
            backdropFilter: 'blur(var(--asc-blur))',
            WebkitBackdropFilter: 'blur(var(--asc-blur))',
          }}
          initial={{ '--asc-blur': '12px' }}
          animate={{ '--asc-blur': '0px' }}
          exit={{ '--asc-blur': '12px' }}
          transition={APP_STORE_LAYOUT_TRANSITION}
        />
      )}

      <AppStoreHeroFace project={project} index={index} id={id} />

      {/* 가장자리를 눌러주는 inset 그림자. 카드는 정적, 모달은 0.45→0 으로 풀린다. */}
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
          transition={APP_STORE_LAYOUT_TRANSITION}
        />
      )}
    </motion.div>
  );
}
