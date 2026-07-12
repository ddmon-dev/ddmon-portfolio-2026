import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { HomeLink } from '@/app/_components/recipient/home-link';

export function Header() {
  return (
    <header className="sticky h-0 top-4 z-50 mt-4">
      <Container>
        <LiquidGlass className="mx-3 flex items-center justify-between rounded-full p-2">
          <HomeLink
            aria-label="홈"
            className="text-3xl font-bold tracking-[-0.2em]"
          >
            ㅇㄷㅎ
          </HomeLink>
          <Button asChild size="icon" shape="pill" variant="secondary">
            <Link
              href="https://github.com/dd2mon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubLogoIcon aria-hidden className="text-xl" />
            </Link>
          </Button>
        </LiquidGlass>
      </Container>
    </header>
  );
}
