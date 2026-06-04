import type { Metadata } from 'next';
import { LogoShowcase } from './_components/logo-showcase';

export const metadata: Metadata = {
  title: 'Dev Preview',
  description: '개발용 미리보기 — 로고/컴포넌트/디자인 토큰',
  robots: { index: false, follow: false },
};

/**
 * 개발용 미리보기(스타일가이드) 페이지.
 * 로고 쇼케이스를 시작으로 컴포넌트 갤러리, 디자인 토큰 섹션을 이어 붙인다.
 */
export default function DevPage() {
  return (
    <main className="py-8">
      <LogoShowcase />
    </main>
  );
}
