'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/shared/utils/classnames';
import type { ArchiveNode } from './project-node-map.layout';

/**
 * 원 패킹 기반 프로젝트 아카이브.
 * 빈틈없이 맞물린 140개의 원이 하나의 덩어리로 "이만큼 했다"를 보여준다.
 * 마우스 거리비례로 근처 원이 커지고(스케일업) 가까운 원에 이름이 뜬다.
 * 140개를 60fps로 추적하므로 React 상태가 아닌 ref + RAF로 transform을 직접 write한다(리렌더 0회).
 */

// 인터랙션 튜닝 상수 — 육안으로 조절하는 지점.
const INFLUENCE_RADIUS = 200; // 마우스 영향 반경(px)
const SCALE_LERP = 0.18; // 스케일 보간 계수
const LABEL_RADIUS = 60; // 라벨 근접 표시 반경(px)
const REST_EPSILON = 0.002; // 안정 판정 임계

const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface ProjectNodeMapProps {
  nodes: ArchiveNode[];
}

export function ProjectNodeMap({ nodes }: ProjectNodeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const labelStateRef = useRef<boolean[]>([]);
  const scaleRef = useRef<number[]>(nodes.map(() => 1));
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 접근성: 모션 최소화 설정이면 인터랙션을 붙이지 않는다(정적 패킹, 라벨은 CSS hover/focus).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // 큰 원은 덜, 작은 원은 더 커지도록 크기에 반비례하는 스케일 상한(set 내 상대값).
    const sizes = nodes.map((n) => n.sizeRatio);
    const minS = Math.min(...sizes);
    const maxS = Math.max(...sizes);
    const maxScales = nodes.map((n) => {
      const t = (n.sizeRatio - minS) / (maxS - minS || 1);
      return 1.85 - t * 0.55; // 작은 원 1.85배 → 큰 원 1.3배
    });

    // rect는 RAF 밖에서만 갱신 → 루프 내 강제 레이아웃 0회.
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
      const px = pointer.x - rect.left;
      const py = pointer.y - rect.top;
      let settled = true;

      for (let i = 0; i < nodes.length; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;
        const node = nodes[i];
        const cx = node.xRatio * rect.width;
        const cy = node.yRatio * rect.height;

        let targetScale = 1;
        let near = false;
        if (pointer.active) {
          const dist = Math.hypot(px - cx, py - cy);
          if (dist < INFLUENCE_RADIUS) {
            const f = smoothstep(1 - dist / INFLUENCE_RADIUS);
            targetScale = 1 + f * (maxScales[i] - 1);
          }
          near = dist < LABEL_RADIUS;
        }

        const cur = scaleRef.current[i] + (targetScale - scaleRef.current[i]) * SCALE_LERP;
        scaleRef.current[i] = cur;
        el.style.transform = `translate(-50%, -50%) scale(${cur})`;
        el.style.zIndex = cur > 1.04 ? '10' : '';

        // 라벨 표시는 상태가 바뀔 때만 DOM을 건드린다.
        if (labelStateRef.current[i] !== near) {
          labelStateRef.current[i] = near;
          el.classList.toggle('is-near', near);
        }

        if (Math.abs(cur - targetScale) > REST_EPSILON) settled = false;
      }

      // 포인터가 떠났고 모든 원이 정착하면 RAF 정지(idle CPU 0). 다음 pointermove에서 재가동.
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
      start(); // 복귀 애니메이션을 위해 가동(이미 돌면 무시됨).
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', updateRect, { passive: true });

    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(container);

    // 화면 밖이면 RAF를 멈춰 불필요한 연산을 막는다.
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
  }, [nodes]);

  return (
    <div ref={containerRef} className="relative w-full select-none aspect-[16/5]">
      <ul className="absolute inset-0 m-0 list-none p-0">
        {nodes.map((node, i) => {
          const Tag = node.href ? 'a' : 'span';
          return (
            <li key={`${node.name}-${i}`}>
              <Tag
                ref={(el: HTMLElement | null) => {
                  nodeRefs.current[i] = el;
                }}
                {...(node.href
                  ? { href: node.href, target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                aria-label={node.name}
                className={cn(
                  'node group absolute block aspect-square rounded-full bg-orange-500',
                  'transition-[filter] duration-200 hover:brightness-110',
                  node.href ? 'cursor-pointer' : 'cursor-default',
                )}
                style={{
                  left: `${node.xRatio * 100}%`,
                  top: `${node.yRatio * 100}%`,
                  width: `${node.sizeRatio * 100}%`,
                  opacity: node.opacity,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span
                  className={cn(
                    'label pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2',
                    'whitespace-nowrap rounded-md bg-foreground/90 px-2 py-0.5 text-xs text-background',
                    'opacity-0 transition-opacity duration-200',
                    'group-hover:opacity-100 group-focus-visible:opacity-100 [.is-near_&]:opacity-100',
                  )}
                >
                  {node.name}
                </span>
              </Tag>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
