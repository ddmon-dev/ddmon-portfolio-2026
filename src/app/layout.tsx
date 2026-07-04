import type { Metadata } from 'next';
import { poppins, pretendard } from '@/fonts';
import './globals.css';

import { cn } from '@/shared/utils/classnames';
import { Header } from '@/shared/ui/header';
import { LiquidGlassFilter } from '@/shared/ui/liquid-glass';

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
        'h-full antialiased'
      )}
    >
      <body className="min-h-full flex flex-col">
        <LiquidGlassFilter />
        <Header />
        {children}
        {modal}
      </body>
    </html>
  );
}
