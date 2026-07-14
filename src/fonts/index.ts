import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const pretendard = localFont({
  src: './PretendardVariable.subset.woff2',
  weight: '45 930',
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
