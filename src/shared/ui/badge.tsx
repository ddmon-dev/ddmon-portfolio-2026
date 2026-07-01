import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/classnames';

export const badgeVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-1 border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring'
  ),
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        'primary-light':
          'border-transparent bg-primary-light text-primary-foreground',
        'primary-dark':
          'border-transparent bg-primary-dark text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        'secondary-light':
          'border-transparent bg-secondary-light text-secondary-foreground',
        'secondary-dark':
          'border-transparent bg-secondary-dark text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        ash: 'border-transparent bg-ash-lighter text-ash-darker',
        outline: 'border-border text-foreground',
      },
      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'default',
    },
  }
);

type BadgeProps = ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

export function Badge({
  className,
  variant,
  shape,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    />
  );
}
