import { Container } from '@/shared/ui/container';

export function SiteFooter() {
  return (
    <footer className='w-full bg-primary text-primary-foreground mt-auto'>
      <Container className='py-16'>
        <p className='text-center'>&copy; {new Date().getFullYear()} DDmon. All rights reserved.</p>
      </Container>
    </footer>
  );
}
