'use client';

import Image from 'next/image';
import { type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Container } from '@/shared/ui/container';
import { cn } from '@/shared/utils/classnames';
import { SkillBadge } from './skill-badge';
import { type ProjectImage } from './card-face';
import { type CardSheet } from './use-card-sheet';

/**
 * 펼쳐진 상세 시트. 세 레이어로 구성된다.
 * 1. backdrop  : 모달과 분리된 독립 배경 레이어. 닫을 때 천천히(0.5s) 페이드아웃.
 * 2. 흰 시트    : 카드와 동일 layoutId로 카드 위치에서 자라난다(shared element morph).
 * 3. 뒤로 버튼  : 페이지 morph와 무관하게 뷰포트에 고정.
 *
 * 상태/타이밍은 모두 useCardSheet가 쥐고 있고, 여기서는 그 값으로 렌더만 한다.
 */
export function ProjectSheet({
  sheet,
  title,
  category,
  image,
  skills,
  children,
}: {
  sheet: CardSheet;
  title: string;
  category: string;
  image: ProjectImage;
  skills: string[];
  children: ReactNode;
}) {
  const { open, expanded, id, reduceMotion } = sheet;

  return (
    <>
      {/*
        배경 페이드아웃: 닫을 때 카드 복귀와 동시에 천천히 드러난다. 카드는 backdropVisible
        동안 z-50으로 이 위에 있어 페이드아웃 내내 가려지지 않는다(깜빡임 없음).
      */}
      <AnimatePresence onExitComplete={sheet.onBackdropExitComplete}>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: reduceMotion ? 0 : 0.5 },
            }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-background"
          />
        )}
      </AnimatePresence>

      {/*
        흰 시트 + 뒤로 버튼. 오버레이는 정적 투명 레이어로 스크롤/바깥클릭 닫기만 담당하고,
        실제 morph는 layoutId를 가진 Container가 카드에서 자라나며 처리한다.
      */}
      <AnimatePresence>
        {open && (
          <div
            key="overlay"
            onClick={sheet.close}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <Container
              as={motion.div}
              layoutId={id}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              onClick={(event: MouseEvent) => event.stopPropagation()}
              onLayoutAnimationComplete={sheet.onSheetMorphComplete}
              className="min-h-full space-y-8 pb-10 sm:pb-14"
            >
              {/* 카드와 동일한 비율(aspect-video)을 유지해 morph가 자연스럽게 이어진다 */}
              <motion.div
                layoutId={`${id}-image`}
                className="overflow-hidden rounded-b-md"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="aspect-video w-full bg-black/30 object-cover"
                />
              </motion.div>

              <header className="space-y-3 border-b border-black/10 pb-6">
                <motion.h3
                  layoutId={`${id}-title`}
                  className="w-fit text-3xl font-bold sm:text-4xl"
                >
                  {title}
                </motion.h3>
                <motion.p
                  layoutId={`${id}-category`}
                  className="w-fit text-black/60"
                >
                  {category}
                </motion.p>
                <p className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map(skill => (
                    <SkillBadge key={skill} layoutId={`${id}-skill-${skill}`}>
                      {skill}
                    </SkillBadge>
                  ))}
                </p>
              </header>

              {/* body는 카드 → 시트 morph가 완전히 끝난 뒤(expanded) 페이드인 */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
                className="space-y-8"
              >
                {children}
              </motion.div>
            </Container>
          </div>
        )}

        {open && (
          <motion.button
            key="back"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={sheet.close}
            className={cn(
              'fixed left-4 top-4 z-60 flex items-center gap-1.5 rounded-full py-2 pl-3 pr-4',
              'bg-black/60 text-sm text-white backdrop-blur transition-colors hover:bg-black',
              'sm:left-6 sm:top-6'
            )}
          >
            <span aria-hidden className="text-base leading-none">
              ←
            </span>
            뒤로
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
