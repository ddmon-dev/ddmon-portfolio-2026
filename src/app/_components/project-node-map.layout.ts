import type { Project } from '@/data/all-projects.data';

/**
 * 보로노이 모자이크 레이아웃 순수 로직.
 * 영역 전체를 프로젝트 수만큼의 셀로 쪼개 빈틈없이(100%) 채운다.
 * 외부 라이브러리 없이: 시드 점 → Lloyd 완화(균일·유기적) → 반평면 클리핑으로 각 셀 다각형 계산.
 * 결정적 PRNG라 SSR·CSR 마크업이 동일하다(하이드레이션 불일치 방지).
 */

export const VIEW_W = 1600;
export const VIEW_H = 500; // 16:5

export interface VoronoiCell {
  name: string;
  /** 정규화된 링크. 없으면 null → 클릭 비활성. */
  href: string | null;
  /** 셀 다각형 꼭짓점 [x, y] (viewBox 좌표) */
  points: [number, number][];
  /** 셀 중심(라벨/근접 판정용, viewBox 좌표) */
  cx: number;
  cy: number;
  /** 기본 투명도 0~1 */
  opacity: number;
}

type Pt = [number, number];

/** mulberry32 — 32bit 시드 기반 결정적 난수. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const SEED = 0x9e3779b9;
const LLOYD = 5; // 셀을 고르게 다듬는 완화 반복 횟수

/** 다각형을 "a에 더 가까운 반평면"으로 자른다(Sutherland–Hodgman). */
function clipHalfPlane(poly: Pt[], a: Pt, b: Pt): Pt[] {
  const nx = b[0] - a[0];
  const ny = b[1] - a[1];
  const c = (b[0] * b[0] + b[1] * b[1] - a[0] * a[0] - a[1] * a[1]) / 2;
  const inside = (p: Pt) => p[0] * nx + p[1] * ny <= c;
  const isect = (p1: Pt, p2: Pt): Pt => {
    const d0 = p1[0] * nx + p1[1] * ny;
    const d1 = p2[0] * nx + p2[1] * ny;
    const t = (c - d0) / (d1 - d0);
    return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
  };
  const out: Pt[] = [];
  const L = poly.length;
  for (let k = 0; k < L; k++) {
    const cur = poly[k];
    const prev = poly[(k - 1 + L) % L];
    const ci = inside(cur);
    const pi = inside(prev);
    if (ci) {
      if (!pi) out.push(isect(prev, cur));
      out.push(cur);
    } else if (pi) {
      out.push(isect(prev, cur));
    }
  }
  return out;
}

/** seed의 보로노이 셀 = 사각형을 다른 모든 seed의 수직이등분선으로 클리핑. */
function cellOf(rect: Pt[], seed: Pt, seeds: Pt[]): Pt[] {
  let poly = rect.map((p) => [p[0], p[1]] as Pt);
  for (const other of seeds) {
    if (other === seed) continue;
    poly = clipHalfPlane(poly, seed, other);
    if (poly.length === 0) break;
  }
  return poly;
}

/** 다각형 무게중심(면적 가중). 면적이 0에 가까우면 꼭짓점 평균으로 폴백. */
function centroid(poly: Pt[]): Pt {
  let area = 0;
  let cx = 0;
  let cy = 0;
  const L = poly.length;
  for (let k = 0; k < L; k++) {
    const [x0, y0] = poly[k];
    const [x1, y1] = poly[(k + 1) % L];
    const cross = x0 * y1 - x1 * y0;
    area += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  area *= 0.5;
  if (Math.abs(area) < 1e-6) {
    let sx = 0;
    let sy = 0;
    for (const p of poly) {
      sx += p[0];
      sy += p[1];
    }
    return [sx / L, sy / L];
  }
  return [cx / (6 * area), cy / (6 * area)];
}

/** 링크 정규화: 빈 값은 null, 스킴 없으면 https:// 접두. */
function normalizeLink(link?: string): string | null {
  const trimmed = link?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/** 프로젝트 배열들을 합쳐 보로노이 셀로 변환(직렬화 가능). */
export function generateVoronoi(...groups: Project[][]): VoronoiCell[] {
  const projects = groups.flat();
  const n = projects.length;
  const rng = mulberry32(SEED);
  const rect: Pt[] = [
    [0, 0],
    [VIEW_W, 0],
    [VIEW_W, VIEW_H],
    [0, VIEW_H],
  ];

  let seeds: Pt[] = Array.from({ length: n }, () => [
    lerp(8, VIEW_W - 8, rng()),
    lerp(8, VIEW_H - 8, rng()),
  ]);

  // Lloyd 완화: 각 seed를 자기 셀 중심으로 이동 → 고르고 유기적인 셀.
  let cells: Pt[][] = [];
  for (let iter = 0; iter <= LLOYD; iter++) {
    cells = seeds.map((s) => cellOf(rect, s, seeds));
    if (iter < LLOYD) seeds = cells.map((c) => centroid(c));
  }

  return projects.map((project, i) => {
    const poly = cells[i];
    const [cx, cy] = centroid(poly);
    return {
      name: project.name,
      href: normalizeLink(project.link),
      points: poly,
      cx,
      cy,
      opacity: lerp(0.5, 0.95, rng()),
    };
  });
}
