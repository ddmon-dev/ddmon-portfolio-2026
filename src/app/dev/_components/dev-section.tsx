import type { ReactNode } from 'react';
import { Container } from '@/shared/ui/container';

/**
 * 개발용 미리보기 페이지의 섹션 공통 래퍼.
 * 제목/설명 헤더와 컨테이너 여백을 통일한다.
 */
export function DevSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Container as="section" className="border-t border-border py-12">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </header>
      {children}
    </Container>
  );
}
