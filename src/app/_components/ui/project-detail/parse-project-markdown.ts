import { load } from 'js-yaml';
import type { ProjectMeta } from './types';

const frontmatterPattern = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;

type ParsedProjectMarkdown = { meta: ProjectMeta; body: string };

export function parseProjectMarkdown(markdown: string): ParsedProjectMarkdown {
  const [block, yaml] = markdown.match(frontmatterPattern)!;

  return {
    meta: load(yaml) as ProjectMeta,
    body: markdown.slice(block.length).trimStart(),
  };
}
