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
    <Container
      as="section"
      className={cn('space-y-9 max-sm:space-y-8', className)}
    >
      <div className={cn('space-y-4 text-pretty text-center', headerClassName)}>
        <h2 className="text-4xl font-bold font-secondary capitalize max-sm:text-3xl">
          {title}
          <span className="inline-block size-3 rounded-full bg-primary ml-1.5 max-sm:size-2" />
        </h2>
        {description && (
          <p className="text-lg max-sm:text-base">{description}</p>
        )}
      </div>
      {children}
    </Container>
  );
}
