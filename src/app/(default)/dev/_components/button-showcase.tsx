import { Button } from '@/shared/ui/button';
import { DevSection } from './dev-section';
import { ArrowLeftGlyph, ArrowRightGlyph, PlusGlyph } from './demo-glyphs';

const COLOR_VARIANTS = [
  'default',
  'primary-light',
  'primary-dark',
  'secondary',
  'secondary-light',
  'secondary-dark',
  'destructive',
  'ash',
] as const;

const STYLE_VARIANTS = ['outline', 'ghost', 'link'] as const;

const SIZES = ['xs', 'sm', 'default', 'lg'] as const;

const ICON_SIZES = ['icon-sm', 'icon', 'icon-lg'] as const;

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
      description="@/shared/ui/button · 컬러 토큰 variant / size / shape / 아이콘"
    >
      <div className="flex flex-col gap-8">
        <Row label="Color variant">
          {COLOR_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </Row>

        <Row label="Style variant">
          {STYLE_VARIANTS.map((variant) => (
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

        <Row label="Icon + text">
          <Button>
            <ArrowLeftGlyph />
            왼쪽 아이콘
          </Button>
          <Button>
            오른쪽 아이콘
            <ArrowRightGlyph />
          </Button>
          <Button>
            <ArrowLeftGlyph />
            양쪽 아이콘
            <ArrowRightGlyph />
          </Button>
        </Row>

        <Row label="State">
          <Button>기본</Button>
          <Button disabled>disabled</Button>
        </Row>
      </div>
    </DevSection>
  );
}
