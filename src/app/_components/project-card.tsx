'use client';

import Image from 'next/image';
import { useEffect, useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Container } from '@/shared/ui/container';
import { cn } from '@/shared/utils/classnames';

type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectCardProps = {
  title: string;
  category: string;
  image: ProjectImage;
  skills: string[];
  /** 모달에 펼쳐질 상세 본문. 호출부에서 DetailSection 등으로 하드코딩한다. */
  children: ReactNode;
};

/**
 * 클릭하면 카드가 풀페이지 상세로 확장되는 프로젝트 카드.
 * motion의 layoutId 공유 레이아웃으로 카드 ↔ 상세 페이지 사이를 자연스럽게 전환한다.
 */
export function ProjectCard({
  title,
  category,
  image,
  skills,
  children,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduceMotion = useReducedMotion();

  // 모달이 열려 있는 동안 body 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      {/*
        닫힘 상태: 그리드 카드.
        상세 페이지가 열리면 이 카드를 언마운트하고, 동일 크기의 invisible
        placeholder만 남긴다. 그래야 같은 layoutId를 가진 요소가 동시에 둘 존재하지
        않아(공식 shared element 정석) motion이 카드 위치에서 정확히 확장한다.
      */}
      {open ? (
        <div aria-hidden className="invisible space-y-4">
          <div className="overflow-hidden rounded-md">
            <Image
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              className="aspect-video w-full bg-black/30 object-cover"
            />
          </div>
          <div className="space-y-3">
            <div className="space-y-1 px-2">
              <h3 className="text-lg/5 font-bold">{title}</h3>
              <p>{category}</p>
            </div>
            <p className="flex flex-wrap gap-x-1">
              {skills.map(skill => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </p>
          </div>
        </div>
      ) : (
        <motion.div
          layoutId={id}
          onClick={() => setOpen(true)}
          className="cursor-pointer space-y-4"
        >
          <motion.div
            layoutId={`${id}-image`}
            className="overflow-hidden rounded-md"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="aspect-video w-full bg-black/30 object-cover"
            />
          </motion.div>
          <div className="space-y-3">
            <div className="space-y-1 px-2">
              <motion.h3
                layoutId={`${id}-title`}
                className="w-fit text-lg/5 font-bold"
              >
                {title}
              </motion.h3>
              <motion.p layoutId={`${id}-category`} className="w-fit">
                {category}
              </motion.p>
            </div>
            <p className="flex flex-wrap gap-x-1">
              {skills.map(skill => (
                <SkillBadge key={skill} layoutId={`${id}-skill-${skill}`}>
                  {skill}
                </SkillBadge>
              ))}
            </p>
          </div>
        </motion.div>
      )}

      {/*
        열림 상태: 카드가 상세 페이지로 확장된다. 모달(중앙 카드 + 어두운 backdrop)이
        아니라 별도 페이지처럼, 메인과 동일 너비의 흰 Container 위에 콘텐츠를 둔다.
        layoutId는 카드와 동일해 카드 위치에서 확장되고, 투명한 오버레이 안에서
        흰 Container가 함께 스케일되어 카드가 시트로 자라나는 것처럼 보인다.
      */}
      <AnimatePresence>
        {open && [
          <motion.div
            key="page"
            layoutId={id}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            {/* 다이얼로그는 투명, 흰 배경은 메인 페이지와 동일 너비의 Container에만 */}
            <Container
              as="article"
              onClick={event => event.stopPropagation()}
              className="min-h-full space-y-8 bg-white pb-10 sm:pb-14"
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

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.25,
                  delay: reduceMotion ? 0 : 0.15,
                }}
                className="space-y-8"
              >
                {children}
              </motion.div>
            </Container>
          </motion.div>,

          // 뒤로 가기: 페이지 morph와 무관하게 뷰포트에 고정 (transform 영향 회피)
          <motion.button
            key="back"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={() => setOpen(false)}
            className={cn(
              'fixed left-4 top-4 z-[60] flex items-center gap-1.5 rounded-full py-2 pl-3 pr-4',
              'bg-black/60 text-sm text-white backdrop-blur transition-colors hover:bg-black',
              'sm:left-6 sm:top-6'
            )}
          >
            <span aria-hidden className="text-base leading-none">
              ←
            </span>
            뒤로
          </motion.button>,
        ]}
      </AnimatePresence>
    </>
  );
}

/**
 * 상세 페이지 본문의 한 섹션 (Overview / Role / Problem / Solution / Tech 등).
 * 호출부에서 제목 + 본문을 하드코딩해 채운다.
 */
export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h4 className="text-sm font-bold uppercase tracking-wide text-black/40">
        {title}
      </h4>
      <div className="leading-relaxed text-black/80">{children}</div>
    </section>
  );
}

export function SkillBadge({
  children,
  className,
  layoutId,
}: {
  children: ReactNode;
  className?: string;
  /** 주어지면 카드 ↔ 페이지 간 배지를 개별 morph로 연결한다. */
  layoutId?: string;
}) {
  return (
    <motion.span
      layoutId={layoutId}
      className={cn(
        'inline-flex justify-center items-center py-1 px-2.5 rounded-full text-sm shrink-0 overflow-hidden',
        'bg-black text-white',
        'max-w-22',
        className
      )}
    >
      <span className="block truncate">{children}</span>
    </motion.span>
  );
}
