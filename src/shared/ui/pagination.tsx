'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/shared/utils/utils';
import { Button } from '@/shared/ui/button';

interface PaginationProps {
  className?: string;
  dataCount: number;
  pageSize: number;
  paginationRange: number;
  page: number;
  setPage: (page: number) => void;
}

export function Pagination({
  className,
  dataCount,
  pageSize,
  paginationRange,
  page,
  setPage,
}: PaginationProps) {
  const totalPages = Math.ceil(dataCount / pageSize);
  const pageBlock = Math.ceil(page / paginationRange);
  const start = Math.max(1, (pageBlock - 1) * paginationRange + 1);
  const end = Math.min(pageBlock * paginationRange, totalPages);

  return (
    <nav className={cn('mt-10 flex gap-1 justify-center', className)}>
      <PagingController
        variant='first'
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
      <PagingController
        variant='prev'
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
      <div className='flex gap-1 px-2'>
        {Array.from({ length: end - start + 1 }).map((_, index) => (
          <PagingItem
            key={index}
            num={index + start}
            active={index + start === page}
            setPage={setPage}
          />
        ))}
      </div>
      <PagingController
        variant='next'
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
      <PagingController
        variant='last'
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
    </nav>
  );
}

interface PagingControllerProps {
  variant: 'first' | 'prev' | 'next' | 'last';
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

function PagingController({ variant, page, totalPages, setPage }: PagingControllerProps) {
  const { targetPage, disabled, icon, label } = {
    first: {
      targetPage: 1,
      disabled: page <= 1,
      icon: <ChevronsLeft />,
      label: '첫 페이지로',
    },
    prev: {
      targetPage: page - 1,
      disabled: page <= 1,
      icon: <ChevronLeft />,
      label: '이전 페이지로',
    },
    next: {
      targetPage: page + 1,
      disabled: page >= totalPages,
      icon: <ChevronRight />,
      label: '다음 페이지로',
    },
    last: {
      targetPage: totalPages,
      disabled: page >= totalPages,
      icon: <ChevronsRight />,
      label: '마지막 페이지로',
    },
  }[variant];

  return (
    <Button
      variant='outline'
      size='icon'
      className={disabled ? 'pointer-events-none' : ''}
      onClick={() => setPage(targetPage)}
    >
      {icon}
      <span className='sr-only'>{label}</span>
    </Button>
  );
}

interface PagingItemProps {
  num: number;
  active: boolean;
  setPage: (page: number) => void;
}

function PagingItem({ num, active, setPage }: PagingItemProps) {
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      className={active ? 'pointer-events-none' : ''}
      size='icon'
      onClick={() => setPage(num)}
    >
      {active && <span className='sr-only'>현재</span>}
      {num} <span className='sr-only'>페이지</span>
    </Button>
  );
}
