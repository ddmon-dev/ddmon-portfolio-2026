import Link from 'next/link';
import { Container } from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { HomeLink } from '@/app/_components/recipient/home-link';

export function Header() {
  return (
    <header className="sticky top-4 z-50 mt-4 -mb-18">
      <Container>
        <LiquidGlass className="mx-3 flex h-14 items-center justify-between rounded-full px-6">
          <HomeLink
            aria-label="홈"
            className="text-3xl font-bold tracking-[-0.2em]"
          >
            ㅇㄷㅎ
          </HomeLink>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <HomeLink className="transition-colors hover:text-foreground">
              홈
            </HomeLink>
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
