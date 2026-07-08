import { ProfileSection } from './sections/profile';
import { SelectedProjectsSection } from './sections/selected-projects';
import { CurrentProjectsSection } from './sections/current-projects';
import { ArchiveSection } from './sections/archive';

export function HomePage({ company }: { company?: string }) {
  return (
    <main className="isolate space-y-40 pb-20 max-sm:space-y-25 max-sm:pb-5">
      <ProfileSection company={company} />
      <SelectedProjectsSection />
      <CurrentProjectsSection />
      <ArchiveSection />
    </main>
  );
}
