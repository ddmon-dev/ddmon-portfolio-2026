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
  return items.map(({ name, link, thumb }) => ({
    name,
    href: normalizeLink(link),
    thumb: thumb ?? null,
  }));
}

const items = buildThumbnails([...HOMEPAGE_ARCHIVE, ...ECATALOG_ARCHIVE]);

export function ArchiveSection() {
  return (
    <Section title="Archive">
      <ArchiveWall items={items} />
    </Section>
  );
}
