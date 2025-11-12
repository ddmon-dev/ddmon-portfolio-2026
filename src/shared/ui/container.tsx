import { cn } from '@/shared/utils/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Container({ children, className, size = 'md' }: ContainerProps) {
  return (
    <div
      className={cn(
        'container',
        className,
        size === 'sm' && 'max-w-3xl!',
        size === 'lg' && 'max-w-7xl!'
      )}
    >
      {children}
    </div>
  );
}
