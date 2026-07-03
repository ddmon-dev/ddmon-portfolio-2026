import { ProfileSection } from './_components/sections/profile';
import { SelectedProjectsSection } from './_components/sections/selected-projects';
import { CurrentProjectsSection } from './_components/sections/current-projects';
import { ArchiveSection } from './_components/sections/archive';
import { ContactSection } from './_components/sections/contact';

export default function Home() {
  return (
    <main className="space-y-40">
      <ProfileSection />
      <SelectedProjectsSection />
      <CurrentProjectsSection />
      <ArchiveSection />
      <ContactSection />
    </main>
  );
}
