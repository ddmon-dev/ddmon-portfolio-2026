import { Container } from '@/shared/ui/container';

export function Section({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <section className='py-24'>
      <Container className='space-y-12'>
        {(title || description) && (
          <SectionHead
            title={title}
            description={description}
          />
        )}
        {children}
      </Container>
    </section>
  );
}

export function SectionHead({ title, description }: { title?: string; description?: string }) {
  return (
    <div className='text-center space-y-2'>
      {title && <h2 className='text-xl font-bold text-primary'>{title}</h2>}
      {description && <p className='text-3xl font-bold'>{description}</p>}
    </div>
  );
}
