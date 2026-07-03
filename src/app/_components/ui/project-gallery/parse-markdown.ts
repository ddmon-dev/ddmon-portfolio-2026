import { load } from 'js-yaml';
import type { Project, ProjectFacts, ProjectImage, ProjectLinks } from './types';

const frontmatterPattern = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;

type ProjectMeta = Omit<Project, 'id' | 'content'>;
type ParsedProjectMarkdown = { meta: ProjectMeta; body: string };

const requiredFactKeys = [
  'period',
  'operation',
  'product',
  'contribution',
] as const;

export function parseProjectMarkdown(markdown: string): ParsedProjectMarkdown {
  const match = markdown.match(frontmatterPattern);

  if (!match) {
    throw new Error('프로젝트 md에 frontmatter가 없습니다.');
  }

  const data = load(match[1]);
  const meta = validateProjectMeta(data);
  const body = markdown.slice(match[0].length).trimStart();

  return { meta, body };
}

function validateProjectMeta(data: unknown): ProjectMeta {
  if (!isRecord(data)) {
    throw new Error('frontmatter가 객체가 아닙니다.');
  }

  return {
    title: requireString(data, 'title'),
    category: requireString(data, 'category'),
    image: parseImage(data.image),
    stacks: parseStacks(data.stacks),
    ...(data.links !== undefined && { links: parseLinks(data.links) }),
    facts: parseFacts(data.facts),
  };
}

function parseImage(value: unknown): ProjectImage {
  if (!isRecord(value)) {
    throw new Error('image가 객체가 아닙니다.');
  }

  return {
    src: requireString(value, 'image.src'),
    alt: typeof value.alt === 'string' ? value.alt : '',
    width: requireNumber(value, 'image.width'),
    height: requireNumber(value, 'image.height'),
  };
}

function parseStacks(value: unknown): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('stacks는 비어있지 않은 배열이어야 합니다.');
  }

  return value.map((stack, i) => {
    if (typeof stack !== 'string' || !stack.trim()) {
      throw new Error(`stacks[${i}]가 문자열이 아닙니다.`);
    }
    return stack;
  });
}

function parseLinks(value: unknown): ProjectLinks {
  if (!isRecord(value)) {
    throw new Error('links가 객체가 아닙니다.');
  }

  const links: ProjectLinks = {};
  if (value.site !== undefined) links.site = requireString(value, 'links.site');
  if (value.repo !== undefined) links.repo = requireString(value, 'links.repo');
  return links;
}

function parseFacts(value: unknown): ProjectFacts {
  if (!isRecord(value)) {
    throw new Error('facts가 객체가 아닙니다.');
  }

  const missing = requiredFactKeys.filter(
    key => typeof value[key] !== 'string' || !value[key].trim()
  );

  if (missing.length > 0) {
    throw new Error(
      `facts 필수 항목 누락: ${missing.join(', ')}` +
        ' (값이 숫자로 해석됐다면 따옴표로 감싸세요. 예: period: "2025.12")'
    );
  }

  return {
    period: value.period as string,
    operation: value.operation as string,
    product: value.product as string,
    contribution: value.contribution as string,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireString(obj: Record<string, unknown>, label: string): string {
  const value = obj[label.split('.').pop()!];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label}가 비어있지 않은 문자열이어야 합니다.`);
  }
  return value;
}

function requireNumber(obj: Record<string, unknown>, label: string): number {
  const value = obj[label.split('.').pop()!];
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`${label}가 숫자여야 합니다.`);
  }
  return value;
}
