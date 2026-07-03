import { ProfileSection } from './_components/sections/profile';
import { SelectedProjectsSection } from './_components/sections/projects';
import { OtherProjectsSection } from './_components/sections/other-projects';
import { ArchiveSection } from './_components/sections/archive';
import { ContactSection } from './_components/sections/contact';

export default function Home() {
  return (
    <main className="space-y-40">
      <ProfileSection />
      <SelectedProjectsSection />
      <OtherProjectsSection />
      <ArchiveSection />
      <ContactSection />
    </main>
  );
}
