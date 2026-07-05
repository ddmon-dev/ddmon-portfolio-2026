import { ProfileSideDecoration } from './_components/ui/profile-side-decoration';
import { ProfileSection } from './_components/sections/profile';
import { SelectedProjectsSection } from './_components/sections/selected-projects';
import { CurrentProjectsSection } from './_components/sections/current-projects';
import { ArchiveSection } from './_components/sections/archive';

export default function Home() {
  return (
    <main className="isolate space-y-40 pb-20 max-sm:space-y-25 max-sm:pb-5">
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 right-0 -z-10 h-dvh w-24 sm:hidden"
      >
        <ProfileSideDecoration trackScrollbar density={2} />
      </div>
      <ProfileSection />
      <SelectedProjectsSection />
      <CurrentProjectsSection />
      <ArchiveSection />
    </main>
  );
}
