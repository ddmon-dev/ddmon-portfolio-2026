'use client';

import { useRef } from 'react';
import { ScrollDots } from '@/shared/ui/scroll-dots';
import { DevSection } from './dev-section';

export function ScrollDotsShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <DevSection
      title="Scroll Dots"
      description="스크롤 진행률을 벨 곡선 도트로 표시하는 인디케이터 — 루트 스크롤(모바일)과 바텀시트 내부 스크롤에 사용"
    >
      <div className="relative h-64 max-w-md overflow-hidden rounded-xl border border-border">
        <div
          ref={scrollerRef}
          className="hide-scrollbar h-full overflow-y-auto p-6 pr-16"
        >
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i} className="py-2 text-sm text-muted-foreground">
              스크롤 콘텐츠 {i + 1}
            </p>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16"
        >
          <ScrollDots scrollRef={scrollerRef} />
        </div>
      </div>
    </DevSection>
  );
}
