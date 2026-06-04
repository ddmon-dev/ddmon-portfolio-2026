import { cn } from '@/shared/utils/classnames';
import { DevSection } from './dev-section';

type Swatch = {
  /** 토큰 이름 (CSS 변수 / 색 단어) */
  name: string;
  /** 스와치 배경에 쓸 Tailwind 클래스 */
  bg: string;
  /** 흰색에 가까워 테두리가 필요한 경우 */
  needsBorder?: boolean;
};

type SwatchGroup = { label: string; swatches: Swatch[] };

const GROUPS: SwatchGroup[] = [
  {
    label: 'Primary',
    swatches: [
      { name: 'primary', bg: 'bg-primary' },
      { name: 'primary-light', bg: 'bg-primary-light' },
      { name: 'primary-dark', bg: 'bg-primary-dark' },
      { name: 'on-primary', bg: 'bg-on-primary' },
    ],
  },
  {
    label: 'Secondary',
    swatches: [
      { name: 'secondary', bg: 'bg-secondary' },
      { name: 'secondary-light', bg: 'bg-secondary-light' },
      { name: 'secondary-dark', bg: 'bg-secondary-dark' },
      { name: 'on-secondary', bg: 'bg-on-secondary', needsBorder: true },
    ],
  },
  {
    label: 'Surface',
    swatches: [
      { name: 'background', bg: 'bg-background', needsBorder: true },
      { name: 'foreground', bg: 'bg-foreground' },
      { name: 'muted', bg: 'bg-muted', needsBorder: true },
      { name: 'muted-foreground', bg: 'bg-muted-foreground' },
      { name: 'border', bg: 'bg-border', needsBorder: true },
      { name: 'ring', bg: 'bg-ring' },
    ],
  },
];

export function ColorTokens() {
  return (
    <DevSection
      title="컬러 토큰"
      description="globals.css의 @theme 토큰 · 클래스는 bg-/text-/border- 접두사로 사용"
    >
      <div className="flex flex-col gap-10">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {group.label}
            </h3>

            <ul className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-3">
              {group.swatches.map((swatch) => (
                <li key={swatch.name} className="flex flex-col gap-2">
                  <div
                    className={cn(
                      'h-16 w-full rounded-lg',
                      swatch.bg,
                      swatch.needsBorder && 'border border-border'
                    )}
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-foreground">
                      {swatch.name}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {swatch.bg}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DevSection>
  );
}
