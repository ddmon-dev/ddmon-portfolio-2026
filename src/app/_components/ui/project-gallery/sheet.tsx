'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Drawer } from 'vaul';

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
        <Drawer.Overlay className="fixed inset-0 z-80 bg-black/60" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-80 mx-auto flex h-[calc(100dvh-3rem)] w-full max-w-3xl flex-col rounded-t-4xl bg-background text-foreground outline-hidden max-sm:h-[calc(100dvh-1.25rem)] max-sm:rounded-t-2xl"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document
              .querySelector<HTMLElement>(`[data-project-card="${slug}"]`)
              ?.focus({ preventScroll: true });
          }}
        >
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <div className="flex-none py-3">
            <div aria-hidden className="mx-auto h-1 w-10 rounded-full bg-ash-light" />
          </div>
          <div className="hide-scrollbar flex-1 overflow-y-auto overscroll-contain">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
