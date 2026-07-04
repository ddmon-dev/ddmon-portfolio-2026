'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Drawer } from 'vaul';
import { useBackgroundScale } from './use-background-scale';

export function ProjectSheet({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  useBackgroundScale(open);

  return (
    <Drawer.Root
      autoFocus
      open={open}
      onOpenChange={setOpen}
      onAnimationEnd={(isOpen) => {
        if (!isOpen) router.back();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-80 bg-black/60 max-md:bg-transparent" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-80 mx-auto flex h-[calc(100dvh-3rem)] w-full max-w-3xl flex-col overflow-hidden rounded-t-4xl bg-background text-foreground outline-hidden max-md:h-[calc(100dvh-4rem)] max-md:shadow-[0_-16px_48px_rgba(0,0,0,0.55)] max-sm:h-[calc(100dvh-2.5rem)] max-sm:rounded-t-2xl"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document
              .querySelector<HTMLElement>(`[data-project-card="${slug}"]`)
              ?.focus({ preventScroll: true });
          }}
        >
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <div className="hide-scrollbar flex-1 overflow-y-auto overscroll-contain">
            <div className="sticky top-0 z-10 h-0">
              <div
                aria-hidden
                className="absolute top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-black/25 px-2.5 py-1.5"
              >
                <div className="h-1 w-10 rounded-full bg-white/90" />
              </div>
            </div>
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
