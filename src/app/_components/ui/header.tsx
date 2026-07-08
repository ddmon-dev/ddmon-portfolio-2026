import { Container } from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { HomeLink } from '@/app/_components/recipient/home-link';

export function Header() {
  return (
    <header className="sticky top-4 z-50 mt-4 -mb-18">
      <Container>
        <LiquidGlass className="mx-3 flex h-14 items-center rounded-full px-6">
          <HomeLink
            aria-label="홈"
            className="text-3xl font-bold tracking-[-0.2em]"
          >
            ㅇㄷㅎ
          </HomeLink>
        </LiquidGlass>
      </Container>
    </header>
  );
}
