import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600'],
});

export const pretendard = localFont({
  src: './PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Apple SD Gothic Neo',
    'Malgun Gothic',
    'Arial',
    'sans-serif',
  ],
  adjustFontFallback: 'Arial',
});
