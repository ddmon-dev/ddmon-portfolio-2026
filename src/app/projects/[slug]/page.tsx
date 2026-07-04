import type { Metadata } from 'next';
import { Container } from '@/shared/ui/container';
import { loadProject } from '@/app/_components/ui/project-detail/load-project';
import { selectedProjects } from '@/app/_components/data/selected-projects';
import { ProjectDetail } from '@/app/_components/ui/project-detail/detail';
import { ProjectDetailActions } from '@/app/_components/ui/project-detail/detail-actions';

export const dynamicParams = false;

export function generateStaticParams() {
  return selectedProjects.map(slug => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);

  return {
    title: `${project.title} | DDmon Portfolio`,
    description: project.category,
    openGraph: { images: [project.image.src] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await loadProject(slug);
  const index = selectedProjects.indexOf(slug);

  return (
    <Container as="main" className="pb-16">
      <ProjectDetail project={project} index={index} />
      <ProjectDetailActions links={project.links} mode="page" />
    </Container>
  );
}
