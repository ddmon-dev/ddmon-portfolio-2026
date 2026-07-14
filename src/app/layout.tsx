import type { Metadata } from 'next';
import { poppins, pretendard } from '@/fonts';
import './globals.css';

import { cn } from '@/shared/utils/classnames';
import { ScrollDotIndicator } from '@/app/_components/ui/scroll-dot-indicator';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:4000'
  ),
  title: {
    default: '이동희 | Frontend Developer',
    template: '%s | 이동희 | Frontend Developer',
  },
  description: '프론트엔드 개발자 이동희의 포트폴리오입니다',
  robots: { index: false, follow: false },
  openGraph: {
    title: '이동희 | Frontend Developer',
    description: '프론트엔드 개발자 이동희의 포트폴리오입니다',
    siteName: '이동희 포트폴리오',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '이동희 | Frontend Developer',
    description: '프론트엔드 개발자 이동희의 포트폴리오입니다',
  },
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
