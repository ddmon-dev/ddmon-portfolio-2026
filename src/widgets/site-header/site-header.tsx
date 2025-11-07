import Link from 'next/link';
import { Container } from '@/shared/ui/container';

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 w-full'>
      <Container className='flex items-center flex-start gap-12 h-16'>
        <Link
          href='/'
          className='font-light text-2xl'
        >
          DDmon
        </Link>
        <nav className='flex items-center gap-4'>
          <Link href='/'>Profile</Link>
          <Link href='/'>Projects</Link>
          <Link href='/'>Contact</Link>
        </nav>
      </Container>
    </header>
  );
}
