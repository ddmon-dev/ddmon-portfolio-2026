import assert from 'node:assert/strict';
import test from 'node:test';
import { parseProjectMarkdown } from './project-markdown.mjs';

test('extracts facts frontmatter and returns markdown body without metadata', () => {
  const markdown = `---
facts:
  period: 2024.06 - 2024.09 · 이후 유지보수
  product: Brand Site · OMS · Admin
  contribution: PM 보조 · FE 단독 구현 · DB/배포/운영 대응
  operation: 2년 운영 · 72개 시공점 사용
  url: https://panoramafilm.co.kr
---
## 개요

본문입니다.`;

  const result = parseProjectMarkdown(markdown);

  assert.deepEqual(result.facts, {
    period: '2024.06 - 2024.09 · 이후 유지보수',
    product: 'Brand Site · OMS · Admin',
    contribution: 'PM 보조 · FE 단독 구현 · DB/배포/운영 대응',
    operation: '2년 운영 · 72개 시공점 사용',
    url: 'https://panoramafilm.co.kr',
  });
  assert.equal(result.body, '## 개요\n\n본문입니다.');
});

test('returns original markdown when frontmatter is absent', () => {
  const markdown = `## 개요

본문입니다.`;

  const result = parseProjectMarkdown(markdown);

  assert.equal(result.facts, undefined);
  assert.equal(result.body, markdown);
});
