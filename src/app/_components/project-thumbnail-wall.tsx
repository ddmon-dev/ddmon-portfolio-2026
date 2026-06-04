'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/classnames';
import type { ThumbItem } from './project-thumbnail-wall.data';

/**
 * 썸네일 월 프로젝트 아카이브.
 * 실제 사이트 스크린샷을 빽빽한 그리드로 깔아 "내가 이걸 다 만들었다"를 눈으로 보여준다.
 * 로드 실패(죽은 사이트 등)는 오렌지 폴백 타일로 대체한다.
 *
 * 기본은 5줄만 노출하고(접힌 상태) 하단으로 갈수록 페이드아웃, "더보기"로 전체를 펼친다.
 * 펼칠 때는 스크롤은 그대로 두고(콘텐츠가 아래로 자람), 높이를 collapsedH→fullH로
 * 트랜지션해 하단 페이드가 아래로 밀리며 나머지 줄이 드러난다.
 *
 * 한 줄당 타일 수는 뷰포트에 따라 달라지므로, 실제 그리드와 동일한 auto-fill 열 수를
 * 측정해 정확히 5줄 높이를 계산한다.
 */

// 썸네일 그리드 파라미터 (아래 ul 클래스와 일치해야 함)
const MIN_COL = 88; // minmax(88px, 1fr)
const GAP = 6; // gap-1.5
const TILE_RATIO = 10 / 16; // aspect-[16/10] → 높이/너비
const COLLAPSED_ROWS = 5;
const FALLBACK_COLS = 8; // 측정 전(SSR/첫 렌더) 임시 열 수
const DURATION = 650; // ms

type Phase = 'collapsed' | 'opening' | 'open' | 'closing';

function Tile({ item }: { item: ThumbItem }) {
  const [broken, setBroken] = useState(!item.thumb);

  const inner = (
    <div className="group relative aspect-[16/10] overflow-hidden rounded-sm bg-orange-500/15 ring-1 ring-black/5">
      {broken || !item.thumb ? (
        <div className="flex h-full w-full items-center justify-center bg-orange-500 px-1 text-center text-[10px] leading-tight font-medium text-white">
          {item.name}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.thumb}
          alt={item.name}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 truncate bg-foreground/80 px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {item.name}
      </span>
    </div>
  );

  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-sm transition-[transform,box-shadow] duration-200 hover:z-10 hover:scale-110 hover:shadow-lg"
    >
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

interface ProjectThumbnailWallProps {
  items: ThumbItem[];
}

export function ProjectThumbnailWall({ items }: ProjectThumbnailWallProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('collapsed');

  // 언마운트 시 진행 중 타이머 정리
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  // 실제 그리드 너비를 측정해 열 수/행 높이를 계산 (페인트 전에 1차 측정 → 깜빡임 방지)
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const apply = (w: number) => setWidth((prev) => (prev === w ? prev : w));
    apply(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cols = width
    ? Math.max(1, Math.floor((width + GAP) / (MIN_COL + GAP)))
    : FALLBACK_COLS;
  const colW = width ? (width - (cols - 1) * GAP) / cols : MIN_COL;
  const rowH = colW * TILE_RATIO;
  const collapsedH = Math.round(
    COLLAPSED_ROWS * rowH + (COLLAPSED_ROWS - 1) * GAP,
  );
  const fullRows = Math.ceil(items.length / cols);
  const fullH = Math.round(fullRows * rowH + (fullRows - 1) * GAP);
  const collapsedCount = cols * COLLAPSED_ROWS;
  const hasMore = items.length > collapsedCount;

  const animating = phase === 'opening' || phase === 'closing';
  const isOpen = !hasMore || phase === 'open';

  const height = isOpen
    ? 'auto'
    : phase === 'collapsed' || phase === 'closing'
      ? collapsedH
      : fullH; // opening

  const toggle = () => {
    if (animating) return;
    const el = wrapRef.current;
    if (phase === 'collapsed') {
      setPhase('opening'); // collapsedH(px) → fullH 로 트랜지션
      timer.current = setTimeout(() => setPhase('open'), DURATION);
    } else if (phase === 'open' && el) {
      // auto 높이는 트랜지션 불가 → 현재 px를 이번 프레임에 커밋한 뒤,
      // 다음 프레임에 collapsedH로 트랜지션해야 닫힘이 애니메이션된다.
      el.style.height = `${el.offsetHeight}px`;
      requestAnimationFrame(() => {
        setPhase('closing');
        timer.current = setTimeout(() => setPhase('collapsed'), DURATION);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div
        ref={wrapRef}
        className={cn('relative', isOpen ? 'overflow-visible' : 'overflow-hidden')}
        style={{
          height,
          transition: animating
            ? `height ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
            : undefined,
        }}
      >
        <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-1.5 p-0">
          {items.map((item, i) => (
            <li key={`${item.name}-${i}`}>
              <Tile item={item} />
            </li>
          ))}
        </ul>

        {/* 하단 페이드 — 접힘/펼침 동안 클립 경계에 붙어 함께 내려가다, 펼침 완료 시 사라진다 */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28',
            'bg-gradient-to-b from-transparent to-background',
            'transition-opacity duration-300',
            hasMore && !isOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            shape="pill"
            onClick={toggle}
            disabled={animating}
          >
            {phase === 'open' ? (
              <>
                접기 <CaretUpIcon weight="bold" />
              </>
            ) : (
              <>
                더보기 (+{items.length - collapsedCount}){' '}
                <CaretDownIcon weight="bold" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
