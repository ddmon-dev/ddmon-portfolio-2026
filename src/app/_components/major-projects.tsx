import { getAllProjects, type Project } from '@/shared/lib/mdx';
import { Container } from '@/shared/ui/container';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from '@/shared/ui/dialog';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { cn } from '@/shared/utils/utils';

import { SquareArrowOutUpRight, XIcon } from 'lucide-react';

export function MajorProjects() {
  const projects = getAllProjects();

  return (
    <section className='py-16'>
      <Container className='space-y-6'>
        <h2 className='text-2xl font-bold text-center'>주요 프로젝트</h2>
        <ProjectList projects={projects} />
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
            <Badge key={skill}>{skill}</Badge>
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
              'w-full sm:max-w-3xl'
            )}
          >
            <div className='overflow-y-auto max-h-screen scrollbar-hidden py-8'>
              <div className='grid gap-12 rounded-lg border px-4 md:px-6 lg:px-8 shadow-lg bg-background'>
                <DialogHeader className='space-y-2 pt-14'>
                  <DialogTitle className='text-3xl mb-6'>{project.name} </DialogTitle>
                  <ul className='space-y-5 text-base'>
                    <ViewHeadRow label='개발 기간'>
                      <Badge>
                        {project.startDate} - {project.endDate}
                      </Badge>
                    </ViewHeadRow>
                    <ViewHeadRow label='사용 기술'>
                      {project.skills.map(skill => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </ViewHeadRow>
                    <ViewHeadRow label='기여도'>
                      <Badge>100%</Badge>
                    </ViewHeadRow>
                    {project.links && (
                      <ViewHeadRow label='링크'>
                        {project.links.map(link => (
                          <Button
                            key={link.url}
                            variant='outline'
                            size='sm'
                            asChild
                          >
                            <Link
                              href={link.url}
                              target='_blank'
                            >
                              {link.label}
                              <SquareArrowOutUpRight className='size-3' />
                            </Link>
                          </Button>
                        ))}
                      </ViewHeadRow>
                    )}
                  </ul>
                </DialogHeader>
                <Separator />
                <div className='prose prose-neutral dark:prose-invert max-w-none pb-8'>
                  <MDXRemote source={project.content} />
                </div>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                size='sm'
                className='size-10 rounded-full absolute top-8 left-full ml-4'
              >
                <XIcon className='size-5' />
              </Button>
            </DialogClose>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function ViewHeadRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className='space-y-1'>
      <div className='font-bold'>{label}</div>
      <div className='space-x-0.5'>{children}</div>
    </li>
  );
}
