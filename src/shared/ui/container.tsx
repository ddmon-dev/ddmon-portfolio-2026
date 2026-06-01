import type { ComponentProps, ElementType, ReactNode } from 'react';
import { cn } from '@/shared/utils/classnames';

type ContainerProps<T extends ElementType = 'div'> = {
  children: ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentProps<T>, 'as' | 'className' | 'children'>;

export function Container<T extends ElementType = 'div'>({
  children,
  className,
  as,
  ...rest
}: ContainerProps<T>) {
  const Comp = as ?? 'div';

  return (
    <Comp className={cn('container mx-auto px-4', className)} {...rest}>
      {children}
    </Comp>
  );
}
