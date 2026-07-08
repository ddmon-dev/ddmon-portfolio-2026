import { cache } from 'react';

export function parseRecipients(raw: string | undefined): Record<string, string> {
  if (!raw) return {};

  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => typeof value === 'string')
    ) as Record<string, string>;
  } catch {
    return {};
  }
}

export const getRecipients = cache(() => parseRecipients(process.env.RECIPIENTS));
