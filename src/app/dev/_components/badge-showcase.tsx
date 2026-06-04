import { Badge } from '@/shared/ui/badge';
import { DevSection } from './dev-section';

const VARIANTS = ['default', 'secondary', 'outline', 'destructive'] as const;

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
    <DevSection
      title="뱃지"
      description="@/shared/ui/badge · variant / shape 축"
    >
      <div className="flex flex-col gap-8">
        <Row label="Variant">
          {VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </Row>

        <Row label="Shape">
          <Badge shape="default">default</Badge>
          <Badge shape="pill">pill</Badge>
        </Row>
      </div>
    </DevSection>
  );
}
