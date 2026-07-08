'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

const KEY = 'recipient:key';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function StoreRecipientKey({ recipientKey }: { recipientKey: string }) {
  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, recipientKey);
    } catch {}
  }, [recipientKey]);

  return null;
}

export function ClearRecipientKey() {
  useEffect(() => {
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  }, []);

  return null;
}

export function RestoreRecipientRedirect() {
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    try {
      const key = sessionStorage.getItem(KEY);
      if (key) router.replace(`/to/${encodeURIComponent(key)}`);
    } catch {}
  }, [router]);

  return null;
}
