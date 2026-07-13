import Link from 'next/link';
import type { Icon } from '@phosphor-icons/react';
import { cn } from '@/shared/utils/classnames';

export const contactItemClassName =
  'flex flex-col justify-center items-center gap-5 text-center size-70 rounded-full shadow-[0px_-5px_10px_rgb(0,0,0,0.05)] bg-background overflow-hidden max-lg:size-58 max-lg:gap-3 max-md:w-full max-md:h-auto max-md:p-2 max-md:flex-row max-md:justify-start focus-visible:z-10 focus-visible:relative';

export const contactItemIconWrapClassName =
  'size-19 bg-secondary/90 text-secondary-foreground rounded-full flex items-center justify-center shrink-0 max-lg:size-16 max-md:size-12';

export const contactItemIconClassName =
  'text-5xl max-lg:text-4xl max-md:text-3xl';

export const springTransition =
  'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]';

export function ContactItem({
  icon: Icon,
  hoverIcon: HoverIcon,
  label,
  value,
  href,
}: {
  icon: Icon;
  hoverIcon?: Icon;
  label: string;
  value: string;
  href: string;
}) {
  const isExternal = href.startsWith('http');

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(contactItemClassName, HoverIcon && 'group')}
    >
      <span
        className={cn(contactItemIconWrapClassName, HoverIcon && 'relative')}
      >
        <Icon
          weight="thin"
          className={cn(
            contactItemIconClassName,
            HoverIcon &&
              cn(
                springTransition,
                'group-hover:scale-50 group-hover:opacity-0 group-focus-visible:scale-50 group-focus-visible:opacity-0'
              )
          )}
        />
        {HoverIcon && (
          <HoverIcon
            weight="thin"
            className={cn(
              contactItemIconClassName,
              springTransition,
              'absolute inset-0 m-auto scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100'
            )}
          />
        )}
      </span>
      <span className="sr-only">{label}</span>
      <span className="font-secondary">{value}</span>
    </Link>
  );
}
