import { Container } from '@/shared/ui/container';
import { ALL_PROJECTS, type Project } from '@/data/all-projects.data';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export function AllProjects() {
  return (
    <section className='py-16'>
      <Container className='space-y-6'>
        <h2 className='text-2xl font-bold text-center'>모든 프로젝트</h2>
        <nav className='flex gap-1 justify-center'>
          <Button size='sm'>All</Button>
          <Button size='sm'>Web</Button>
          <Button size='sm'>E-Catalog</Button>
        </nav>
        <AllProjectsList projects={ALL_PROJECTS} />
        <div className='text-center'>
          <Button>더 보기</Button>
        </div>
      </Container>
    </section>
  );
}

function AllProjectsList({ projects }: { projects: Project[] }) {
  return (
    <ul className='divide-y border-y'>
      {projects.map((project, index) => (
        <li
          key={project.id}
          className='py-4'
        >
          <AllProjectsItem
            project={project}
            index={projects.length - index}
          />
        </li>
      ))}
    </ul>
  );
}

function AllProjectsItem({ project, index }: { project: Project; index: number }) {
  return (
    <div className='grid grid-cols-[50px_1fr_100px] gap-2 items-center'>
      <span className='text-left text-xl font-bold'>{index}</span>
      <div className='space-y-1'>
        <h3 className='text-lg font-semibold'>{project.name}</h3>
        <div className='flex gap-2 items-center'>
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
      <div>
        {project.link && (
          <Link
            href={project.link}
            target='_blank'
          >
            Visit Site
          </Link>
        )}
      </div>
    </div>
  );
}
