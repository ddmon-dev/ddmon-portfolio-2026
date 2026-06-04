import Link from 'next/link';
import { Container } from './container';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <Container className="flex justify-between items-center h-16">
        <Link href="/">DDmon</Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            홈
          </Link>
          <Link href="/dev" className="transition-colors hover:text-foreground">
            쇼케이스
          </Link>
        </nav>
      </Container>
    </header>
  );
}
