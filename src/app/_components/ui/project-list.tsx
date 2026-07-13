'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRightIcon,
  CaretDownIcon,
  CaretUpIcon,
} from '@phosphor-icons/react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { StackBadges } from '@/shared/ui/stack-badges';

export type ProjectListItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  contribution: string[];
  stacks: string[];
  href: string;
};

const COLLAPSED_COUNT = 3;

export function ProjectList({ items }: { items: ProjectListItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = items.slice(0, COLLAPSED_COUNT);
  const rest = items.slice(COLLAPSED_COUNT);
  const hasMore = rest.length > 0;

  return (
    <div>
      <ul className="divide-y divide-ash-light border-y border-ash-light">
        {visible.map(item => (
          <li key={item.id}>
            <Row item={item} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <>
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden" inert={!expanded}>
              <ul className="divide-y divide-ash-light border-b border-ash-light">
                {rest.map(item => (
                  <li key={item.id}>
                    <Row item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              shape="pill"
              onClick={() => setExpanded(prev => !prev)}
            >
              {expanded ? (
                <>
                  접기 <CaretUpIcon weight="bold" />
                </>
              ) : (
                <>
                  더보기 (+{rest.length}) <CaretDownIcon weight="bold" />
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function Row({ item }: { item: ProjectListItem }) {
  return (
    <div className="grid grid-cols-[288px_1fr] items-center gap-x-7 py-5 max-sm:grid-cols-1 max-sm:gap-y-4">
      <Image
        src={item.image}
        alt={`${item.title} 스크린샷`}
        width={576}
        height={360}
        sizes="(max-width: 640px) 100vw, 288px"
        className="aspect-16/10 w-full shrink-0 rounded-4xl bg-ash-lighter/20 border border-border object-cover"
      />
      <div className="flex-1 space-y-2 max-sm:px-4 max-sm:space-y-3">
        <div className="space-y-1 max-sm:space-y-0">
          <h3 className="font-bold text-xl text-ash-darker max-sm:text-lg">
            {item.title}
          </h3>
          <p className="text-base text-ash-dark">{item.description}</p>
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap gap-1">
            {item.contribution.map(cont => (
              <Badge
                key={cont}
                shape="pill"
                variant="outline"
                className="px-2.5 py-1 text-xs"
              >
                {cont}
              </Badge>
            ))}
          </div>
          <StackBadges stacks={item.stacks} />
        </div>
        <div className="flex justify-start pt-1">
          <Button
            asChild
            variant="outline"
            size="sm"
            shape="pill"
            className="bg-ash-100 border-ash-300 hover:border-primary hover:text-primary hover:bg-transparent"
          >
            <Link href={item.href} target="_blank" rel="noopener noreferrer">
              사이트 방문 <ArrowUpRightIcon weight="bold" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
