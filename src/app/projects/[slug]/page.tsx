import type { Metadata } from 'next';
import Link from 'next/link';
import { HouseIcon } from '@phosphor-icons/react/dist/ssr';
import { loadProject } from '@/data/projects/load-project';
import { selectedProjects } from '@/app/_components/data/selected-projects';
import { ProjectDetail } from '@/app/_components/ui/project-gallery/detail';
import { ProjectDetailActions } from '@/app/_components/ui/project-gallery/detail-actions';
import { Button } from '@/shared/ui/button';

export const dynamicParams = false;

export function generateStaticParams() {
  return selectedProjects.map((slug) => ({ slug }));
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
    <main className="pt-28 pb-16 max-sm:pt-24">
      <article
        aria-label={project.title}
        className="mx-auto w-full max-w-3xl overflow-hidden rounded-4xl border border-border bg-background max-sm:rounded-none max-sm:border-x-0"
      >
        <ProjectDetail project={project} index={index} />
        <ProjectDetailActions links={project.links}>
          <Button asChild size="sm" shape="pill" variant="secondary">
            <Link href="/">
              <HouseIcon aria-hidden />
              홈으로
            </Link>
          </Button>
        </ProjectDetailActions>
      </article>
    </main>
  );
}
