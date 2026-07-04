import assert from 'node:assert/strict';
import test from 'node:test';
import { parseProjectMarkdown } from './parse-markdown.ts';

const fullFrontmatter = `---
title: 솔라가드 파노라마 필름
category: 홈페이지 / 구매 관리 시스템
image:
  src: /projects/panoramafilm.jpg
  alt: 파노라마 필름 프로젝트
  width: 1920
  height: 1080
stacks: [Next.js, React, Supabase, Tailwind, Zustand]
links:
  site: https://panoramafilm.co.kr
  repo: https://github.com/example/repo
facts:
  period: 2024.06 - 2024.09 · 이후 유지보수
  operation: 2년 운영 · 72개 시공점 사용
  product: Brand Site · OMS · Admin
  contribution: PM 보조 · FE 단독 구현 · DB/배포/운영 대응
---
## 개요

본문입니다.`;

test('parses full frontmatter into meta and returns body without metadata', () => {
  const { meta, body } = parseProjectMarkdown(fullFrontmatter);

  assert.deepEqual(meta, {
    title: '솔라가드 파노라마 필름',
    category: '홈페이지 / 구매 관리 시스템',
    image: {
      src: '/projects/panoramafilm.jpg',
      alt: '파노라마 필름 프로젝트',
      width: 1920,
      height: 1080,
    },
    stacks: ['Next.js', 'React', 'Supabase', 'Tailwind', 'Zustand'],
    links: {
      site: 'https://panoramafilm.co.kr',
      repo: 'https://github.com/example/repo',
    },
    facts: {
      period: '2024.06 - 2024.09 · 이후 유지보수',
      operation: '2년 운영 · 72개 시공점 사용',
      product: 'Brand Site · OMS · Admin',
      contribution: 'PM 보조 · FE 단독 구현 · DB/배포/운영 대응',
    },
  });
  assert.equal(body, '## 개요\n\n본문입니다.');
});

test('omits links when frontmatter has none, and defaults image.alt to empty string', () => {
  const markdown = `---
title: rgb Managers
category: 사내 백오피스
image:
  src: /projects/panoramafilm.jpg
  width: 1920
  height: 1080
stacks: [Next.js, React, MongoDB]
facts:
  period: 2023.07 - 2025.12
  operation: 사내 운영 중
  product: Back-Office Service
  contribution: PM · 단독 개발
---
본문`;

  const { meta } = parseProjectMarkdown(markdown);

  assert.equal(meta.links, undefined);
  assert.equal(meta.image.alt, '');
});

test('throws when frontmatter is absent', () => {
  assert.throws(
    () => parseProjectMarkdown('## 개요\n\n본문입니다.'),
    /frontmatter가 없습니다/
  );
});

test('throws when facts omits required fields', () => {
  const markdown = `---
title: 제목
category: 카테고리
image:
  src: /projects/x.jpg
  width: 1920
  height: 1080
stacks: [React]
facts:
  period: "2024.06"
  product: Brand Site
---
## 개요`;

  assert.throws(
    () => parseProjectMarkdown(markdown),
    /facts 필수 항목 누락: operation, contribution/
  );
});

test('flags a numeric-parsed facts value as missing (needs quotes)', () => {
  const markdown = `---
title: 제목
category: 카테고리
image:
  src: /projects/x.jpg
  width: 1920
  height: 1080
stacks: [React]
facts:
  period: 2025.12
  operation: 운영
  product: Site
  contribution: 개발
---
## 개요`;

  assert.throws(
    () => parseProjectMarkdown(markdown),
    /facts 필수 항목 누락: period/
  );
});

test('throws when stacks is empty', () => {
  const markdown = `---
title: 제목
category: 카테고리
image:
  src: /projects/x.jpg
  width: 1920
  height: 1080
stacks: []
facts:
  period: 2024.06
  operation: 운영
  product: Site
  contribution: 개발
---
## 개요`;

  assert.throws(
    () => parseProjectMarkdown(markdown),
    /stacks는 비어있지 않은 배열/
  );
});

test('throws when image dimensions are missing', () => {
  const markdown = `---
title: 제목
category: 카테고리
image:
  src: /projects/x.jpg
stacks: [React]
facts:
  period: 2024.06
  operation: 운영
  product: Site
  contribution: 개발
---
## 개요`;

  assert.throws(() => parseProjectMarkdown(markdown), /image.width가 숫자/);
});
