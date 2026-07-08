import { Footer } from '@/app/_components/ui/footer';
import { getGreetings } from './resolve-greeting';

export default async function GreetingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const company = getGreetings()[key];

  return (
    <>
      {children}
      <Footer company={company} />
    </>
  );
}
