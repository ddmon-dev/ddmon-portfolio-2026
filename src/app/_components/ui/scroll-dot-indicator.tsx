import { ScrollDots } from '@/shared/ui/scroll-dots';

export function ScrollDotIndicator() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 z-40 h-dvh w-24 sm:hidden"
    >
      <ScrollDots />
    </div>
  );
}
