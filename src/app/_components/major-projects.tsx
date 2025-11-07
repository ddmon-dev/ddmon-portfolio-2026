import { MAJOR_PROJECTS, type Project } from '@/data/major-projects.data';
import { Container } from '@/shared/ui/container';
import Link from 'next/link';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
} from '@/shared/ui/dialog';
import { cn } from '@/shared/utils/utils';

export function MajorProjects() {
  return (
    <section className='py-16'>
      <Container className='space-y-6'>
        <h2 className='text-2xl font-bold text-center'>주요 프로젝트</h2>
        <ProjectList projects={MAJOR_PROJECTS} />
      </Container>
    </section>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  if (projects?.length === 0) return null;

  return (
    <ul className='grid grid-cols-3 gap-4'>
      {projects.map(project => (
        <li key={project.name}>
          <ProjectViewDialog project={project}>
            <ProjectItem project={project} />
          </ProjectViewDialog>
        </li>
      ))}
    </ul>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <div className='space-y-3 text-left'>
      <div className='bg-secondary aspect-square' />
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>{project.name}</h3>
        <p className='text-sm text-muted-foreground'>{project.summary}</p>
        <span className='block text-sm text-muted-foreground'>
          {project.startDate} ~ {project.endDate}
        </span>
        <div className='flex flex-wrap gap-1'>
          {project.skills.map(skill => (
            <span
              key={skill}
              className='bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectViewDialog({ children, project }: { children: React.ReactNode; project: Project }) {
  return (
    <Dialog>
      <DialogTrigger className='block w-full'>{children}</DialogTrigger>
      <DialogPortal data-slot='dialog-portal'>
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot='dialog-content'
          className='group'
        >
          <div
            className={cn(
              'duration-200',
              'group-data-[state=open]:animate-in group-data-[state=closed]:animate-out',
              'group-data-[state=closed]:fade-out-0 group-data-[state=open]:fade-in-0',
              'group-data-[state=closed]:zoom-out-95 group-data-[state=open]:zoom-in-95',
              'fixed top-[50%] left-[50%] z-50',
              'translate-x-[-50%] translate-y-[-50%]',
              'w-full sm:max-w-5xl',
              'overflow-y-auto max-h-screen scrollbar-hidden py-8'
            )}
          >
            <div className='grid gap-4 rounded-lg border px-4 md:px-6 lg:px-8 shadow-lg bg-background'>
              <DialogHeader className='sticky -top-8 z-10 bg-background space-y-2 pt-8 pb-6'>
                <DialogTitle>{project.name}</DialogTitle>
                <div className='flex gap-2 items-center'>
                  <span className='bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-xs'>
                    {project.startDate} ~ {project.endDate}
                  </span>
                  <div className='flex flex-wrap gap-1'>
                    {project.skills.map(skill => (
                      <span
                        key={skill}
                        className='bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {project.links &&
                    project.links.map(link => (
                      <div key={link.url}>
                        <Link
                          href={link.url}
                          target='_blank'
                        >
                          {link.label}
                        </Link>
                      </div>
                    ))}
                </div>
              </DialogHeader>
              <div className='space-y-4'>
                <div className='bg-secondary aspect-video' />
                Project Content. <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt quod deleniti
                vitae earum, ex voluptates aliquid fugit, consequuntur eum molestias quisquam minus
                odio nostrum ab cumque nam perferendis ipsam esse? Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Deserunt quod deleniti vitae earum, ex voluptates
                aliquid fugit, consequuntur eum molestias quisquam minus odio nostrum ab cumque nam
                perferendis ipsam esse? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt quod deleniti vitae earum, ex voluptates aliquid fugit, consequuntur eum
                molestias quisquam minus odio nostrum ab cumque nam perferendis ipsam esse? Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Deserunt quod deleniti vitae
                earum, ex voluptates aliquid fugit, consequuntur eum molestias quisquam minus odio
                nostrum ab cumque nam perferendis ipsam esse? Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Deserunt quod deleniti vitae earum, ex voluptates
                aliquid fugit, consequuntur eum molestias quisquam minus odio nostrum ab cumque nam
                perferendis ipsam esse? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt quod deleniti vitae earum, ex voluptates aliquid fugit, consequuntur eum
                molestias quisquam minus odio nostrum ab cumque nam perferendis ipsam esse?
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
