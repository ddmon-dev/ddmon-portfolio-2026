import type { Metadata } from 'next';
import { HomePage } from '@/app/_components/home-page';
import {
  ClearGreetingKey,
  StoreGreetingKey,
} from '@/app/_components/greeting-session';
import { getGreetings } from './resolve-greeting';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.keys(getGreetings()).map(key => ({ key }));
}

export default async function GreetingHome({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const company = getGreetings()[key];

  if (!company) {
    return (
      <>
        <ClearGreetingKey />
        <HomePage />
      </>
    );
  }

  return (
    <>
      <StoreGreetingKey greetingKey={key} />
      <HomePage company={company} />
    </>
  );
}
