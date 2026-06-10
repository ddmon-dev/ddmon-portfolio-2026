'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { XIcon } from '@phosphor-icons/react';
import { useMounted } from '@/shared/hooks/use-mounted';
import { StackBadges } from '../project-card/stack-badges';
import { useFocusTrap } from '../project-card/use-focus-trap';
import { type Project } from '../project-card/types';
import { AppStoreHeroFace } from './app-store-hero-face';

const layoutDuration = 0.7;
// 초반 천천히 → 중반 급가속(팍) → 후반 부드럽게 안착 (easeInOutExpo)
const layoutEase = 'cubic-bezier(0.87, 0, 0.13, 1)';
// 이전 이징: 빠르게 출발 → 느리게 도착 (easeOutQuint)
// const layoutEase = 'cubic-bezier(0.22, 1, 0.36, 1)';
const layoutTransition = [
  `top ${layoutDuration}s ${layoutEase}`,
  `left ${layoutDuration}s ${layoutEase}`,
  `width ${layoutDuration}s ${layoutEase}`,
  `height ${layoutDuration}s ${layoutEase}`,
  `border-radius ${layoutDuration}s ${layoutEase}`,
].join(', ');

export type CardRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

/**
 * 카드에서 즉석 측정한 `startRect`에서 화면 중앙 모달로 확장되는 App Store 스타일 모달.
 * 라우팅 없이 카드가 소유한 클라이언트 상태로만 동작하며, 닫힘 수축이 끝나면
 * `onClosed`로 부모(카드)에게 언마운트를 위임한다.
 */
export function AppStoreProjectModal({
  project,
  index,
  startRect,
  measureCard,
  onClosed,
}: {
  project: Project;
  index: number;
  startRect: CardRect;
  measureCard: () => CardRect | null;
  onClosed: () => void;
}) {
  const trapRef = useRef<HTMLElement>(null);
  const resizeTimer = useRef<number>(0);
  const mounted = useMounted();
  const [expanded, setExpanded] = useState(false);
  const [target, setTarget] = useState(getModalTarget);
  const [collapsedRect, setCollapsedRect] = useState(startRect);
  const [isResizing, setIsResizing] = useState(false);
  useFocusTrap(true, trapRef);

  const close = () => {
    // 스크롤이 내려가 있어도 카드(히어로)로 매끄럽게 수축하도록 상단으로 원복
    trapRef.current?.scrollTo({ top: 0 });
    // 리사이즈 등으로 카드가 움직였을 수 있으니 닫는 시점의 실제 위치로 수축
    const fresh = measureCard();
    if (fresh) setCollapsedRect(fresh);
    setExpanded(false);
    window.setTimeout(onClosed, layoutDuration * 1000);
  };

  // 마운트 시 1회: 펼침 시작 + body 스크롤 잠금
  useEffect(() => {
    const frame = requestAnimationFrame(() => setExpanded(true));

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // 열린 상태에서 브라우저 리사이즈 시 모달 위치/크기를 즉시 따라가게 갱신
  // (리사이즈 동안은 transition을 끊어 커서를 지연 없이 추종)
  useEffect(() => {
    const onResize = () => {
      setTarget(getModalTarget());
      setIsResizing(true);
      window.clearTimeout(resizeTimer.current);
      resizeTimer.current = window.setTimeout(() => setIsResizing(false), 140);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer.current);
    };
  }, []);

  // Escape 닫기 (effect는 불안정한 close 대신 실제 참조하는 prop에만 의존)
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      trapRef.current?.scrollTo({ top: 0 });
      const fresh = measureCard();
      if (fresh) setCollapsedRect(fresh);
      setExpanded(false);
      window.setTimeout(onClosed, layoutDuration * 1000);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [measureCard, onClosed]);

  if (!mounted) return null;

  const currentRect = expanded
    ? target
    : { ...collapsedRect, borderRadius: 28 };

  const node = (
    <div className="fixed inset-0 z-80">
      <motion.button
        type="button"
        aria-label="모달 닫기 배경"
        className="fixed inset-0 h-full w-full bg-black/42 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        onClick={close}
      />
      <article
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        style={{
          ...currentRect,
          transition: isResizing ? 'none' : layoutTransition,
        }}
        className="fixed overflow-y-auto bg-background text-foreground shadow-2xl"
      >
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              priority
              sizes="(max-width: 640px) 100vw, 48rem"
              className="h-full w-full object-cover"
            />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backdropFilter: `blur(${expanded ? 0 : 12}px)`,
              WebkitBackdropFilter: `blur(${expanded ? 0 : 12}px)`,
              transition: `backdrop-filter ${layoutDuration}s ${layoutEase}, -webkit-backdrop-filter ${layoutDuration}s ${layoutEase}`,
            }}
          />

          <AppStoreHeroFace project={project} index={index} />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: `inset 0 0 24px rgba(0,0,0,${expanded ? 0 : 0.45})`,
              transition: `box-shadow ${layoutDuration}s ${layoutEase}`,
            }}
          />

          <motion.button
            type="button"
            data-autofocus
            aria-label="모달 닫기"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.2, delay: expanded ? 0.18 : 0 }}
            style={{ pointerEvents: expanded ? 'auto' : 'none' }}
            className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-black/36 text-white backdrop-blur-md transition-colors hover:bg-black/52 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <XIcon aria-hidden size={18} weight="bold" />
          </motion.button>
        </div>

        <div className="space-y-8 p-6 max-sm:p-5">
          <div className="space-y-3">
            <h4 className="font-secondary text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Used stack
            </h4>
            <StackBadges stacks={project.stacks} full />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, delay: 0.08 }}
            className="divide-y divide-border text-ash-dark [&>section]:py-6 [&>section]:first:pt-0 [&>section]:last:pb-0"
          >
            {project.content}
          </motion.div>
        </div>
      </article>
    </div>
  );

  return createPortal(node, document.body);
}

function getModalTarget() {
  const isMobile = window.matchMedia('(max-width: 640px)').matches;

  if (isMobile) {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
    };
  }

  const margin = 24;
  const width = Math.min(768, window.innerWidth - margin * 2);

  return {
    top: margin,
    left: (window.innerWidth - width) / 2,
    width,
    height: window.innerHeight - margin * 2,
    borderRadius: 32,
  };
}
