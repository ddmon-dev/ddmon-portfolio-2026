'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export function HomeLink(props: Omit<React.ComponentProps<typeof Link>, 'href'>) {
  const { key } = useParams();
  const href = typeof key === 'string' ? `/to/${key}` : '/';

  return <Link href={href} {...props} />;
}
