import { type ReactNode } from 'react';
import Link from 'next/link';
import { HouseIcon, GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/button';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { type ProjectLinks } from '@/data/projects/types';

export function ProjectDetailActions({
  links,
  children,
}: {
  links?: ProjectLinks;
  children: ReactNode;
}) {
  return (
    <nav className="pointer-events-none sticky inset-x-0 bottom-0 z-10 flex justify-center p-4">
      <LiquidGlass className="pointer-events-auto flex justify-center gap-1 rounded-full p-3">
        {children}
        {links?.site && (
          <Button asChild size="sm" shape="pill" variant="secondary">
            <Link href={links.site} target="_blank" rel="noopener noreferrer">
              <HouseIcon />
              Visit Site
            </Link>
          </Button>
        )}
        {links?.repo && (
          <Button asChild size="sm" shape="pill" variant="secondary">
            <Link href={links.repo} target="_blank" rel="noopener noreferrer">
              <GithubLogoIcon />
              Visit Repo
            </Link>
          </Button>
        )}
      </LiquidGlass>
    </nav>
  );
}
