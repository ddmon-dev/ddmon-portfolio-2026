import { cn } from '@/shared/utils/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('container mx-auto', className)}>{children}</div>;
}
