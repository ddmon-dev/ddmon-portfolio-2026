import { Section } from '../ui/section';
import {
  ECATALOG_ARCHIVE,
  HOMEPAGE_ARCHIVE,
  type ArchiveItem,
} from '../data/archive';
import { ArchiveWall, type ThumbItem } from '../ui/archive-wall';

function normalizeLink(link?: string): string | null {
  const trimmed = link?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function buildThumbnails(items: ArchiveItem[]): ThumbItem[] {
  return items.map(({ name, link }) => {
    const href = normalizeLink(link);
    return {
      name,
      href,
      thumb: href
        ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(href)}?w=500&h=313`
        : null,
    };
  });
}

const items = buildThumbnails([...HOMEPAGE_ARCHIVE, ...ECATALOG_ARCHIVE]);

export function ArchiveSection() {
  return (
    <Section
      title="Project Archive"
      description={
        <>
          150건의 프로젝트, 클라이언트, 엣지 케이스, 트러블슈팅. <br />
          주어진 환경에서의 문제 해결, 구현에만 그치지 않는 제품의 완성. <br />
          그리고 그 다음을 위한 목표 설정과 수행.
        </>
      }
    >
      <ArchiveWall items={items} />
    </Section>
  );
}
