import { STACK_LOGOS, StackLogo, type StackId } from '@/shared/ui/stack-logo';
import { DevSection } from './dev-section';

export function LogoShowcase() {
  return (
    <DevSection
      title="기술 스택 로고"
      description="devicons-react 컬러 아이콘 · 전체 스택 목록"
    >
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-3">
        {(Object.keys(STACK_LOGOS) as StackId[]).map(stack => (
          <li
            key={stack}
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-6"
          >
            <StackLogo stack={stack} className="text-4xl" />
            <span className="text-sm font-medium text-foreground">
              {STACK_LOGOS[stack].label}
            </span>
          </li>
        ))}
      </ul>
    </DevSection>
  );
}
