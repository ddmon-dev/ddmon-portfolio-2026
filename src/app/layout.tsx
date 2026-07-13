import type { Metadata } from 'next';
import { poppins, pretendard } from '@/fonts';
import './globals.css';

import { cn } from '@/shared/utils/classnames';
import { ScrollDotIndicator } from '@/app/_components/ui/scroll-dot-indicator';

export const metadata: Metadata = {
  title: {
    default: '이동희 프론트엔드 포트폴리오',
    template: '%s | 이동희 프론트엔드 포트폴리오',
  },
  description: '안녕하세요, 프론트엔드 개발자 이동희입니다.',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        poppins.variable,
        pretendard.variable,
        'antialiased max-lg:hide-scrollbar'
      )}
    >
      <body>
        <div
          data-vaul-drawer-wrapper
          className="flex min-h-dvh flex-col bg-background"
        >
          <ScrollDotIndicator />
          {children}
        </div>
        {modal}
      </body>
    </html>
  );
}
