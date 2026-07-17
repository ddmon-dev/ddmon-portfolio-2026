import Link from 'next/link';
import type { Icon } from '@phosphor-icons/react';
import { cn } from '@/shared/utils/classnames';

const skin =
  'text-center rounded-full bg-background overflow-hidden focus-visible:z-10 focus-visible:relative';

export const contactItemStyles = {
  default: {
    root: `${skin} shadow-[0px_-5px_10px_rgb(0,0,0,0.05)] flex flex-col justify-center items-center gap-5 size-70 max-lg:size-58 max-lg:gap-3 max-md:w-full max-md:h-auto max-md:p-0 max-md:flex-row max-md:justify-start max-md:shadow-none max-md:bg-transparent max-md:rounded-none`,
    iconWrap:
      'size-19 bg-secondary/90 text-secondary-foreground rounded-full flex items-center justify-center shrink-0 max-lg:size-16 max-md:size-12 max-md:bg-ash-dark',
    icon: 'text-5xl max-lg:text-4xl max-md:text-3xl',
    value: '',
  },
  compact: {
    root: `${skin} border-none flex flex-row justify-start items-center gap-3 w-full p-0`,
    iconWrap:
      'size-8 bg-ash-dark text-secondary-foreground rounded-full flex items-center justify-center shrink-0',
    icon: 'text-lg',
    value: 'text-sm',
  },
} as const;

export const springTransition =
  'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]';

export function ContactItem({
  icon: Icon,
  hoverIcon: HoverIcon,
  label,
  value,
  href,
  compact = false,
}: {
  icon: Icon;
  hoverIcon?: Icon;
  label: string;
  value: string;
  href: string;
  compact?: boolean;
}) {
  const isExternal = href.startsWith('http');
  const style = compact ? contactItemStyles.compact : contactItemStyles.default;
  const iconWeight = compact ? 'regular' : 'thin';

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(style.root, HoverIcon && 'group')}
    >
      <span className={cn(style.iconWrap, HoverIcon && 'relative')}>
        <Icon
          weight={iconWeight}
          className={cn(
            style.icon,
            HoverIcon &&
              cn(
                springTransition,
                'group-hover:scale-50 group-hover:opacity-0 group-focus-visible:scale-50 group-focus-visible:opacity-0'
              )
          )}
        />
        {HoverIcon && (
          <HoverIcon
            weight={iconWeight}
            className={cn(
              style.icon,
              springTransition,
              'absolute inset-0 m-auto scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100'
            )}
          />
        )}
      </span>
      <span className="sr-only">{label}</span>
      <span className={cn('font-secondary shrink-0', style.value)}>
        {value}
      </span>
    </Link>
  );
}
