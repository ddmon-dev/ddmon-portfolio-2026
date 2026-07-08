import type { ReactNode } from 'react';
import { Container } from '@/shared/ui/container';

export function DevSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Container as="section" className="border-t border-border py-12">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </header>
      {children}
    </Container>
  );
}
