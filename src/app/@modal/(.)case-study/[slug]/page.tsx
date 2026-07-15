import { loadProject } from '@/app/_components/ui/project-detail/load-project';
import { caseStudies } from '@/app/_components/data/case-study';
import { ProjectDetail } from '@/app/_components/ui/project-detail/detail';
import { ProjectDetailActions } from '@/app/_components/ui/project-detail/detail-actions';
import { ProjectSheet } from '@/app/_components/ui/project-detail/project-sheet';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(slug => ({ slug }));
}

export default async function InterceptedProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await loadProject(slug);
  const index = caseStudies.indexOf(slug);

  return (
    <ProjectSheet slug={slug} title={project.title}>
      <ProjectDetail project={project} index={index} />
      <ProjectDetailActions links={project.links} mode="sheet" />
    </ProjectSheet>
  );
}
