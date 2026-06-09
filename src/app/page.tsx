import { ProfileSection } from './_components/profile-section';
import {
  AppStoreProjectModalSection,
  SelectedProjectsSection,
  SystemsAndTemplatesSection,
} from './_components/projects-section';
import { ProjectArchiveSection } from './_components/project-archive-section';
import { ContactSection } from './_components/contact-section';

export default function Home() {
  return (
    <main className="space-y-40 pt-40 pb-40">
      <ProfileSection />
      <SelectedProjectsSection />
      <AppStoreProjectModalSection />
      <SystemsAndTemplatesSection />
      <ProjectArchiveSection />
      <ContactSection />
    </main>
  );
}
