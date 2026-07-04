import type { Project } from './all-projects.data';

export interface ThumbItem {
  name: string;
  href: string | null;
  thumb: string | null;
  category: 'homepage' | 'ecatalog';
}

function normalizeLink(link?: string): string | null {
  const trimmed = link?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

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
