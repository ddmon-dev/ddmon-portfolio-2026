import { notFound } from 'next/navigation';
import {
  getSelectedProject,
  getSelectedProjectSlugs,
} from '@/app/_components/projects-section';
import { AppStoreProjectPage } from '@/app/_components/ui/app-store-project-card';

export function generateStaticParams() {
  return getSelectedProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSelectedProject(slug);

  if (!project) notFound();

  return <AppStoreProjectPage project={project} />;
}
