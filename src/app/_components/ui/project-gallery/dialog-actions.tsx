'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { XIcon, HouseIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { Button } from '@/shared/ui/button';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { type ProjectLinks } from './types';

export function ProjectDialogActions({
  onClose,
  links,
}: {
  onClose: () => void;
  links?: ProjectLinks;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.35 } }}
      exit={{ opacity: 0, y: 24, transition: { duration: 0.25 } }}
      className="pointer-events-none sticky inset-x-0 bottom-0 z-10 flex justify-center p-4"
    >
      <LiquidGlass className="pointer-events-auto flex justify-center gap-1 rounded-full p-3">
        <Button
          aria-label="다이얼로그 닫기"
          onClick={onClose}
          size="sm"
          shape="pill"
          variant="secondary"
        >
          <XIcon aria-hidden size={18} weight="light" />
          닫기
        </Button>
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
    </motion.nav>
  );
}
