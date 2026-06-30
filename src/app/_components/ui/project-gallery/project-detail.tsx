import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { parseProjectMarkdown } from './project-markdown.mjs';

/**
 * 프로젝트 상세 본문을 `src/data/projects/<slug>.md`에서 읽어 렌더하는 서버 컴포넌트.
 * 마크다운 파싱·렌더가 전부 서버에서 끝나고 결과 트리만 RSC payload로 내려가므로
 * 클라이언트 번들에 파서가 포함되지 않는다.
 *
 * md는 fs가 아니라 import로 읽는다(raw-loader, next.config.ts 참조).
 * 모듈 그래프에 포함되어 dev에서 md 수정 시 HMR이 동작한다.
 *
 * 본문은 frontmatter를 걷어낸 마크다운을 통째로 단일 트리로 렌더한다.
 * 섹션 경계 같은 특수 규칙 없이 작성한 대로 위계가 드러난다. 히어로가
 * 사실상 h1이므로 본문 최상위 헤딩은 `##`(h2)부터 쓴다.
 */

/** 다이얼로그 본문(leading-relaxed text-ash-dark) 위에 얹는 마크다운 요소 스타일. */
const markdownComponents: Components = {
  h2: (props) => (
    <h2
      className="mt-8 text-lg font-bold text-ash-darker first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 text-base font-semibold text-ash-darker first:mt-0"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="mt-4 text-sm font-semibold text-ash-darker first:mt-0"
      {...props}
    />
  ),
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
  blockquote: (props) => (
    <blockquote
      className="mt-3 border-l-2 border-border pl-4 text-ash first:mt-0"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-6 border-border" {...props} />,
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

export function ProjectDetailContent({ markdown }: { markdown: string }) {
  return (
    <div className="leading-relaxed text-ash-dark">
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </Markdown>
    </div>
  );
}

export async function ProjectDetail({ slug }: { slug: string }) {
  const { default: markdown } = await import(
    `@/data/projects/${slug}.md`
  );
  const { body } = parseProjectMarkdown(markdown);

  return <ProjectDetailContent markdown={body} />;
}
