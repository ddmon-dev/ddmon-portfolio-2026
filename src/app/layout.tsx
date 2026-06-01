import type { Metadata } from 'next';
import { suit, pretendard } from '@/fonts';
import './globals.css';

import { Header } from '@/shared/ui/header';
import { Footer } from '@/shared/ui/footer';

export const metadata: Metadata = {
  title: 'DDmon Portfolio',
  description: 'DDmon Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${suit.variable} ${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
