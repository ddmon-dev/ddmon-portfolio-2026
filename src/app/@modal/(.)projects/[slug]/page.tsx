import { loadProject } from '@/data/projects/load-project';
import { selectedProjects } from '@/app/_components/data/selected-projects';
import { ProjectDetail } from '@/app/_components/ui/project-gallery/detail';
import { ProjectDetailActions } from '@/app/_components/ui/project-gallery/detail-actions';
import { ProjectSheet } from '@/app/_components/ui/project-gallery/sheet';
import { SheetCloseButton } from '@/app/_components/ui/project-gallery/sheet-close-button';

export default async function InterceptedProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await loadProject(slug);
  const index = selectedProjects.indexOf(slug);

  return (
    <ProjectSheet slug={slug} title={project.title}>
      <ProjectDetail project={project} index={index} />
      <ProjectDetailActions links={project.links}>
        <SheetCloseButton />
      </ProjectDetailActions>
    </ProjectSheet>
  );
}
