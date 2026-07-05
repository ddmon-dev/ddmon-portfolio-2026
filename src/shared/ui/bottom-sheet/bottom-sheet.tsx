'use client';

import { useRef, type ReactNode } from 'react';
import { Drawer } from 'vaul';
import { ScrollDots } from '@/shared/ui/scroll-dots';
import { useBackgroundScale } from './use-background-scale';

export const BottomSheetClose = Drawer.Close;

export function BottomSheet({
  open,
  onOpenChange,
  onAnimationEnd,
  onCloseAutoFocus,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnimationEnd?: (open: boolean) => void;
  onCloseAutoFocus?: (event: Event) => void;
  title: string;
  children: ReactNode;
}) {
  const { onDrag, onRelease } = useBackgroundScale(open);
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <Drawer.Root
      autoFocus
      open={open}
      onOpenChange={onOpenChange}
      onAnimationEnd={onAnimationEnd}
      onDrag={onDrag}
      onRelease={onRelease}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-80 bg-black/60 max-md:bg-transparent" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-80 mx-auto flex h-[calc(100dvh-var(--sheet-top-gap))] w-full max-w-3xl flex-col overflow-hidden rounded-t-(--sheet-radius) bg-background text-foreground outline-hidden max-md:shadow-[0_-16px_48px_rgba(0,0,0,0.55)]"
          onCloseAutoFocus={onCloseAutoFocus}
        >
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <div className="absolute inset-x-0 top-0 z-10 py-2.5">
            <div
              aria-hidden
              className="mx-auto w-fit rounded-full bg-black/25 px-2.5 py-1.5"
            >
              <div className="h-1 w-10 rounded-full bg-white/90" />
            </div>
          </div>
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex-1 overflow-y-auto overscroll-contain"
          >
            {children}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16"
          >
            <ScrollDots scrollRef={scrollerRef} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
