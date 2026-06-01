import Link from 'next/link';
import { Container } from './container';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <Container className="flex justify-between items-center h-16">
        <Link href="/">DDmon</Link>
        <nav>Navigations</nav>
      </Container>
    </header>
  );
}
