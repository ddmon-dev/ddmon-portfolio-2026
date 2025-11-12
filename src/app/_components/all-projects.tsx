'use client';

import { useState } from 'react';
import { Container } from '@/shared/ui/container';
import { HOMEPAGE_PROJECTS, ECATALOG_PROJECTS, type Project } from '@/data/all-projects.data';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';

const ALL_PROJECTS = [...HOMEPAGE_PROJECTS, ...ECATALOG_PROJECTS] satisfies Project[];

export function AllProjects() {
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sortedProjects = ALL_PROJECTS.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredProjects = selectedCategory
    ? sortedProjects.filter(project => project.category === selectedCategory)
    : sortedProjects;

  const startIndex = 1;
  const pageSize = 10;
  const totalPages = Math.ceil(filteredProjects.length / pageSize);

  const paginatedProjects = filteredProjects.slice(
    totalPages * (page - 1) + startIndex - 1,
    totalPages * page + startIndex - 1
  );

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <section className='py-16'>
      <Container
        className='space-y-6'
        size='sm'
      >
        <h2 className='text-2xl font-bold text-center'>모든 프로젝트</h2>
        <nav className='flex gap-1 justify-center'>
          <Button
            size='sm'
            onClick={() => handleCategoryChange(null)}
          >
            All
          </Button>
          <Button
            size='sm'
            onClick={() => handleCategoryChange('homepage')}
          >
            Web
          </Button>
          <Button
            size='sm'
            onClick={() => handleCategoryChange('ecatalog')}
          >
            E-Catalog
          </Button>
        </nav>
        <AllProjectsList projects={paginatedProjects} />
        <div className='text-center'>
          <Button onClick={() => handlePageChange(page + 1)}>더 보기</Button>
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
          key={`${project.name}-${index}`}
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
          <span className='block text-sm text-muted-foreground'>{project.date}</span>
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
