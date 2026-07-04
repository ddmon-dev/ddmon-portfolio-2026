'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { BottomSheet } from '@/shared/ui/bottom-sheet/bottom-sheet';

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
    <BottomSheet
      open={open}
      onOpenChange={setOpen}
      onAnimationEnd={(isOpen) => {
        if (!isOpen) router.back();
      }}
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        document
          .querySelector<HTMLElement>(`[data-project-card="${slug}"]`)
          ?.focus({ preventScroll: true });
      }}
      title={title}
    >
      {children}
    </BottomSheet>
  );
}
