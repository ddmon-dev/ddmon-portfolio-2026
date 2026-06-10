'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { XIcon, HouseIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { Button } from '@/shared/ui/button';
import { LiquidGlass } from '@/shared/ui/liquid-glass';

/**
 * 앱스토어 모달 하단 액션 내비게이션.
 * project-sheet의 SheetNav를 레퍼런스로, 모달 스크롤 컨테이너(`<article overflow-y-auto>`)
 * 기준 하단 중앙에 `sticky`로 고정한다. 모핑이 끝나갈 즈음 슬라이드업으로 등장하고
 * 닫힐 때 함께 사라진다(가시성은 부모의 `expanded`가 구동).
 * Visit Site/Repo는 아직 자리만 잡은 빈 링크다.
 */
export function AppStoreModalNav({
  expanded,
  onClose,
}: {
  expanded: boolean;
  onClose: () => void;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 24 }}
      transition={{ duration: 0.3, delay: expanded ? 0.35 : 0 }}
      className="pointer-events-none sticky inset-x-0 bottom-0 z-10 flex justify-center p-4"
    >
      <LiquidGlass className="pointer-events-auto flex justify-center gap-1 rounded-full p-3">
        <Button
          aria-label="모달 닫기"
          data-autofocus
          onClick={onClose}
          size="sm"
          shape="pill"
          variant="secondary"
        >
          <XIcon aria-hidden size={18} weight="light" />
          닫기
        </Button>
        <Button asChild size="sm" shape="pill" variant="secondary">
          <Link href="" target="_blank" rel="">
            <HouseIcon />
            Visit Site
          </Link>
        </Button>
        <Button asChild size="sm" shape="pill" variant="secondary">
          <Link href="" target="_blank" rel="">
            <GithubLogoIcon />
            Visit Repo
          </Link>
        </Button>
      </LiquidGlass>
    </motion.nav>
  );
}
