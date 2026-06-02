import type { Project } from '@/data/all-projects.data';

/**
 * 노드맵 레이아웃 순수 로직.
 * 크고 작은 원을 충돌 완화(relaxation)로 빈틈없이 맞물리게 채우는 "원 패킹".
 * 위치/크기 모두 컨테이너 폭 대비 비율로 내보내 어느 너비에서도 꽉 찬 밀도를 유지한다.
 * 결정적 PRNG라 SSR·CSR 마크업이 동일하다(하이드레이션 불일치 방지).
 */

export interface ArchiveNode {
  name: string;
  /** 정규화된 링크. 없으면 null → 클릭 비활성. */
  href: string | null;
  /** 중심 x (0~1, 컨테이너 폭 기준) */
  xRatio: number;
  /** 중심 y (0~1, 컨테이너 높이 기준) */
  yRatio: number;
  /** 지름 (컨테이너 폭 대비 0~1) */
  sizeRatio: number;
  /** 기본 투명도 0~1 */
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
const ASPECT = 16 / 5; // 컨테이너 종횡비 (배치 가상공간도 동일)
const FILL = 0.74; // 원 면적 합 / 영역 면적 — 클수록 빽빽
const RAW_MIN = 1; // 상대 반지름 최소
const RAW_MAX = 3.2; // 상대 반지름 최대 (변화 폭)
const SIZE_SKEW = 1.4; // >1이면 작은 원 다수 + 큰 원 소수
const PADDING_RATIO = 0.004; // 원 사이 여백 (폭 대비)
const ITERATIONS = 170; // 충돌 완화 반복 횟수

/**
 * 충돌 완화 기반 원 패킹.
 * - 반지름을 다양하게 뽑고, 면적 합이 영역의 FILL 비율이 되도록 일괄 스케일.
 * - 랜덤 초기 배치 후 겹치는 쌍을 밀어내고 영역 안으로 가두길 반복 → 빈틈없는 덩어리.
 */
export function generateScatter(count: number): Omit<ArchiveNode, 'name' | 'href'>[] {
  const rng = mulberry32(SEED);
  const VW = 1000;
  const VH = VW / ASPECT;

  const radii = Array.from({ length: count }, () => lerp(RAW_MIN, RAW_MAX, rng() ** SIZE_SKEW));
  const areaSum = radii.reduce((s, r) => s + Math.PI * r * r, 0);
  const scale = Math.sqrt((FILL * VW * VH) / areaSum);
  const R = radii.map((r) => r * scale);
  const pad = PADDING_RATIO * VW;

  const xs = R.map((r) => lerp(r, VW - r, rng()));
  const ys = R.map((r) => lerp(r, VH - r, rng()));

  for (let it = 0; it < ITERATIONS; it++) {
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = xs[j] - xs[i];
        const dy = ys[j] - ys[i];
        const d = Math.hypot(dx, dy) || 0.0001;
        const min = R[i] + R[j] + pad;
        if (d < min) {
          const push = (min - d) / 2;
          const ux = dx / d;
          const uy = dy / d;
          xs[i] -= ux * push;
          ys[i] -= uy * push;
          xs[j] += ux * push;
          ys[j] += uy * push;
        }
      }
    }
    for (let i = 0; i < count; i++) {
      xs[i] = Math.min(VW - R[i], Math.max(R[i], xs[i]));
      ys[i] = Math.min(VH - R[i], Math.max(R[i], ys[i]));
    }
  }

  return Array.from({ length: count }, (_, i) => ({
    xRatio: xs[i] / VW,
    yRatio: ys[i] / VH,
    sizeRatio: (2 * R[i]) / VW,
    opacity: lerp(0.62, 1, rng()),
  }));
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
