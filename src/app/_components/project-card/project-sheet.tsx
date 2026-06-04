'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type MouseEvent, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  HouseIcon,
  GithubLogoIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ListIcon,
  XIcon,
  type Icon,
} from '@phosphor-icons/react';
import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';
import { SkillBadge, SkillBadgeRow } from './skill-badge';
import { DetailSection } from './detail-section';
import { useFocusTrap } from './use-focus-trap';
import { type Project } from './types';
import { type ProjectGallery } from './use-project-gallery';

/**
 * 펼쳐진 상세 시트. 세 레이어로 구성된다.
 * 1. backdrop  : 모달과 분리된 독립 배경 레이어. 닫을 때 천천히(0.5s) 페이드아웃.
 * 2. 패널      : 프로젝트 상세. 두 모드를 상호 배타적으로 렌더한다.
 *    - 정착(sliding=false): layoutId를 가진 단일 패널. 열기/닫기 morph 담당.
 *    - 슬라이드(sliding=true): layoutId 없는 캐러셀. 이전/다음 좌우 슬라이드 담당.
 *    슬라이드가 끝나면 캐러셀이 언마운트되고 단일 패널이 layoutId를 가진 채 새로
 *    mount된다 — morph는 요소가 layoutId를 갖고 mount될 때만 제대로 설정되기 때문이다.
 * 3. 네비게이션 : 뒤로/이전/다음 버튼. 페이지 morph와 무관하게 뷰포트에 고정.
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
  const { open, activeIndex, expanded, sliding, direction, idBase } = gallery;

  const scrollRef = useRef<HTMLDivElement>(null);

  // 시트가 열린 동안 Tab 포커스를 시트 안(오버레이 + 네비게이션)에 가둔다.
  const trapRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, trapRef);

  // 프로젝트 전환 시 시트 스크롤을 맨 위로 초기화한다.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [activeIndex]);

  // 좌우 슬라이드는 순수 x 이동만 한다.
  const slideVariants = {
    enter: (dir: number) => ({ x: `${dir * 100}%` }),
    center: { x: 0 },
    exit: (dir: number) => ({ x: `${-dir * 100}%` }),
  };

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
            // 높이는 inset에서 파생하지 않고 dvh로 명시해 뷰포트를 확실히 덮는다.
            className="fixed inset-x-0 top-0 z-40 h-dvh bg-background"
          />
        )}
      </AnimatePresence>

      {/*
        포커스 트랩 컨테이너. 오버레이(패널)와 네비게이션을 한 부모로 묶어 Tab 포커스를
        이 안에 가둔다. 네비 페이드아웃을 살리려 항상 마운트하고, 내부는 open일 때만 렌더.
      */}
      <div ref={trapRef}>
        {/* 스크롤/바깥클릭 닫기를 담당하는 정적 오버레이 */}
        {open && (
          <div
            ref={scrollRef}
            onClick={gallery.close}
            className="fixed inset-x-0 top-0 z-50 h-dvh overflow-x-clip overflow-y-auto"
          >
            {sliding ? (
              /*
                슬라이드 모드: layoutId 없는 캐러셀. popLayout으로 빠져나가는 패널을 흐름
                밖(absolute)으로 빼 좌우로 겹쳐 슬라이드한다. initial={false}로 캐러셀이
                처음 mount될 때(현재 패널)는 슬라이드 없이 제자리에 나타나고, 이후 추가되는
                패널만 좌우로 슬라이드한다.
              */
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
                onExitComplete={gallery.onSlideSettled}
              >
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  // popLayout이 absolute로 바꿔도 폭이 collapse되지 않도록 전체 폭을 고정한다.
                  className="w-full min-h-dvh"
                >
                  <ProjectPanel
                    project={projects[activeIndex]}
                    expanded={expanded}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              /*
                정착 모드: layoutId를 가진 단일 패널. mount 시 카드에서 morph해 자라나고,
                unmount 시 현재 활성 카드로 morph해 돌아간다.
              */
              <ProjectPanel
                project={projects[activeIndex]}
                morphId={`${idBase}-${activeIndex}`}
                expanded={expanded}
                onMorphComplete={gallery.onMorphComplete}
              />
            )}
          </div>
        )}

        <AnimatePresence>
          {open && (
            <SheetNav
              key="nav"
              gallery={gallery}
              hasPrev={activeIndex > 0}
              hasNext={activeIndex < projects.length - 1}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/**
 * 프로젝트 상세 패널(이미지 + 헤더 + 본문). 정착 모드에선 morphId가 주어져 layoutId로
 * 카드 ↔ 시트 morph에 참여하고, 슬라이드 모드에선 morphId 없이 좌우로 슬라이드만 한다.
 */
function ProjectPanel({
  project,
  morphId,
  expanded,
  onMorphComplete,
}: {
  project: Project;
  morphId?: string;
  expanded: boolean;
  onMorphComplete?: () => void;
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
      {/* 카드와 동일한 비율(aspect-video)을 유지해 morph가 자연스럽게 이어진다 */}
      <motion.div
        layoutId={morphId && `${morphId}-image`}
        // 카드와 동일하게 radius를 style로 줘 morph 중 모서리가 tween되게 한다.
        // 상단은 평평하게, 하단만 크게.
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
                layoutId={morphId && `${morphId}-title`}
                className="w-fit font-bold text-4xl leading-[1.3]"
              >
                {project.title}
              </motion.h3>
              <motion.p
                layoutId={morphId && `${morphId}-category`}
                className="w-fit text-black/60 text-lg pl-0.5"
              >
                {project.category}
              </motion.p>
            </div>
            {/*
              헤더 뱃지는 카드와 동일한 SkillBadgeRow(로고-only + 같은 truncate)를 같은 layoutId로
              렌더한다 → morph가 모양 변화 없이 위치/크기만 이어진다. 전체 스킬은 아래 본문에 둔다.
            */}
            <SkillBadgeRow
              skills={project.skills}
              layoutId={morphId && `${morphId}-skills`}
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

        {/* body는 카드 → 시트 morph가 완전히 끝난 뒤(expanded) 페이드인 */}
        <motion.div
          initial={false}
          animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
          className="space-y-8 px-4"
        >
          {/* 헤더는 로고만 truncate해 보여주므로, 본문에서 전체 스택을 로고+텍스트로 노출한다. */}
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

/**
 * 뒤로/이전/다음 버튼. 페이지 morph와 무관하게 뷰포트에 고정된다.
 * 이전/다음은 항상 클릭 가능하며, 양 끝에서는 시트를 닫는다(요구사항).
 * 양 끝임을 hasPrev/hasNext로 시각적으로만 흐리게 표시한다.
 */
function SheetNav({
  gallery,
  hasPrev,
  hasNext,
}: {
  gallery: ProjectGallery;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, y: '100%', transition: { duration: 0.2, delay: 0 } }}
      transition={{ duration: 0.2, delay: 0.25 }}
      className="fixed bottom-0 inset-x-0 z-70 flex gap-2 items-center pointer-events-none"
    >
      <Container className="flex justify-end py-4">
        <div className="rounded-full bg-orange-500/10 backdrop-blur flex gap-2 items-center justify-end p-2 pl-3.5 pointer-events-auto">
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

          <div className="flex gap-0.5 items-center">
            <ArrowButton
              label="이전 프로젝트"
              icon={CaretLeftIcon}
              enabled={hasPrev}
              onClick={() => gallery.navigate(-1)}
            />
            <ArrowButton
              label="다음 프로젝트"
              icon={CaretRightIcon}
              enabled={hasNext}
              onClick={() => gallery.navigate(1)}
            />
          </div>
        </div>
      </Container>
    </motion.nav>
  );
}

/**
 * 이전/다음 화살표 버튼. 양 끝(enabled=false)에서는 방향 아이콘 대신 X를 보여 더 진행할
 * 곳이 없음을 알리고, 클릭하면 시트를 닫는다(닫기 동작은 navigate가 처리).
 */
function ArrowButton({
  label,
  icon: DirectionIcon,
  enabled,
  onClick,
}: {
  label: string;
  icon: Icon;
  enabled: boolean;
  onClick: () => void;
}) {
  const Glyph = enabled ? DirectionIcon : XIcon;
  return (
    <Button
      aria-label={label}
      onClick={onClick}
      shape="pill"
      size="icon"
      variant="neutral"
    >
      <Glyph aria-hidden size={20} weight="light" />
    </Button>
  );
}
