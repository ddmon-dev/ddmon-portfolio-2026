import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DetailSection } from './detail-section';

/**
 * 프로젝트 상세 본문을 `src/data/projects/<slug>.md`에서 읽어 렌더하는 서버 컴포넌트.
 * 마크다운 파싱·렌더가 전부 서버에서 끝나고 결과 트리만 RSC payload로 내려가므로
 * 클라이언트 번들에 파서가 포함되지 않는다.
 *
 * md 작성 규칙: 문서는 `## 섹션 제목`으로 시작하고, `##` 단위가 다이얼로그의
 * 구분선(divide-y) 섹션 하나가 된다. 섹션 내부 소제목은 `###`을 쓴다.
 */

const DETAILS_DIR = path.join(process.cwd(), 'src/data/projects');

/** `## 제목` 헤딩을 경계로 마크다운을 {제목, 본문} 섹션 목록으로 나눈다. */
function splitSections(markdown: string) {
  return markdown
    .split(/^## +/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const newline = chunk.indexOf('\n');
      if (newline === -1) return { title: chunk, body: '' };
      return {
        title: chunk.slice(0, newline).trim(),
        body: chunk.slice(newline + 1).trim(),
      };
    });
}

/** DetailSection 본문(leading-relaxed text-foreground/80) 위에 얹는 마크다운 요소 스타일. */
const markdownComponents: Components = {
  p: (props) => <p className="mt-3 first:mt-0" {...props} />,
  ul: (props) => (
    <ul className="mt-3 list-disc space-y-1 pl-5 first:mt-0" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-3 list-decimal space-y-1 pl-5 first:mt-0" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-ash-darker" {...props} />
  ),
  a: (props) => (
    <a
      className="underline underline-offset-2 transition-colors hover:text-primary"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-ash-lighter px-1 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  // 섹션 제목(h4, DetailSection)보다 한 단계 아래의 소제목
  h3: (props) => (
    <h5 className="mt-4 font-semibold text-ash-darker first:mt-0" {...props} />
  ),
  table: (props) => (
    <div className="mt-3 overflow-x-auto first:mt-0">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-border px-3 py-2 text-left font-semibold text-ash-darker"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-ash-light px-3 py-2" {...props} />
  ),
};

export async function ProjectDetail({ slug }: { slug: string }) {
  const markdown = await readFile(
    path.join(DETAILS_DIR, `${slug}.md`),
    'utf-8'
  );

  return splitSections(markdown).map(({ title, body }) => (
    <DetailSection key={title} title={title}>
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {body}
      </Markdown>
    </DetailSection>
  ));
}
