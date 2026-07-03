import { Container } from '@/shared/ui/container';
import { cn } from '@/shared/utils/classnames';

type SectionProps = {
  className?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
};

export function Section({
  className,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <Container as="section" className={cn('space-y-12', className)}>
      <div className="text-left space-y-4">
        <h2 className="text-4xl font-bold font-secondary capitalize">
          {title}
          <span className="inline-block size-3 rounded-full bg-primary ml-1.5" />
        </h2>
        {description && <p className="text-lg">{description}</p>}
      </div>
      {children}
    </Container>
  );
}
