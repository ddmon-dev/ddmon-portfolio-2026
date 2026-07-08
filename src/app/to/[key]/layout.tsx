import { Footer } from '@/app/_components/ui/footer';
import { getRecipients } from './resolve-recipient';

export default async function RecipientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const company = getRecipients()[key];

  return (
    <>
      {children}
      <Footer company={company} />
    </>
  );
}
