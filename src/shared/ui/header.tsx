import Link from 'next/link';
import { Container } from './container';
import { LiquidGlass } from './liquid-glass';

export function Header() {
  return (
    <header className="sticky top-4 z-50 mt-4 -mb-[4.5rem]">
      <Container>
        <LiquidGlass className="mx-3 flex h-14 items-center justify-between rounded-full px-6">
          <Link
            href="/"
            aria-label="홈"
            className="text-3xl font-bold tracking-[-0.2em]"
          >
            ㅇㄷㅎ
          </Link>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              홈
            </Link>
            <Link
              href="/dev"
              className="transition-colors hover:text-foreground"
            >
              쇼케이스
            </Link>
          </nav>
        </LiquidGlass>
      </Container>
    </header>
  );
}
