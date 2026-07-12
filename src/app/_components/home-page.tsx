import { ProfileSection } from './sections/profile';
import { CaseStudySection } from './sections/case-study';
import { ProjectsSection } from './sections/projects';
import { ArchiveSection } from './sections/archive';

export function HomePage({ recipient }: { recipient?: string }) {
  return (
    <main className="isolate space-y-40 pb-20 max-sm:space-y-25 max-sm:pb-5">
      <ProfileSection recipient={recipient} />
      <CaseStudySection />
      <ProjectsSection />
      <ArchiveSection />
    </main>
  );
}
