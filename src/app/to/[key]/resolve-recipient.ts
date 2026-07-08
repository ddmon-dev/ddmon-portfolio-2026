import { cache } from 'react';

export const getRecipients = cache(
  (): Record<string, string> => JSON.parse(process.env.RECIPIENTS ?? '{}')
);
