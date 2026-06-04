'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type MouseEvent, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HouseIcon, GithubLogoIcon, ListIcon } from '@phosphor-icons/react';
import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';
import { SkillBadgeRow } from './skill-badge';
import { useFocusTrap } from './use-focus-trap';
import { type Project } from './types';
import { type ProjectGallery } from './use-project-gallery';

/**
 * 펼쳐진 상세 시트. 세 레이어로 구성된다.
 * 1. backdrop : 흰 배경 레이어(z-40). 열 때 페이드인, 닫을 때 페이드아웃해 그리드를 드러낸다.
 * 2. 패널     : 상세(z-50). 이미지만 layoutId로 카드 ↔ 시트 morph, 헤더/본문은 morph 완료 후 페이드인.
 * 3. 네비     : 닫기 버튼(z-70).
 * 상태/타이밍은 모두 useProjectGallery가 쥐고, 여기서는 렌더만 한다.
 */
export function ProjectSheet({
  gallery,
  projects,
}: {
  gallery: ProjectGallery;
  projects: Project[];
}) {
  const { open, activeIndex, expanded, idBase } = gallery;

  // 시트가 열린 동안 Tab 포커스를 시트 안(패널 + 네비)에 가둔다.
  const trapRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, trapRef);

  return (
    <>
      {/*
        backdrop: 그리드를 가린다. 닫을 때 천천히 페이드아웃하며, 그동안 활성 카드는 이 위로
        승격(z-50)돼 이미지 morph가 가려지지 않는다. 페이드아웃이 끝나면 승격을 원복한다.
      */}
      <AnimatePresence onExitComplete={gallery.onBackdropExitComplete}>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.25 } }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-40 h-dvh bg-background"
          />
        )}
      </AnimatePresence>

      <div ref={trapRef}>
        {open && (
          <div className="fixed inset-x-0 top-0 z-50 h-dvh overflow-x-clip overflow-y-auto">
            <ProjectPanel
              project={projects[activeIndex]}
              morphId={`${idBase}-${activeIndex}`}
              expanded={expanded}
              onMorphComplete={gallery.onMorphComplete}
            />
          </div>
        )}
        <AnimatePresence>
          {open && <SheetNav key="nav" gallery={gallery} />}
        </AnimatePresence>
      </div>
    </>
  );
}

function ProjectPanel({
  project,
  morphId,
  expanded,
  onMorphComplete,
}: {
  project: Project;
  morphId: string;
  expanded: boolean;
  onMorphComplete: () => void;
}) {
  return (
    <Container
      as={motion.article}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(event: MouseEvent) => event.stopPropagation()}
      className="min-h-dvh space-y-12 pb-30 max-sm:px-0"
    >
      <motion.div
        layoutId={`${morphId}-image`}
        onLayoutAnimationComplete={onMorphComplete}
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
        className="overflow-hidden"
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          className="aspect-video w-full object-cover"
        />
      </motion.div>

      <div className="space-y-8">
        <motion.header
          initial={false}
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="px-6 space-y-6"
        >
          <div className="space-y-1">
            <h3 className="mx-auto w-fit text-center font-bold text-4xl leading-[1.3]">
              {project.title}
            </h3>
            <p className="mx-auto w-fit text-center text-black/60 text-xl leading-normal">
              {project.category}
            </p>
          </div>
          <section className="space-y-3">
            <h4 className="block text-center font-bold text-muted-foreground/60">
              USED STACK
            </h4>
            <SkillBadgeRow skills={project.skills} full className="mx-auto" />
          </section>
        </motion.header>

        <motion.div
          initial={false}
          animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-border"
        />

        <motion.div
          initial={false}
          animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-8 px-6"
        >
          {project.content}
        </motion.div>
      </div>
    </Container>
  );
}

function SheetNav({ gallery }: { gallery: ProjectGallery }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, y: '100%', transition: { duration: 0.2, delay: 0 } }}
      transition={{ duration: 0.2, delay: 0.25 }}
      className="fixed bottom-0 inset-x-0 z-70 flex gap-2 items-center pointer-events-none"
    >
      <Container className="flex justify-center py-4">
        <div className="flex justify-center gap-1 pointer-events-auto">
          <Button
            aria-label="시트 닫기"
            data-autofocus
            onClick={gallery.close}
            size="sm"
            shape="pill"
            variant="secondary"
          >
            <ListIcon aria-hidden size={18} weight="light" />
            목록으로
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
        </div>
      </Container>
    </motion.nav>
  );
}
