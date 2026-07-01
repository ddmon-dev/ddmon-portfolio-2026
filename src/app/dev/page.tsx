import type { Metadata } from 'next';
import { LogoShowcase } from './_components/logo-showcase';
import { ColorTokens } from './_components/color-tokens';
import { ButtonShowcase } from './_components/button-showcase';
import { BadgeShowcase } from './_components/badge-showcase';

export const metadata: Metadata = {
  title: 'Dev Preview',
  description: '개발용 미리보기 — 로고/컴포넌트/디자인 토큰',
  robots: { index: false, follow: false },
};

export default function DevPage() {
  return (
    <main className="py-8">
      <ColorTokens />
      <ButtonShowcase />
      <BadgeShowcase />
      <LogoShowcase />
    </main>
  );
}
