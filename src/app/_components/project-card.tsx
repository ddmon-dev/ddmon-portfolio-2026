'use client';

import Image from 'next/image';
import { useEffect, useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
 * 클릭하면 카드가 화면 중앙 모달로 확장되는 프로젝트 카드.
 * motion의 layoutId 공유 레이아웃으로 카드 ↔ 모달 사이를 자연스럽게 전환한다.
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
        모달이 열리면 이 카드를 언마운트하고, 동일 크기의 invisible placeholder만
        남긴다. 그래야 같은 layoutId를 가진 요소가 동시에 둘 존재하지 않아(공식
        shared element 정석) motion이 카드 위치에서 정확히 확장한다.
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
                className="text-lg/5 font-bold"
              >
                {title}
              </motion.h3>
              <p>{category}</p>
            </div>
            <p className="flex flex-wrap gap-x-1">
              {skills.map(skill => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </p>
          </div>
        </motion.div>
      )}

      {/* 열림 상태: 확장 모달 */}
      <AnimatePresence>
        {open && (
          <div>
            {/* backdrop: 뷰포트 고정 + 페이드 (레이아웃 애니메이션 없음) */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50"
            />

            {/* 다이얼로그 컨테이너: 뷰포트 고정, 클릭 시 닫힘 */}
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 flex justify-center overflow-y-auto p-4 sm:p-8"
            >
              <motion.div
                layoutId={id}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={event => event.stopPropagation()}
                className={cn(
                  'relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl',
                  'max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)]'
                )}
              >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className={cn(
                  'absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full',
                  'bg-black/60 text-lg text-white transition-colors hover:bg-black'
                )}
              >
                ✕
              </button>

              <div className="flex max-h-[inherit] flex-col">
                <motion.div
                  layoutId={`${id}-image`}
                  className="shrink-0 overflow-hidden"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="aspect-video w-full bg-black/30 object-cover"
                  />
                </motion.div>

                <div className="space-y-6 overflow-y-auto p-6 sm:p-8">
                  <div className="space-y-2">
                    <motion.h3
                      layoutId={`${id}-title`}
                      className="text-2xl font-bold"
                    >
                      {title}
                    </motion.h3>
                    <p className="text-black/60">{category}</p>
                    <p className="flex flex-wrap gap-1 pt-1">
                      {skills.map(skill => (
                        <SkillBadge key={skill}>{skill}</SkillBadge>
                      ))}
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.2,
                      delay: reduceMotion ? 0 : 0.15,
                    }}
                    className="space-y-5"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * 모달 상세 본문의 한 섹션 (Overview / Role / Problem / Solution / Tech 등).
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
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex justify-center items-center py-1 px-2.5 rounded-full text-sm shrink-0 overflow-hidden',
        'bg-black text-white',
        'max-w-22',
        className
      )}
    >
      <span className="block truncate">{children}</span>
    </span>
  );
}
