import type { Project } from '@/data/all-projects.data';

/**
 * 노드맵 레이아웃 순수 로직.
 * 좌표/크기는 결정적 PRNG로 생성해 SSR·CSR이 동일한 마크업을 만든다(하이드레이션 불일치 방지).
 * 좌표는 0~1 비율로만 다루고, 실제 px 배치는 컴포넌트에서 CSS %로 처리한다.
 */

export interface ArchiveNode {
  name: string;
  /** 정규화된 링크. 없으면 null → 클릭 비활성. */
  href: string | null;
  /** 가로 위치 비율 0~1 */
  xRatio: number;
  /** 세로 위치 비율 0~1 (0=위, 1=아래) */
  yRatio: number;
  /** 노드 지름 px (기본 크기, 마우스 스케일 전) */
  size: number;
  /** 기본 투명도 0~1 (단색 깊이감) */
  opacity: number;
}

/** mulberry32 — 32bit 시드 기반 결정적 난수. 동일 시드는 항상 동일 시퀀스. */
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

/** 레이아웃 튜닝 상수 — 육안으로 조절하는 지점. */
const SEED = 0x9e3779b9;
const MIN_SIZE = 8;
const MAX_SIZE = 32;
const SIZE_SKEW = 1.15; // 1에 가까울수록 중·대형 노드 비중↑ (덩어리감)
const clamp = (v: number) => Math.min(0.98, Math.max(0.02, v));

/**
 * 무작위 배치. 영역 전체에 노드를 균등 랜덤으로 흩뿌린다(결정적 PRNG).
 */
export function generateScatter(count: number): Omit<ArchiveNode, 'name' | 'href'>[] {
  const rng = mulberry32(SEED);
  return Array.from({ length: count }, () => ({
    xRatio: clamp(rng()),
    yRatio: clamp(rng()),
    size: lerp(MIN_SIZE, MAX_SIZE, rng() ** SIZE_SKEW),
    opacity: lerp(0.62, 1, rng()),
  }));
}

/**
 * 각 노드를 가까운 이웃 k개와 잇는 장식용 엣지 목록(중복 제거).
 * 관계를 뜻하지 않고 옵시디언 웹 느낌의 시각 구조/밀도를 만든다.
 * 컨테이너가 가로로 길어 x 거리가 과대평가되므로 ASPECT_X로 보정한다.
 */
const ASPECT_X = 3;

export function computeNearestEdges(
  nodes: Pick<ArchiveNode, 'xRatio' | 'yRatio'>[],
  k = 3,
): [number, number][] {
  const pts = nodes.map((n) => ({ x: n.xRatio * ASPECT_X, y: n.yRatio }));
  const seen = new Set<number>();
  const edges: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    const dists = [];
    for (let j = 0; j < pts.length; j++) {
      if (i === j) continue;
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      dists.push({ j, d: dx * dx + dy * dy });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let n = 0; n < Math.min(k, dists.length); n++) {
      const j = dists[n].j;
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);
      const key = lo * nodes.length + hi; // 쌍 중복 제거 키
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([lo, hi]);
      }
    }
  }
  return edges;
}

/** 링크 정규화: 빈 값은 null, 스킴 없으면 https:// 접두. */
function normalizeLink(link?: string): string | null {
  const trimmed = link?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/** 프로젝트 배열들을 합쳐 좌표/크기/링크를 부여한 노드 배열(직렬화 가능)로 변환. */
export function normalizeProjects(...groups: Project[][]): ArchiveNode[] {
  const projects = groups.flat();
  const scatter = generateScatter(projects.length);
  return projects.map((project, i) => ({
    name: project.name,
    href: normalizeLink(project.link),
    ...scatter[i],
  }));
}
