'use client';

import { Drawer } from 'vaul';
import { XIcon } from '@phosphor-icons/react';
import { Button } from '@/shared/ui/button';

export function SheetCloseButton() {
  return (
    <Drawer.Close asChild>
      <Button aria-label="상세 닫기" size="sm" shape="pill" variant="secondary">
        <XIcon aria-hidden size={18} weight="light" />
        닫기
      </Button>
    </Drawer.Close>
  );
}
