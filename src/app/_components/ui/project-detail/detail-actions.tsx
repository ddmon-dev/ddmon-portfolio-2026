import { type ComponentProps } from 'react';
import Link from 'next/link';
import {
  HouseIcon,
  GithubLogoIcon,
  XIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/button';
import { BottomSheetClose } from '@/shared/ui/bottom-sheet/bottom-sheet';
import { type ProjectLinks } from './types';

export function ProjectDetailActions({
  links,
  mode,
}: {
  links?: ProjectLinks;
  mode: 'sheet' | 'page';
}) {
  return (
    <nav className="pointer-events-none sticky inset-x-0 bottom-0 z-10 flex justify-center p-4">
      <div className="pointer-events-auto flex justify-center gap-1 rounded-full bg-background/55 p-3 shadow-[0_0_3px_0_rgb(0,0,0,0.1)] backdrop-blur-md">
        {mode === 'sheet' ? (
          <BottomSheetClose asChild>
            <ActionButton aria-label="상세 닫기">
              <XIcon aria-hidden size={18} weight="light" />
              닫기
            </ActionButton>
          </BottomSheetClose>
        ) : (
          <ActionButton asChild>
            <Link href="/">
              <HouseIcon aria-hidden />
              홈으로
            </Link>
          </ActionButton>
        )}
        {links?.site && (
          <ActionButton asChild>
            <Link href={links.site} target="_blank" rel="noopener noreferrer">
              <HouseIcon />
              Visit Site
            </Link>
          </ActionButton>
        )}
        {links?.repo && (
          <ActionButton asChild>
            <Link href={links.repo} target="_blank" rel="noopener noreferrer">
              <GithubLogoIcon />
              Visit Repo
            </Link>
          </ActionButton>
        )}
      </div>
    </nav>
  );
}

function ActionButton(props: ComponentProps<typeof Button>) {
  return <Button size="sm" shape="pill" variant="secondary" {...props} />;
}
