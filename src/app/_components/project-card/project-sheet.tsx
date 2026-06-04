'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type MouseEvent, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HouseIcon, GithubLogoIcon, ListIcon } from '@phosphor-icons/react';
import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';
import { SkillBadge, SkillBadgeRow } from './skill-badge';
import { DetailSection } from './detail-section';
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
      {/*
        배경 페이드아웃: 닫을 때 카드 복귀와 동시에 천천히 드러난다. 카드는 backdropVisible
        동안 z-50으로 이 위에 있어 페이드아웃 내내 가려지지 않는다(깜빡임 없음).
      */}
      <AnimatePresence onExitComplete={gallery.onBackdropExitComplete}>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, delay: 0.25 },
            }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-40 h-dvh bg-background"
          />
        )}
      </AnimatePresence>

      {/* 포커스 트랩 컨테이너 — 네비 페이드아웃을 살리려 항상 마운트하고, 내부는 open일 때만 렌더. */}
      <div ref={trapRef}>
        {open && (
          <div
            onClick={gallery.close}
            className="fixed inset-x-0 top-0 z-50 h-dvh overflow-x-clip overflow-y-auto"
          >
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
      className="min-h-dvh space-y-8 pb-10 sm:pb-14"
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
          className="aspect-video w-full bg-black/30 object-cover"
        />
      </motion.div>

      <div className="space-y-8 divide-y divide-black/10">
        <header className="pb-6 px-4 flex gap-4">
          <div className="space-y-6">
            <div className="space-y-1 px-1">
              <motion.h3
                layoutId={`${morphId}-title`}
                className="w-fit font-bold text-4xl leading-[1.3]"
              >
                {project.title}
              </motion.h3>
              <motion.p
                layoutId={`${morphId}-category`}
                className="w-fit text-black/60 text-xl leading-normal translate-x-0.5"
              >
                {project.category}
              </motion.p>
            </div>
            <SkillBadgeRow
              skills={project.skills}
              layoutId={`${morphId}-skills`}
            />
          </div>
          <div className="shrink-0 ml-auto flex flex-col gap-y-2">
            <span>2024.08, 1 month</span>
            <span>기여도 : 100%</span>
            <nav className="mt-auto flex gap-2">
              <Button asChild size="sm" shape="pill" variant="outline">
                <Link href="" target="_blank" rel="">
                  <HouseIcon />
                  Visit Site
                </Link>
              </Button>
              <Button asChild size="sm" shape="pill" variant="outline">
                <Link href="" target="_blank" rel="">
                  <GithubLogoIcon />
                  Visit Repo
                </Link>
              </Button>
            </nav>
          </div>
        </header>

        <motion.div
          initial={false}
          animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
          className="space-y-8 px-4"
        >
          <DetailSection title="Tech Stack">
            <ul className="flex flex-wrap gap-2">
              {project.skills.map(skill => (
                <li key={skill}>
                  <SkillBadge skill={skill} />
                </li>
              ))}
            </ul>
          </DetailSection>
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
      <Container className="flex justify-end py-4">
        <div className="rounded-full bg-orange-500/10 backdrop-blur flex items-center p-2 pl-3.5 pointer-events-auto">
          <Button
            aria-label="시트 닫기"
            data-autofocus
            onClick={gallery.close}
            size="sm"
            shape="pill"
          >
            <ListIcon aria-hidden size={18} weight="light" />
            목록으로
          </Button>
        </div>
      </Container>
    </motion.nav>
  );
}
