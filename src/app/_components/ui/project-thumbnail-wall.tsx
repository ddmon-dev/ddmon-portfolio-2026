'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/classnames';
import type { ThumbItem } from './project-thumbnail-wall.data';

const MIN_COL = 88;
const GAP = 6;
const TILE_RATIO = 10 / 16;
const COLLAPSED_ROWS = 5;
const FALLBACK_COLS = 8;
const DURATION = 650;

type Phase = 'collapsed' | 'opening' | 'open' | 'closing';

function Tile({ item }: { item: ThumbItem }) {
  const [broken, setBroken] = useState(!item.thumb);

  const inner = (
    <div className="group relative aspect-16/10 overflow-hidden rounded-sm bg-primary/15 ring-1 ring-black/5">
      {broken || !item.thumb ? (
        <div className="flex size-full items-center justify-center bg-primary px-1 text-center text-[10px] leading-tight font-medium text-primary-foreground">
          {item.name}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.thumb}
          alt={item.name}
          loading="lazy"
          onError={() => setBroken(true)}
          className="size-full object-cover object-top"
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

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

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
      : fullH;

  const toggle = () => {
    if (animating) return;
    const el = wrapRef.current;
    if (phase === 'collapsed') {
      setPhase('opening');
      timer.current = setTimeout(() => setPhase('open'), DURATION);
    } else if (phase === 'open' && el) {
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

        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28',
            'bg-linear-to-b from-transparent to-background',
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
