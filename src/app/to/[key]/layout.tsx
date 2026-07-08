import { Footer } from '@/app/_components/ui/footer';
import { getRecipients } from '@/app/_components/recipient/resolve-recipient';

export default async function RecipientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const recipient = getRecipients()[key];

  return (
    <>
      {children}
      <Footer recipient={recipient} />
    </>
  );
}
