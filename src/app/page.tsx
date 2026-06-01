import { IntroHero } from './_components/intro-hero';
import { About } from './_components/about';
import { SelectedProjects, SystemsAndTemplates } from './_components/projects';
import { ProjectArchive } from './_components/project-archive';
import { Contact } from './_components/contact';

export default function Home() {
  return (
    <main className="space-y-20">
      <IntroHero />
      <About />
      <SelectedProjects />
      <SystemsAndTemplates />
      <ProjectArchive />
      <Contact />
    </main>
  );
}
