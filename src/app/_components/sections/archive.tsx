import { Section } from '../ui/section';
import { ECATALOG_PROJECTS, HOMEPAGE_PROJECTS } from '@/data/all-projects.data';
import { ArchiveWall } from '../ui/archive-wall';
import { buildThumbnails } from '../data/archive';

const items = buildThumbnails(HOMEPAGE_PROJECTS, ECATALOG_PROJECTS);

export function ArchiveSection() {
  return (
    <Section title="Project Archive">
      <ArchiveWall items={items} />
    </Section>
  );
}
