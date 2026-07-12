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
        <div className="mx-3 flex items-center justify-between">
          <LiquidGlass className="flex h-11 items-center rounded-full pl-3 pr-4">
            <HomeLink
              aria-label="홈"
              className="text-3xl font-semibold font-secondary tracking-[-0.15em]"
            >
              ㅇㄷㅎ
            </HomeLink>
          </LiquidGlass>
          <LiquidGlass className="flex h-12 items-center rounded-full px-1.5">
            <Button asChild size="icon-sm" shape="pill" variant="secondary">
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
        </div>
      </Container>
    </header>
  );
}
