import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/classnames';

/**
 * 공용 배지. Button과 같은 구조(cva variant + asChild)를 따른다.
 * - variant(색) / shape(모서리)를 cva 축으로 관리한다.
 * - asChild를 켜면 <span> 대신 자식 요소(Link, a 등)에 스타일만 입힌다.
 *
 * 색은 프로젝트 컬러 토큰(primary/secondary/foreground)에 맞춘다.
 * 아이콘 크기는 Phosphor의 size prop이 정하므로 기본 스타일에서 강제하지 않는다.
 */
export const badgeVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-1 border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
  ),
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-on-primary',
        secondary: 'border-transparent bg-foreground/10 text-foreground',
        outline: 'border-border text-foreground',
        destructive: 'border-transparent bg-red-500 text-white',
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
    /** true면 <span> 대신 자식 요소에 배지 스타일만 입힌다. */
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
