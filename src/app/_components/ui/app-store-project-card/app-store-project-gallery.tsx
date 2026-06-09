'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'motion/react';
import { XIcon } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/shared/utils/classnames';
import { Container } from '@/shared/ui/container';
import { StackBadges } from '../project-card/stack-badges';
import { useFocusTrap } from '../project-card/use-focus-trap';
import { type Project } from '../project-card/types';

const layoutDuration = 0.5;
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
  originScrollY: number;
};

type StoredCardState = CardRect & {
  slug?: string;
  scrollY?: number;
};

const rectStorageKey = 'dd-portfolio:app-store-card-rect';

export function AppStoreProjectGallery({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
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
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}

function AppStoreProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const href = `/projects/${project.slug}`;
  const isActive = pathname === href;

  const storeRect = (element: HTMLElement | null) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    window.sessionStorage.setItem(rectStorageKey, JSON.stringify({
      slug: project.slug,
      scrollY: window.scrollY,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    storeRect(cardRef.current);
  };

  const onClick = (event: MouseEvent<HTMLElement>) => {
    storeRect(event.currentTarget);
  };

  return (
    <motion.article
      ref={cardRef}
      style={{ borderRadius: 28 }}
      className={cn(
        'group relative min-h-[28rem] cursor-pointer overflow-hidden bg-ash-950 text-white shadow-sm outline-none',
        'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background',
        isActive && 'invisible'
      )}
    >
      <Link
        href={href}
        scroll={false}
        aria-label={`${project.title} 상세 보기`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">{project.title} 상세 보기</span>
      </Link>
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

export function AppStoreProjectModal({
  project,
}: {
  project: Project;
}) {
  const trapRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<ActiveCard>(() => {
    const target = getModalTarget();
    const storedState = readStoredCardState(project.slug);

    return {
      project,
      rect: storedState?.rect ?? {
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
      },
      target,
      expanded: false,
      originScrollY: storedState?.scrollY ?? window.scrollY,
    };
  });
  useFocusTrap(true, trapRef);

  const { rect, expanded } = activeCard;
  const currentRect = expanded ? activeCard.target : { ...rect, borderRadius: 28 };

  const close = useCallback(() => {
    setActiveCard((current) => ({ ...current, expanded: false }));
    window.setTimeout(() => {
      router.back();
      window.setTimeout(() => {
        window.scrollTo({ top: activeCard.originScrollY, behavior: 'instant' });
      }, 0);
    }, layoutDuration * 1000);
  }, [activeCard.originScrollY, router]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setActiveCard((current) => ({ ...current, expanded: true }));
    });

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const previousOverflow = document.body.style.overflow;
    const previousScrollRestoration = window.history.scrollRestoration;

    document.body.style.overflow = 'hidden';
    window.history.scrollRestoration = 'manual';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-80">
      <motion.button
        type="button"
        aria-label="모달 닫기 배경"
        className="fixed inset-0 h-full w-full bg-black/42 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        onClick={close}
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
            onClick={close}
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

export function AppStoreProjectPage({ project }: { project: Project }) {
  return (
    <Container as="main" className="space-y-12 pt-32 pb-32">
      <article className="overflow-hidden rounded-[2rem] bg-background shadow-sm ring-1 ring-border">
        <div className="relative h-[32rem] overflow-hidden max-sm:h-[58vh]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            priority
            sizes="(max-width: 640px) 100vw, 48rem"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/18 via-black/8 to-black/82" />
          <div className="absolute inset-x-0 bottom-0 space-y-5 p-6 text-white">
            <p className="font-secondary text-[0.72rem] font-semibold tracking-[0.18em] text-white/72 uppercase">
              Featured Project
            </p>
            <div className="space-y-2">
              <h1 className="max-w-2xl text-5xl leading-[1.03] font-bold max-sm:text-4xl">
                {project.title}
              </h1>
              <p className="text-base text-white/76">{project.category}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-6 max-sm:p-5">
          <div className="space-y-3">
            <h2 className="font-secondary text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Used stack
            </h2>
            <StackBadges stacks={project.stacks} full />
          </div>

          <div className="divide-y divide-border text-ash-dark [&>section]:py-6 [&>section]:first:pt-0 [&>section]:last:pb-0">
            {project.content}
          </div>
        </div>
      </article>
    </Container>
  );
}

function readStoredCardState(
  slug: string | undefined
): { rect: CardRect; scrollY: number } | null {
  if (typeof window === 'undefined') return null;
  if (!slug) return null;

  try {
    const raw = window.sessionStorage.getItem(rectStorageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredCardState;
    if (parsed.slug !== slug) return null;

    window.sessionStorage.removeItem(rectStorageKey);

    return {
      rect: {
        top: parsed.top,
        left: parsed.left,
        width: parsed.width,
        height: parsed.height,
      },
      scrollY: parsed.scrollY ?? window.scrollY,
    };
  } catch {
    return null;
  }
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
