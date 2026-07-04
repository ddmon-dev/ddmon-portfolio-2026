import { parseProjectMarkdown } from './parse-markdown';
import type { Project } from './types';

export async function loadProject(slug: string): Promise<Project> {
  const { default: markdown } = await import(`@/data/projects/${slug}.md`);
  const { meta, body } = parseProjectMarkdown(markdown);

  return { ...meta, id: slug, body };
}
