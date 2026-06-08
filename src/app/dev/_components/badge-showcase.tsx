import { Badge } from '@/shared/ui/badge';
import { DevSection } from './dev-section';
import { ArrowLeftGlyph, ArrowRightGlyph } from './demo-glyphs';

const COLOR_VARIANTS = [
  'default',
  'primary-light',
  'primary-dark',
  'secondary',
  'secondary-light',
  'secondary-dark',
  'destructive',
  'ash',
  'outline',
] as const;

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

export function BadgeShowcase() {
  return (
    <DevSection title="뱃지" description="@/shared/ui/badge · 컬러 토큰 variant / shape / 아이콘">
      <div className="flex flex-col gap-8">
        <Row label="Variant">
          {COLOR_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </Row>

        <Row label="Shape">
          <Badge shape="default">default</Badge>
          <Badge shape="pill">pill</Badge>
        </Row>

        <Row label="Icon + text">
          <Badge>
            <ArrowLeftGlyph size={12} />
            왼쪽 아이콘
          </Badge>
          <Badge>
            오른쪽 아이콘
            <ArrowRightGlyph size={12} />
          </Badge>
          <Badge>
            <ArrowLeftGlyph size={12} />
            양쪽 아이콘
            <ArrowRightGlyph size={12} />
          </Badge>
        </Row>
      </div>
    </DevSection>
  );
}
