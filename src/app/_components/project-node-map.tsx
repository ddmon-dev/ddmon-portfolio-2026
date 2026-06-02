'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/shared/utils/classnames';
import { computeNearestEdges, type ArchiveNode } from './project-node-map.layout';

/**
 * 옵시디언 그래프뷰 느낌의 인터랙티브 노드맵.
 * 140개 노드를 60fps로 추적하므로 React 상태가 아닌 ref + requestAnimationFrame으로
 * transform을 직접 write한다(리렌더 0회). 좌표는 비율(0~1)이라 CSS %로 배치되고,
 * 노드를 잇는 장식용 엣지는 뒤쪽 canvas 한 장에 그린다(클릭 가능한 노드는 DOM 유지).
 */

// 인터랙션 튜닝 상수 — 육안으로 조절하는 지점.
const INFLUENCE_RADIUS = 220; // 마우스 영향 반경(px)
const MAX_PULL = 14; // 자석 끌림 최대 이동(px)
const SCALE_LERP = 0.16; // 스케일 보간 계수
const OFFSET_LERP = 0.12; // 끌림 보간 계수
const LABEL_RADIUS = 70; // 라벨 근접 표시 반경(px)
const REST_EPSILON = 0.002; // 안정 판정 임계
const EDGE_RGB = '249, 115, 22'; // orange-500
const EDGE_BASE_ALPHA = 0.12; // 평상시 선 투명도
const EDGE_GLOW_ALPHA = 0.45; // 커서 근처 선 추가 투명도

/** 큰 노드는 덜, 작은 노드는 더 커지도록 기본 크기에 반비례하는 스케일 상한. */
function maxScaleFor(size: number): number {
  const t = Math.min(1, Math.max(0, (size - 8) / (32 - 8)));
  return 1.9 - t * 0.6; // size 8 → 1.9, size 32 → 1.3
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface ProjectNodeMapProps {
  nodes: ArchiveNode[];
}

export function ProjectNodeMap({ nodes }: ProjectNodeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const labelStateRef = useRef<boolean[]>([]);
  const animRef = useRef(nodes.map(() => ({ scale: 1, ox: 0, oy: 0 })));
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const edges = computeNearestEdges(nodes, 3);
    const maxScales = nodes.map((n) => maxScaleFor(n.size));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let viewW = 0;
    let viewH = 0;

    // rect/캔버스 백킹스토어는 RAF 밖에서만 갱신 → 루프 내 강제 레이아웃 0회.
    const updateRect = () => {
      const rect = container.getBoundingClientRect();
      rectRef.current = rect;
      viewW = rect.width;
      viewH = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(viewW * dpr);
      canvas.height = Math.round(viewH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // 현재 노드 중심(px) = 비율*뷰크기 + 끌림 오프셋.
    const drawEdges = () => {
      const rect = rectRef.current;
      if (!rect) return;
      ctx.clearRect(0, 0, viewW, viewH);
      const pointer = pointerRef.current;
      const px = pointer.x - rect.left;
      const py = pointer.y - rect.top;

      for (let e = 0; e < edges.length; e++) {
        const i = edges[e][0];
        const j = edges[e][1];
        const a = animRef.current[i];
        const b = animRef.current[j];
        const ax = nodes[i].xRatio * viewW + a.ox;
        const ay = nodes[i].yRatio * viewH + a.oy;
        const bx = nodes[j].xRatio * viewW + b.ox;
        const by = nodes[j].yRatio * viewH + b.oy;

        let glow = 0;
        if (pointer.active) {
          const d = Math.min(Math.hypot(px - ax, py - ay), Math.hypot(px - bx, py - by));
          glow = Math.max(0, 1 - d / INFLUENCE_RADIUS);
        }
        ctx.strokeStyle = `rgba(${EDGE_RGB}, ${EDGE_BASE_ALPHA + glow * EDGE_GLOW_ALPHA})`;
        ctx.lineWidth = 1 + glow * 0.6;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
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
        let tox = 0;
        let toy = 0;
        let near = false;

        if (pointer.active) {
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE_RADIUS) {
            const f = smoothstep(1 - dist / INFLUENCE_RADIUS);
            targetScale = 1 + f * (maxScales[i] - 1);
            if (dist > 0.0001) {
              const pull = f * MAX_PULL;
              tox = (dx / dist) * pull;
              toy = (dy / dist) * pull;
            }
          }
          near = dist < LABEL_RADIUS;
        }

        const a = animRef.current[i];
        a.scale += (targetScale - a.scale) * SCALE_LERP;
        a.ox += (tox - a.ox) * OFFSET_LERP;
        a.oy += (toy - a.oy) * OFFSET_LERP;

        el.style.transform = `translate(-50%, -50%) translate3d(${a.ox}px, ${a.oy}px, 0) scale(${a.scale})`;
        el.style.zIndex = a.scale > 1.05 ? '10' : '';

        // 라벨 표시는 상태가 바뀔 때만 DOM을 건드린다.
        if (labelStateRef.current[i] !== near) {
          labelStateRef.current[i] = near;
          el.classList.toggle('is-near', near);
        }

        if (
          Math.abs(a.scale - targetScale) > REST_EPSILON ||
          Math.abs(a.ox - tox) > REST_EPSILON ||
          Math.abs(a.oy - toy) > REST_EPSILON
        ) {
          settled = false;
        }
      }

      drawEdges();

      // 포인터가 떠났고 모든 노드가 정착하면 RAF 정지(idle CPU 0). 다음 pointermove에서 재가동.
      if (!pointer.active && settled) {
        runningRef.current = false;
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(frame);
    };

    const start = () => {
      if (runningRef.current || !visibleRef.current || reduceMotion) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      runningRef.current = false;
    };

    const onResize = () => {
      updateRect();
      drawEdges(); // 정지 상태에서도 리사이즈 후 정적 웹을 다시 그린다.
    };

    // 모션 최소화 설정이면 인터랙션 없이 정적 웹만 그린다(라벨은 CSS hover/focus).
    if (reduceMotion) {
      drawEdges();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

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
    window.addEventListener('resize', onResize);

    const resizeObserver = new ResizeObserver(onResize);
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
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      io.disconnect();
      stop();
    };
  }, [nodes]);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none aspect-[16/5] min-h-[360px]"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
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
                  'node group absolute block rounded-full bg-orange-500',
                  node.href ? 'cursor-pointer' : 'cursor-default',
                )}
                style={{
                  left: `${node.xRatio * 100}%`,
                  top: `${node.yRatio * 100}%`,
                  width: node.size,
                  height: node.size,
                  opacity: node.opacity,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span
                  className={cn(
                    'label pointer-events-none absolute left-1/2 top-[calc(100%+6px)]',
                    '-translate-x-1/2 whitespace-nowrap rounded-md bg-foreground/90',
                    'px-2 py-0.5 text-xs text-background opacity-0 transition-opacity duration-200',
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
