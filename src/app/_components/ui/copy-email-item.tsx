'use client';

import { useRef, useState } from 'react';
import { AtIcon, CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { cn } from '@/shared/utils/classnames';
import {
  contactItemClassName,
  contactItemIconWrapClassName,
  contactItemIconClassName,
  springTransition,
} from './contact-item';

export function CopyEmailItem({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(contactItemClassName, 'group cursor-pointer')}
    >
      <span className={cn(contactItemIconWrapClassName, 'relative')}>
        <AtIcon
          weight="thin"
          className={cn(
            contactItemIconClassName,
            springTransition,
            'group-hover:scale-50 group-hover:opacity-0 group-focus-visible:scale-50 group-focus-visible:opacity-0',
            copied && 'scale-50 opacity-0',
          )}
        />
        <CopyIcon
          weight="thin"
          className={cn(
            contactItemIconClassName,
            springTransition,
            'absolute inset-0 m-auto scale-50 opacity-0',
            !copied &&
              'group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100',
          )}
        />
        <CheckIcon
          weight="thin"
          className={cn(
            contactItemIconClassName,
            springTransition,
            'absolute inset-0 m-auto',
            !copied && 'scale-50 opacity-0',
          )}
        />
      </span>
      <span className="sr-only">E-mail</span>
      <span className="relative font-secondary">
        <span
          aria-hidden={copied}
          className={cn(
            springTransition,
            'block',
            copied && '-translate-y-1 opacity-0',
          )}
        >
          {value}
        </span>
        <span
          aria-hidden={!copied}
          className={cn(
            springTransition,
            'absolute inset-0 flex items-center justify-center whitespace-nowrap max-md:justify-start',
            !copied && 'translate-y-1 opacity-0',
          )}
        >
          이메일 주소가 복사되었습니다
        </span>
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? '이메일 주소가 복사되었습니다' : ''}
      </span>
    </button>
  );
}
