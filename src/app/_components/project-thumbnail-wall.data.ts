import type { Project } from '@/data/all-projects.data';

/**
 * 썸네일 월 데이터 빌더.
 * 각 프로젝트의 실제 사이트 스크린샷을 썸네일로 매핑한다.
 */

export interface ThumbItem {
  name: string;
  href: string | null;
  /** 썸네일 이미지 URL. href 없으면 null → 폴백 타일. */
  thumb: string | null;
  category: 'homepage' | 'ecatalog';
}

/** 링크 정규화: 빈 값은 null, 스킴 없으면 https:// 접두. */
function normalizeLink(link?: string): string | null {
  const trimmed = link?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * 썸네일 아이템 목록 생성.
 * 스크린샷은 WordPress mShots로 생성한다(첫 요청 시 생성 → 이후 캐시).
 * 운영 시에는 한 번 캡처해 정적 이미지로 교체하는 것을 권장한다.
 */
export function buildThumbnails(...groups: Project[][]): ThumbItem[] {
  return groups.flat().map((p) => {
    const href = normalizeLink(p.link);
    return {
      name: p.name,
      href,
      category: p.category,
      thumb: href ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(href)}?w=500&h=313` : null,
    };
  });
}
