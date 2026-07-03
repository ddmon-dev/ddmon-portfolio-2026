import { Container } from '@/shared/ui/container';
import { cn } from '@/shared/utils/classnames';

type SectionProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
};

export function Section({
  title,
  description,
  children,
  className,
  headerClassName,
}: SectionProps) {
  return (
    <Container as="section" className={cn('space-y-12', className)}>
      <div className={cn('space-y-4', headerClassName)}>
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
