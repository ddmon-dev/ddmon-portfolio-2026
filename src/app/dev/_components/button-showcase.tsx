import { Button } from '@/shared/ui/button';
import { DevSection } from './dev-section';

const VARIANTS = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'link',
] as const;

const SIZES = ['xs', 'sm', 'default', 'lg'] as const;

const ICON_SIZES = ['icon-sm', 'icon', 'icon-lg'] as const;

/** 아이콘 사이즈 버튼 데모용 인라인 글리프 (서버 컴포넌트 유지를 위해 Phosphor 대신 사용) */
function PlusGlyph() {
  return (
    <svg width={18} height={18} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </h3>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function ButtonShowcase() {
  return (
    <DevSection
      title="버튼"
      description="@/shared/ui/button · variant / size / shape 축"
    >
      <div className="flex flex-col gap-8">
        <Row label="Variant">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </Row>

        <Row label="Size">
          {SIZES.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </Row>

        <Row label="Shape">
          <Button shape="default">default</Button>
          <Button shape="pill">pill</Button>
        </Row>

        <Row label="Icon size">
          {ICON_SIZES.map((size) => (
            <Button key={size} size={size} aria-label={size}>
              <PlusGlyph />
            </Button>
          ))}
        </Row>

        <Row label="State">
          <Button>기본</Button>
          <Button disabled>disabled</Button>
        </Row>
      </div>
    </DevSection>
  );
}
