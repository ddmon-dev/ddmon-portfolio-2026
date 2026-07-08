'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

const KEY = 'greeting:key';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function StoreGreetingKey({ greetingKey }: { greetingKey: string }) {
  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, greetingKey);
    } catch {}
  }, [greetingKey]);

  return null;
}

export function ClearGreetingKey() {
  useEffect(() => {
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  }, []);

  return null;
}

export function RestoreGreetingRedirect() {
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    try {
      const key = sessionStorage.getItem(KEY);
      if (key) router.replace(`/to/${encodeURIComponent(key)}`);
    } catch {}
  }, [router]);

  return null;
}
