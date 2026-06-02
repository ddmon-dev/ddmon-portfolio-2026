'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/shared/utils/classnames';
import { VIEW_H, VIEW_W, type VoronoiCell } from './project-node-map.layout';

/**
 * 보로노이 모자이크 프로젝트 아카이브.
 * 영역을 140개 셀로 빈틈없이 쪼개 "이만큼 했다"를 면(面)으로 보여준다.
 * 마우스 근처 셀이 진해지고(글로우) 셀에 이름이 뜬다. 클릭하면 실제 사이트로.
 * 140셀을 60fps로 갱신하므로 React 상태가 아닌 ref + RAF로 직접 write한다(리렌더 0회).
 */

const INFLUENCE_VB = 300; // 마우스 글로우 반경(viewBox 단위)
const GLOW_LERP = 0.2; // 글로우 보간 계수
const REST_EPSILON = 0.004;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface ProjectMosaicProps {
  cells: VoronoiCell[];
}

export function ProjectMosaic({ cells }: ProjectMosaicProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const polyRefs = useRef<(SVGPolygonElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<number[]>(cells.map(() => 0));
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const rectRef = useRef<DOMRect | null>(null);
  const hoveredRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const updateRect = () => {
      rectRef.current = container.getBoundingClientRect();
    };
    updateRect();

    const frame = () => {
      const rect = rectRef.current;
      const pointer = pointerRef.current;
      if (!rect) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      // 포인터를 viewBox 좌표로 변환(컨테이너와 viewBox 종횡비 동일 → 등방 스케일).
      const sx = VIEW_W / rect.width;
      const px = (pointer.x - rect.left) * sx;
      const py = (pointer.y - rect.top) * sx;

      let settled = true;
      let nearest = -1;
      let nearestD = Infinity;

      for (let i = 0; i < cells.length; i++) {
        const el = polyRefs.current[i];
        if (!el) continue;
        const cell = cells[i];
        let target = 0;
        if (pointer.active) {
          const d = Math.hypot(px - cell.cx, py - cell.cy);
          if (d < INFLUENCE_VB) target = smoothstep(1 - d / INFLUENCE_VB);
          if (d < nearestD) {
            nearestD = d;
            nearest = i;
          }
        }
        const cur = glowRef.current[i] + (target - glowRef.current[i]) * GLOW_LERP;
        glowRef.current[i] = cur;
        // 기본 투명도에서 글로우만큼 1.0으로 끌어올린다.
        el.style.fillOpacity = `${cell.opacity + (1 - cell.opacity) * cur}`;
        if (Math.abs(cur - target) > REST_EPSILON) settled = false;
      }

      // 호버(=가장 가까운) 셀에 라벨 표시.
      const label = labelRef.current;
      if (label) {
        if (nearest !== hoveredRef.current) {
          hoveredRef.current = nearest;
          if (nearest >= 0) {
            const cell = cells[nearest];
            label.textContent = cell.name;
            label.style.left = `${(cell.cx / VIEW_W) * 100}%`;
            label.style.top = `${(cell.cy / VIEW_H) * 100}%`;
            label.style.opacity = '1';
          } else {
            label.style.opacity = '0';
          }
        }
      }

      if (!pointer.active && settled) {
        runningRef.current = false;
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(frame);
    };

    const start = () => {
      if (runningRef.current || !visibleRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      runningRef.current = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.active = true;
      start();
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
      start();
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', updateRect, { passive: true });
    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(container);
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: '120px' },
    );
    io.observe(container);

    return () => {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', updateRect);
      resizeObserver.disconnect();
      io.disconnect();
      stop();
    };
  }, [cells]);

  return (
    <div ref={containerRef} className="relative w-full select-none aspect-[16/5]">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block h-full w-full text-orange-500"
        aria-label="제작한 프로젝트 모음"
      >
        {cells.map((cell, i) => {
          const points = cell.points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
          const polygon = (
            <polygon
              ref={(el: SVGPolygonElement | null) => {
                polyRefs.current[i] = el;
              }}
              points={points}
              fill="currentColor"
              fillOpacity={cell.opacity}
              stroke="#ffffff"
              strokeWidth={3}
              strokeLinejoin="round"
            />
          );
          return cell.href ? (
            <a
              key={`${cell.name}-${i}`}
              href={cell.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <title>{cell.name}</title>
              {polygon}
            </a>
          ) : (
            <g key={`${cell.name}-${i}`}>
              <title>{cell.name}</title>
              {polygon}
            </g>
          );
        })}
      </svg>
      <div
        ref={labelRef}
        className={cn(
          'pointer-events-none absolute -translate-x-1/2 -translate-y-1/2',
          'whitespace-nowrap rounded-md bg-foreground/90 px-2 py-0.5 text-xs text-background',
          'opacity-0 transition-opacity duration-150',
        )}
      />
    </div>
  );
}
