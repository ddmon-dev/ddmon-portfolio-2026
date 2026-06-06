import { type ReactNode } from 'react';

/**
 * 상세 페이지 본문의 한 섹션 (Overview / Role / Problem / Solution / Tech 등).
 * 호출부에서 제목 + 본문을 하드코딩해 채운다.
 *
 * 순수 표현 컴포넌트라 클라이언트 기능이 없다 → 서버 컴포넌트로 둔다.
 */
export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h4 className="text-sm font-bold uppercase tracking-wide text-muted-foreground/60">
        {title}
      </h4>
      <div className="leading-relaxed text-foreground/80">{children}</div>
    </section>
  );
}
