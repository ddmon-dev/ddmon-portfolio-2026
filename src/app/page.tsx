import { IntroHero } from './_components/intro-hero';
import { CoreCompetencies } from './_components/core-competencies';
import { MySkills } from './_components/my-skills';
import { CareerInfo, StudyInfo } from './_components/careers';
import { MajorProjects } from './_components/major-projects';
import { AllProjects } from './_components/all-projects';
import { ContactMe } from './_components/contact-me';

export default function Home() {
  return (
    <>
      <IntroHero />
      <CoreCompetencies />
      <MySkills />
      <CareerInfo />
      <StudyInfo />
      <MajorProjects />
      <AllProjects />
      <ContactMe />
    </>
  );
}
