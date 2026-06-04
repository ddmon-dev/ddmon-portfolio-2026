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
 * 펼쳐진 상세 시트. 두 레이어로 구성된다.
 * 1. backdrop : 모달과 분리된 독립 배경 레이어. 닫을 때 천천히 페이드아웃.
 * 2. 패널     : layoutId를 가진 단일 패널. 연 카드에서 morph해 자라나고, 닫으면 그 카드로 돌아간다.
 *
 * 상태/타이밍은 모두 useProjectGallery가 쥐고 있고, 여기서는 그 값으로 렌더만 한다.
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
      <AnimatePresence onExitComplete={gallery.onBackdropExitComplete}>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.25, delay: 0.25 },
            }}
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
      as={motion.div}
      layoutId={morphId}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(event: MouseEvent) => event.stopPropagation()}
      onLayoutAnimationComplete={onMorphComplete}
      className="min-h-dvh space-y-12 pb-30"
    >
      <motion.div
        layoutId={`${morphId}-image`}
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
        <header className="px-6 gap-4">
          <div className="space-y-6">
            <div className="space-y-1">
              <motion.h3
                layoutId={`${morphId}-title`}
                className="mx-auto w-fit text-center font-bold text-4xl leading-[1.3]"
              >
                {project.title}
              </motion.h3>
              <motion.p
                layoutId={`${morphId}-category`}
                className="mx-auto w-fit text-center text-black/60 text-xl leading-normal"
              >
                {project.category}
              </motion.p>
            </div>
            <SkillBadgeRow
              skills={project.skills}
              layoutId={`${morphId}-skills`}
              className="mx-auto"
            />
          </div>
        </header>

        <motion.div
          initial={false}
          animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.35 }}
          className="border-t border-border"
        />

        <motion.div
          initial={false}
          animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.35 }}
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
