import type { Metadata } from 'next';
import { poppins, pretendard } from '@/fonts';
import './globals.css';

import { cn } from '@/shared/utils/classnames';
import { LiquidGlassFilter } from '@/shared/ui/liquid-glass';
import { Header } from '@/app/_components/ui/header';
import { Footer } from '@/app/_components/ui/footer';
import { ScrollDotIndicator } from '@/app/_components/ui/scroll-dot-indicator';

export const metadata: Metadata = {
  title: 'DDmon Portfolio',
  description: 'DDmon Portfolio',
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
        'h-full antialiased max-lg:hide-scrollbar'
      )}
    >
      <body className="min-h-full flex flex-col">
        <LiquidGlassFilter />
        <div
          data-vaul-drawer-wrapper
          className="flex min-h-dvh flex-col bg-background"
        >
          <ScrollDotIndicator />
          <Header />
          {children}
          <Footer />
        </div>
        {modal}
      </body>
    </html>
  );
}
