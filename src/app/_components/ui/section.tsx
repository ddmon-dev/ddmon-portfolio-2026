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
    <Container as="section" className={cn('', className)}>
      <div className="text-center">
        <h2 className="">{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </Container>
  );
}
