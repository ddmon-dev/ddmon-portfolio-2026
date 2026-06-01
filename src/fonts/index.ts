import localFont from 'next/font/local';

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

export const suit = localFont({
  src: './SuitVariable.woff2',
  variable: '--font-suit',
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
