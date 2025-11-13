'use client';

import { useState } from 'react';
import { Container } from '@/shared/ui/container';
import { HOMEPAGE_PROJECTS, ECATALOG_PROJECTS, type Project } from '@/data/all-projects.data';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Pagination } from '@/shared/ui/pagination';

const PAGE_SIZE = 5;
const PAGINATION_RANGE = 5;

const ALL_PROJECTS = [...HOMEPAGE_PROJECTS, ...ECATALOG_PROJECTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
) satisfies Project[];

type NumberedProject = Project & { number: number };

export function AllProjects() {
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? ALL_PROJECTS.filter(project => project.category === selectedCategory)
    : ALL_PROJECTS;

  const numberedProjects = filteredProjects.map((project, index) => ({
    ...project,
    number: filteredProjects.length - index,
  }));

  const pageSize = PAGE_SIZE;
  const paginationRange = PAGINATION_RANGE;
  const paginatedProjects = numberedProjects.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className='py-16'>
      <Container className='space-y-6'>
        <h2 className='text-2xl font-bold text-center'>모든 프로젝트</h2>
        <Categories
          categories={[
            { label: 'All', value: null },
            { label: 'Web', value: 'homepage' },
            { label: 'E-Catalog', value: 'ecatalog' },
          ]}
          setPage={setPage}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AllProjectsList projects={paginatedProjects} />
        <Pagination
          dataCount={filteredProjects.length}
          pageSize={pageSize}
          paginationRange={paginationRange}
          page={page}
          setPage={setPage}
        />
      </Container>
    </section>
  );
}

function Categories({
  categories,
  setPage,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: { label: string; value: string | null }[];
  setPage: (page: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}) {
  const handleCategoryChange = (category: string | null) => {
    setPage(1);
    setSelectedCategory(category);
  };

  return (
    <nav className='flex gap-1 justify-center'>
      {categories.map(category => (
        <Button
          key={category.value}
          size='sm'
          variant={category.value === selectedCategory ? 'default' : 'secondary'}
          onClick={() => handleCategoryChange(category.value)}
        >
          {category.label}
        </Button>
      ))}
    </nav>
  );
}

function AllProjectsList({ projects }: { projects: NumberedProject[] }) {
  return (
    <ul className='divide-y border-y'>
      {projects.map((project, index) => (
        <li
          key={`${project.name}-${index}`}
          className='py-4'
        >
          <AllProjectsItem project={project} />
        </li>
      ))}
    </ul>
  );
}

function AllProjectsItem({ project }: { project: NumberedProject }) {
  return (
    <div className='grid grid-cols-[50px_1fr_100px] gap-2 items-center'>
      <span className='text-left text-xl font-bold'>{project.number}</span>
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
