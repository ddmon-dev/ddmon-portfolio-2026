import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/classnames';

export const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap',
    'transition-colors cursor-pointer select-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-[1.2em]',
    'disabled:pointer-events-none disabled:opacity-50'
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-light',
        'primary-light':
          'bg-primary-light text-primary-foreground hover:bg-primary',
        'primary-dark':
          'bg-primary-dark text-primary-foreground hover:bg-primary',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-light',
        'secondary-light':
          'bg-secondary-light text-secondary-foreground hover:bg-secondary',
        'secondary-dark':
          'bg-secondary-dark text-secondary-foreground hover:bg-secondary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-dark',
        ash: 'bg-ash-lighter text-ash-darker hover:bg-ash-light',
        outline:
          'border border-border bg-transparent text-foreground hover:bg-foreground/5',
        ghost: 'bg-transparent text-foreground hover:bg-foreground/5',
        link: 'text-primary-dark underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-8 px-2.5 text-xs',
        sm: 'h-9 px-3 text-sm',
        default: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6',
        'icon-sm': 'size-9',
        icon: 'size-10',
        'icon-lg': 'size-11',
      },
      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  }
);

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  shape,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    />
  );
}
