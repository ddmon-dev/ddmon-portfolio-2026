import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-primary',
  subsets: ['latin'],
  display: 'swap',
});

const pretendard = localFont({
  src: './PretendardVariable.woff2',
  variable: '--font-secondary',
  display: 'swap',
});

export { pretendard, poppins };
