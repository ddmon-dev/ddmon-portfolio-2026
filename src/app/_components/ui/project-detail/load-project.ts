import { cache } from 'react';
import { parseProjectMarkdown } from './parse-project-markdown';
import type { Project } from './types';

export const loadProject = cache(async (slug: string): Promise<Project> => {
  const { default: markdown } = await import(`@/app/_components/data/case-study/${slug}.md`);
  const { meta, body } = parseProjectMarkdown(markdown);

  return { ...meta, id: slug, body };
});
