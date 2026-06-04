import { Container } from '@/shared/ui/container';
import { TECH_STACK } from '@/data/tech-stack.data';
import { TECH_LOGOS, TechLogo } from '@/shared/ui/tech-logo';

export function LogoShowcase() {
  return (
    <Container as="section" className="py-12">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">기술 스택 로고</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          devicons-react 컬러 아이콘 · 숙련도 티어별 정리
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {TECH_STACK.map((tier) => (
          <div key={tier.id}>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {tier.label}
            </h3>

            <ul className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-3">
              {tier.techs.map((tech) => (
                <li
                  key={tech}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-6"
                >
                  <TechLogo tech={tech} size={48} />
                  <span className="text-sm font-medium text-foreground">
                    {TECH_LOGOS[tech].label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
