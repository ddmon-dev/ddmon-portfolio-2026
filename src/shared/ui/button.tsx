import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/classnames';

/**
 * 공용 버튼. shadcn Button과 같은 구조(cva variant + asChild)를 따른다.
 * - variant(색) / size(크기) / shape(모서리)를 각각 cva 축으로 관리한다.
 * - asChild를 켜면 <button> 대신 자식 요소(Link, a 등)에 스타일만 입힌다.
 *
 * 색은 프로젝트 컬러 토큰(primary/secondary/foreground)에 맞춘다.
 * 아이콘 크기는 Phosphor의 size prop이 정하므로, 기본 스타일은 클릭 통과와
 * flex 축소 방지만 잡고 크기는 강제하지 않는다.
 */
export const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap',
    'transition-colors cursor-pointer select-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-[1.2em]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50'
  ),
  {
    variants: {
      variant: {
        // 컬러 토큰 기반 솔리드 (default = primary)
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
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        // 중립/비채움
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
        'icon-sm': 'h-9 w-9',
        icon: 'h-10 w-10',
        'icon-lg': 'h-11 w-11',
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
    /** true면 <button> 대신 자식 요소에 버튼 스타일만 입힌다. */
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
