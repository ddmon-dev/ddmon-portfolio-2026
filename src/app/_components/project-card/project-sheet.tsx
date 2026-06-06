'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { HouseIcon, GithubLogoIcon, ListIcon } from '@phosphor-icons/react';
import { cn } from '@/shared/utils/classnames';
import { useMounted } from '@/shared/hooks/use-mounted';
import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';
import { SkillBadges } from './skill-badge';
import { useFocusTrap } from './use-focus-trap';
import { type Project } from './types';
import { type ProjectSheetState } from './use-project-sheet';

export function ProjectSheet({
  project,
  morphId,
  sheet,
}: {
  project: Project;
  morphId: string;
  sheet: ProjectSheetState;
}) {
  const { open, expanded } = sheet;

  const trapRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, trapRef);

  const mounted = useMounted();

  const node = (
    <>
      <AnimatePresence onExitComplete={sheet.onBackdropExitComplete}>
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
              project={project}
              morphId={morphId}
              expanded={expanded}
              onMorphComplete={sheet.onMorphComplete}
            />
          </div>
        )}
        <AnimatePresence>
          {open && <SheetNav key="nav" close={sheet.close} />}
        </AnimatePresence>
      </div>
    </>
  );

  if (!mounted) return null;

  return createPortal(node, document.body);
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
    <article
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="min-h-dvh space-y-14 pb-30"
    >
      <Container className="max-sm:px-0">
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
      </Container>

      <Container>
        <motion.div
          initial={false}
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="divide-y divide-border space-y-4 [&>div]:py-8 [&>div]:first:pt-0 [&>div]:last:pb-0"
        >
          <SheetRow className="space-y-6 text-center">
            <div className="space-y-3">
              <h3 className="font-bold text-4xl">{project.title}</h3>
              <p className="text-muted-foreground text-xl">
                {project.category}
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-muted-foreground/60">USED STACK</h4>
              <SkillBadges skills={project.skills} full />
            </div>
          </SheetRow>

          <SheetRow className="space-y-8">{project.content}</SheetRow>
        </motion.div>
      </Container>
    </article>
  );
}

function SheetNav({ close }: { close: () => void }) {
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
            onClick={close}
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

function SheetRow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('px-6 max-sm:px-0', className)}>{children}</div>;
}
