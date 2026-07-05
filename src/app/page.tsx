import { ProfileSection } from './_components/sections/profile';
import { SelectedProjectsSection } from './_components/sections/selected-projects';
import { CurrentProjectsSection } from './_components/sections/current-projects';
import { ArchiveSection } from './_components/sections/archive';

export default function Home() {
  return (
    <main className="isolate space-y-40 pb-20 max-sm:space-y-25 max-sm:pb-5">
      <ProfileSection />
      <SelectedProjectsSection />
      <CurrentProjectsSection />
      <ArchiveSection />
    </main>
  );
}
