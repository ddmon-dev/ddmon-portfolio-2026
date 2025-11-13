import type { Metadata } from 'next';
import { poppins, pretendard } from '@/fonts';
import './globals.css';

import { SiteHeader } from '@/widgets/site-header/site-header';
import { SiteFooter } from '@/widgets/site-footer';
import { Toaster } from '@/shared/ui/sonner';

export const metadata: Metadata = {
  title: 'DDmon Portfolio',
  description: 'DDmon의 포트폴리오입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${poppins.variable} ${pretendard.variable} antialiased flex flex-col min-h-screen`}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Toaster
          richColors
          position='bottom-center'
          duration={3000}
        />
      </body>
    </html>
  );
}
