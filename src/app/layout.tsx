import type { Metadata } from 'next';
import { poppins, pretendard } from '@/fonts';
import './globals.css';

import { cn } from '@/shared/utils/classnames';
import { ScrollDotIndicator } from '@/app/_components/ui/scroll-dot-indicator';

export const metadata: Metadata = {
  title: {
    default: 'DDmon Portfolio',
    template: '%s | DDmon Portfolio',
  },
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
