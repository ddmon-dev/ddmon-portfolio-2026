'use client';

import Image from 'next/image';
import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { XIcon } from '@phosphor-icons/react';
import { cn } from '@/shared/utils/classnames';
import { Container } from '@/shared/ui/container';
import { useMounted } from '@/shared/hooks/use-mounted';
import { StackBadges } from '../project-card/stack-badges';
import { useFocusTrap } from '../project-card/use-focus-trap';
import { type Project } from '../project-card/types';

const layoutDuration = 0.7;
const layoutEase = 'cubic-bezier(0.22, 1, 0.36, 1)';
const layoutTransition = [
  `top ${layoutDuration}s ${layoutEase}`,
  `left ${layoutDuration}s ${layoutEase}`,
  `width ${layoutDuration}s ${layoutEase}`,
  `height ${layoutDuration}s ${layoutEase}`,
  `border-radius ${layoutDuration}s ${layoutEase}`,
].join(', ');

type CardRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type ActiveCard = {
  project: Project;
  rect: CardRect;
  target: CardRect & { borderRadius: number };
  expanded: boolean;
};

export function AppStoreProjectGallery({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  const [activeCard, setActiveCard] = useState<ActiveCard | null>(null);
  const mounted = useMounted();

  const closeActiveCard = () => {
    setActiveCard((current) => {
      if (!current) return current;
      return { ...current, expanded: false };
    });

    window.setTimeout(() => {
      setActiveCard(null);
    }, layoutDuration * 1000);
  };

  useEffect(() => {
    if (!activeCard) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') closeActiveCard();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCard]);

  return (
    <Container as="section" className="space-y-8">
      <div className="space-y-2">
        <p className="font-secondary text-xs font-semibold tracking-[0.2em] text-primary-dark uppercase">
          Motion demo
        </p>
        <h2 className="text-4xl font-bold">{title}</h2>
      </div>

      <ul className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {projects.map((project, index) => (
          <li key={project.title}>
            <AppStoreProjectCard
              project={project}
              index={index}
              isActive={activeCard?.project.title === project.title}
              onOpen={(rect) => {
                setActiveCard({
                  project,
                  rect,
                  target: getModalTarget(),
                  expanded: false,
                });

                window.setTimeout(() => {
                  setActiveCard((current) => {
                    if (current?.project.title !== project.title) return current;
                    return { ...current, expanded: true };
                  });
                }, 50);
              }}
            />
          </li>
        ))}
      </ul>

      {mounted &&
        createPortal(
          activeCard && (
            <AppStoreProjectModal
              key="app-store-project-modal"
              activeCard={activeCard}
              onClose={closeActiveCard}
            />
          ),
          document.body
        )}
    </Container>
  );
}

function AppStoreProjectCard({
  project,
  index,
  isActive,
  onOpen,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onOpen: (rect: CardRect) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const open = (element: HTMLElement | null) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    onOpen({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    open(cardRef.current);
  };

  const onClick = (event: MouseEvent<HTMLElement>) => {
    open(event.currentTarget);
  };

  return (
    <motion.article
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${project.title} 상세 보기`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={{ borderRadius: 28 }}
      className={cn(
        'group relative min-h-[28rem] cursor-pointer overflow-hidden bg-ash-950 text-white shadow-sm outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isActive && 'invisible'
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(max-width: 640px) 100vw, 29rem"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/10 to-black/78" />

      <div className="relative flex h-full min-h-[28rem] flex-col justify-between p-5">
        <div className="font-secondary text-[0.7rem] font-semibold tracking-[0.18em] text-white/78 uppercase">
          {String(index + 1).padStart(2, '0')} Featured Project
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-3xl leading-tight font-bold">{project.title}</h3>
            <p className="text-sm text-white/78">{project.category}</p>
          </div>
          <div>
            <CompactStackList stacks={project.stacks.slice(0, 4)} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function AppStoreProjectModal({
  activeCard,
  onClose,
}: {
  activeCard: ActiveCard;
  onClose: () => void;
}) {
  const trapRef = useRef<HTMLElement>(null);
  useFocusTrap(true, trapRef);

  const { project, rect, target, expanded } = activeCard;
  const currentRect = expanded ? target : { ...rect, borderRadius: 28 };

  return (
    <div className="fixed inset-0 z-80">
      <motion.button
        type="button"
        aria-label="모달 닫기 배경"
        className="fixed inset-0 h-full w-full bg-black/42 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      />
      <article
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        style={{
          ...currentRect,
          transition: layoutTransition,
        }}
        className="fixed overflow-y-auto bg-background text-foreground shadow-2xl"
      >
        <div className="relative h-[27rem] overflow-hidden max-sm:h-[58vh]">
          <div className="absolute inset-0">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              priority
              sizes="(max-width: 640px) 100vw, 48rem"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-black/18 via-black/8 to-black/82" />

          <button
            type="button"
            data-autofocus
            aria-label="모달 닫기"
            onClick={onClose}
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-black/36 text-white backdrop-blur-md transition hover:bg-black/52 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <XIcon aria-hidden size={18} weight="bold" />
          </button>

          <div className="absolute inset-x-0 bottom-0 space-y-5 p-6 text-white">
            <div className="font-secondary text-[0.72rem] font-semibold tracking-[0.18em] text-white/72 uppercase">
              Featured Project
            </div>
            <div className="space-y-2">
              <h3 className="max-w-2xl text-5xl leading-[1.03] font-bold max-sm:text-4xl">
                {project.title}
              </h3>
              <p className="text-base text-white/76">{project.category}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-6 max-sm:p-5">
          <div className="space-y-3">
            <h4 className="font-secondary text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Used stack
            </h4>
            <StackBadges stacks={project.stacks} full />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, delay: 0.08 }}
            className="divide-y divide-border text-ash-dark [&>section]:py-6 [&>section]:first:pt-0 [&>section]:last:pb-0"
          >
            {project.content}
          </motion.div>
        </div>
      </article>
    </div>
  );
}

function getModalTarget() {
  const isMobile = window.matchMedia('(max-width: 640px)').matches;

  if (isMobile) {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
    };
  }

  const margin = 24;
  const width = Math.min(768, window.innerWidth - margin * 2);

  return {
    top: margin,
    left: (window.innerWidth - width) / 2,
    width,
    height: window.innerHeight - margin * 2,
    borderRadius: 32,
  };
}

function CompactStackList({ stacks }: { stacks: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stacks.map((stack) => (
        <li
          key={stack}
          className="rounded-full border border-white/18 bg-white/14 px-3 py-1 text-xs font-semibold text-white/88 backdrop-blur-sm"
        >
          {stack}
        </li>
      ))}
    </ul>
  );
}
