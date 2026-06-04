import { TECH_STACK } from '@/data/tech-stack.data';
import { TECH_LOGOS, TechLogo } from '@/shared/ui/tech-logo';
import { DevSection } from './dev-section';

export function LogoShowcase() {
  return (
    <DevSection
      title="기술 스택 로고"
      description="devicons-react 컬러 아이콘 · 숙련도 티어별 정리"
    >
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
    </DevSection>
  );
}
