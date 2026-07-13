import type { Metadata } from 'next';
import { Container } from '@/shared/ui/container';
import { loadProject } from '@/app/_components/ui/project-detail/load-project';
import { caseStudies } from '@/app/_components/data/case-study';
import { ProjectDetail } from '@/app/_components/ui/project-detail/detail';
import { ProjectDetailActions } from '@/app/_components/ui/project-detail/detail-actions';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(slug => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);

  return {
    title: project.title,
    description: project.category,
    openGraph: { images: [project.image.src] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await loadProject(slug);
  const index = caseStudies.indexOf(slug);

  return (
    <Container as="main" className="border-b border-border pb-20 max-sm:px-0">
      <ProjectDetail project={project} index={index} titleAs="h1" />
      <ProjectDetailActions links={project.links} mode="page" />
    </Container>
  );
}
