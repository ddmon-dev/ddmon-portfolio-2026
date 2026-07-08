import type { Metadata } from 'next';
import { HomePage } from '@/app/_components/home-page';
import {
  ClearRecipientKey,
  StoreRecipientKey,
} from '@/app/_components/recipient-session';
import { getRecipients } from './resolve-recipient';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.keys(getRecipients()).map(key => ({ key }));
}

export default async function RecipientHome({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const company = getRecipients()[key];

  if (!company) {
    return (
      <>
        <ClearRecipientKey />
        <HomePage />
      </>
    );
  }

  return (
    <>
      <StoreRecipientKey recipientKey={key} />
      <HomePage company={company} />
    </>
  );
}
