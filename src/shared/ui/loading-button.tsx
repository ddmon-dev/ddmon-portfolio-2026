'use client';

import { cn } from '@/shared/utils/utils';
import { Button } from '@/shared/ui/button';
import { Spinner } from './spinner';

export function LoadingButton({
  children,
  isLoading,
  variant,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { isLoading?: boolean }) {
  return (
    <Button
      {...props}
      className={cn(className, isLoading && 'opacity-100!')}
      variant={variant}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </Button>
  );
}
