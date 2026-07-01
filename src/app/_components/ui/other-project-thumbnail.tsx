'use client';

import { useState } from 'react';

export function OtherProjectThumbnail({
  label,
  href,
}: {
  label: string;
  href?: string;
}) {
  const src = href
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(href)}?w=320&h=200`
    : null;
  const [broken, setBroken] = useState(!src);

  if (broken || !src) {
    return (
      <div className="flex size-full items-center justify-center bg-primary px-2 text-center text-xs leading-tight font-medium text-primary-foreground">
        {label}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={label}
      loading="lazy"
      onError={() => setBroken(true)}
      className="size-full object-cover object-top"
    />
  );
}
