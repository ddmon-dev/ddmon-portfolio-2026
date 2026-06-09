import { notFound } from 'next/navigation';
import { getSelectedProject } from '@/app/_components/projects-section';
import { AppStoreProjectModal } from '@/app/_components/ui/app-store-project-card';

export default async function ProjectModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSelectedProject(slug);

  if (!project) notFound();

  return <AppStoreProjectModal project={project} />;
}
